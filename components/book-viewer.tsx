"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import dynamic from "next/dynamic"
import { books as allBooks } from "@/lib/books-data"
import { BookPage, CoverPage } from "@/components/book-page"
import { useIsMobile, useIsTablet } from "@/hooks/use-mobile"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { ChevronLeft, ChevronRight, Search, X, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const HTMLFlipBook = dynamic(() => import("react-pageflip").then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[600px] bg-rose-100/50 rounded-lg">
      <div className="text-rose-600 animate-pulse">Loading book...</div>
    </div>
  ),
})

export function BookViewer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const bookRef = useRef<any>(null)
  const flipBufferRef = useRef<AudioBuffer | null>(null)
  
  // Real-time Physics Engine references
  const frictionGainRef = useRef<GainNode | null>(null)
  const lastXRef = useRef<number | null>(null)
  const isFoldingRef = useRef(false)
  const frictionRafRef = useRef<number | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isSmallDevice = isMobile || isTablet

  // Initialize the sound with Web Audio API for flawless zero-latency playback
  useEffect(() => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    audioCtxRef.current = ctx

    // 1. Load the actual swoosh MP3
    fetch("/page-flip-sound.mp3")
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        flipBufferRef.current = audioBuffer
      })
      .catch((e) => console.log("Failed to safely load or decode audio", e))

    // 2. Set up the dynamic physics "Friction" engine for peeling
    const bufferSize = ctx.sampleRate * 2.0 // 2 seconds of pure rustle
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3 // Smooth white noise
    }
    
    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = buffer
    noiseSource.loop = true
    
    // Filter to make the noise sound exactly like thick sliding paper
    const filter = ctx.createBiquadFilter()
    filter.type = "bandpass"
    filter.frequency.value = 800
    filter.Q.value = 0.5
    
    // Volume controller for the friction
    const gainNode = ctx.createGain()
    gainNode.gain.value = 0 // Silent initially until peeling happens
    frictionGainRef.current = gainNode
    
    noiseSource.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    noiseSource.start()

    return () => {
      ctx.close().catch(() => {})
      if (frictionRafRef.current) cancelAnimationFrame(frictionRafRef.current)
    }
  }, [])

  // Listen to physical mouse/touch dragging directly on the document
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isFoldingRef.current || !audioCtxRef.current || !frictionGainRef.current) return
      
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      
      if (lastXRef.current !== null) {
        const deltaX = Math.abs(clientX - lastXRef.current)
        
        // Map cursor speed (deltaX) to paper rustling volume mapping
        // The faster the pull, the louder the paper friction
        let targetVolume = Math.min((deltaX / 50) * 0.6, 0.6) 
        
        // Smoothly ramp volume to match finger speed
        frictionGainRef.current.gain.setTargetAtTime(targetVolume, audioCtxRef.current.currentTime, 0.05)
      }
      lastXRef.current = clientX
      
      // Decay friction instantly if the finger stops moving
      if (frictionRafRef.current) clearTimeout(frictionRafRef.current)
      frictionRafRef.current = window.setTimeout(() => {
        if (frictionGainRef.current && audioCtxRef.current) {
           frictionGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.1)
        }
      }, 50)
    }

    const handleRelease = () => {
      isFoldingRef.current = false
      lastXRef.current = null
      if (frictionGainRef.current && audioCtxRef.current) {
        frictionGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.05) // go silent
      }
    }

    document.addEventListener("mousemove", handleMove)
    document.addEventListener("touchmove", handleMove, { passive: true })
    document.addEventListener("mouseup", handleRelease)
    document.addEventListener("touchend", handleRelease)

    return () => {
      document.removeEventListener("mousemove", handleMove)
      document.removeEventListener("touchmove", handleMove)
      document.removeEventListener("mouseup", handleRelease)
      document.removeEventListener("touchend", handleRelease)
    }
  }, [])

  const playFlipSound = useCallback((playbackRate: number = 1.0, volume: number = 0.5) => {
    const ctx = audioCtxRef.current
    const buffer = flipBufferRef.current

    if (ctx && buffer) {
      if (ctx.state === "suspended") {
        ctx.resume()
      }
      
      const source = ctx.createBufferSource()
      source.buffer = buffer
      
      // Control how slow or fast the sound plays to match the peel!
      source.playbackRate.value = playbackRate
      
      const gainNode = ctx.createGain()
      gainNode.gain.value = volume
      
      source.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      source.start(0, 0.05)
    }
  }, [])
  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return allBooks
    const query = searchQuery.toLowerCase()
    return allBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query),
    )
  }, [searchQuery])

  // Reset to first page on search
  useEffect(() => {
    if (bookRef.current && bookRef.current.pageFlip) {
      const pageFlipInstance = bookRef.current.pageFlip()
      if (pageFlipInstance && typeof pageFlipInstance.turnToPage === 'function') {
        pageFlipInstance.turnToPage(0)
      }
    }
  }, [searchQuery])

  const handleFlip = useCallback((e: any) => {
    setCurrentPage(e.data)
  }, [])

  const handleChangeState = useCallback((e: any) => {
    // When the user starts slowly grabbing and peeling the corner themselves
    if (e.data === "user_fold") {
      isFoldingRef.current = true // Activates the dynamic physical drag engine!
    }
    // "flipping" state happens the millisecond the page physically executes its turning animation (snapping over natively)
    if (e.data === "flipping") {
      isFoldingRef.current = false
      lastXRef.current = null
      if (frictionGainRef.current && audioCtxRef.current) {
         frictionGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.01)
      }
      playFlipSound(1.0, 0.5) // Fire the final true-speed swoosh
    }
  }, [playFlipSound])

  const handleInit = useCallback((e: any) => {
    if (bookRef.current && bookRef.current.pageFlip) {
      const pageFlipInstance = bookRef.current.pageFlip()
      if (pageFlipInstance && typeof pageFlipInstance.getPageCount === 'function') {
        setTotalPages(pageFlipInstance.getPageCount())
      }
    }
  }, [])

  const goNext = () => {
    if (bookRef.current && bookRef.current.pageFlip) {
      const pageFlipInstance = bookRef.current.pageFlip()
      if (pageFlipInstance && typeof pageFlipInstance.flipNext === 'function') {
        pageFlipInstance.flipNext()
      }
    }
  }

  const goPrev = () => {
    if (bookRef.current && bookRef.current.pageFlip) {
      const pageFlipInstance = bookRef.current.pageFlip()
      if (pageFlipInstance && typeof pageFlipInstance.flipPrev === 'function') {
        pageFlipInstance.flipPrev()
      }
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const bookWidth = isMobile ? 360 : isTablet ? 560 : 720
  const bookHeight = isMobile ? 580 : isTablet ? 800 : 1050

  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br from-rose-50 via-pink-50 to-red-50 dark:from-rose-950 dark:via-pink-950 dark:to-red-950 transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-rose-50/80 dark:bg-rose-950/80 border-b border-rose-200 dark:border-rose-800 transition-colors duration-500">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-rose-600 dark:text-rose-400" />
              <div>
                <h1 className="text-xl md:text-2xl font-serif font-bold text-rose-950 dark:text-rose-100">
                  The Book of Love
                </h1>
                <p className="text-sm text-rose-700 dark:text-rose-300">Exploring the deepest emotion in the universe</p>
              </div>
            </div>
            {/* Right Side: Search and Theme Toggle */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* Search */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-600 dark:text-rose-400" />
                <Input
                  type="search"
                  placeholder="Search chapters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 bg-white/80 dark:bg-rose-900/80 border-rose-300 dark:border-rose-700 focus-visible:ring-rose-500 text-rose-950 dark:text-rose-100 placeholder:text-rose-500 dark:placeholder:text-rose-400"
                  aria-label="Search chapters"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-600 dark:text-rose-400 hover:text-rose-900 dark:hover:text-rose-100"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Theme Toggler */}
              <AnimatedThemeToggler className="p-2 bg-white/50 dark:bg-rose-900/50 hover:bg-white/80 dark:hover:bg-rose-800/80 rounded-full border border-rose-200 dark:border-rose-700 text-rose-600 dark:text-rose-400 transition-colors shrink-0" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-2 md:py-4 px-2">
        {filteredBooks.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <BookOpen className="w-16 h-16 text-rose-300 dark:text-rose-800 mx-auto mb-4" />
              <h2 className="text-xl font-serif text-rose-900 dark:text-rose-200">No chapters found</h2>
              <p className="text-rose-600 dark:text-rose-400 mt-2">Try a different search term</p>
            </div>
          </div>
        ) : (
          <>
            {/* Book Container with shadow */}
            <div className="relative">
              {/* Book shadow */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-rose-900/20 dark:bg-black/50 blur-xl rounded-full" />

              {/* Flip Book */}
              <HTMLFlipBook
                key={isSmallDevice ? "device-small" : "device-large"}
                ref={bookRef}
                width={bookWidth}
                height={bookHeight}
                size="stretch"
                minWidth={isSmallDevice ? 320 : 420}
                maxWidth={isSmallDevice ? 800 : 750}
                minHeight={isSmallDevice ? 480 : 600}
                maxHeight={1100}
                drawShadow={true}
                flippingTime={800}
                usePortrait={isSmallDevice}
                startPage={0}
                startZIndex={0}
                autoSize={true}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                swipeDistance={30}
                clickEventForward={true}
                useMouseEvents={true}
                onFlip={handleFlip}
                onChangeState={handleChangeState}
                onInit={handleInit}
                className="shadow-2xl"
                style={{}}
                showPageCorners={true}
                disableFlipByClick={false}
              >
                {/* Front Cover */}
                <CoverPage type="front" />

                {/* Book Pages */}
                {filteredBooks.map((book, idx) => (
                  <BookPage key={book.title} book={book} index={allBooks.indexOf(book)} pageNumber={idx + 1} />
                ))}

                {/* Back Cover */}
                <CoverPage type="back" />
              </HTMLFlipBook>
            </div>

            {/* Navigation */}
            <div className="mt-4 flex items-center justify-center gap-4 md:gap-8">
              <Button
                variant="outline"
                size="icon"
                onClick={goPrev}
                disabled={currentPage === 0}
                className="h-12 w-12 rounded-full border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200 hover:bg-rose-200 dark:hover:bg-rose-800 hover:text-rose-950 dark:hover:text-rose-50 disabled:opacity-30 bg-transparent"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <div className="flex items-center gap-2 min-w-[120px] justify-center">
                <span className="text-rose-900 dark:text-rose-200 font-serif font-medium text-lg">Page {currentPage + 1}</span>
                <span className="text-rose-600 dark:text-rose-500">/</span>
                <span className="text-rose-600 dark:text-rose-500">{totalPages || filteredBooks.length + 2}</span>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={goNext}
                disabled={currentPage >= totalPages - 1}
                className="h-12 w-12 rounded-full border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200 hover:bg-rose-200 dark:hover:bg-rose-800 hover:text-rose-950 dark:hover:text-rose-50 disabled:opacity-30 bg-transparent"
                aria-label="Next page"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Hints */}
            <p className="text-center text-xs text-rose-600 dark:text-rose-400 mt-2">
              {isSmallDevice ? "Swipe or tap edges to turn pages" : "Click, drag, or use arrow keys to turn pages"}
            </p>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-rose-200 dark:border-rose-800 bg-rose-50/80 dark:bg-rose-950/80 transition-colors duration-500">
        <div className="container mx-auto px-4 py-3">
          <p className="text-xs text-rose-700 dark:text-rose-400 text-center">
            <strong>LoveScript</strong> &mdash; A journey into the depths of love, connection, and truth.
          </p>
        </div>
      </footer>
    </div>
  )
}
