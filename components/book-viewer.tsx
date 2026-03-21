"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import dynamic from "next/dynamic"
import { books as allBooks } from "@/lib/books-data"
import { BookPage, CoverPage } from "@/components/book-page"
import { ChevronLeft, ChevronRight, Search, X, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const HTMLFlipBook = dynamic(() => import("react-pageflip").then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[600px] bg-amber-100/50 rounded-lg">
      <div className="text-amber-600 animate-pulse">Loading book...</div>
    </div>
  ),
})

export function BookViewer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const bookRef = useRef<any>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
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
    if (bookRef.current) {
      bookRef.current.pageFlip().turnToPage(0)
    }
  }, [searchQuery])

  const handleFlip = useCallback((e: any) => {
    setCurrentPage(e.data)
  }, [])

  const handleInit = useCallback((e: any) => {
    if (bookRef.current) {
      setTotalPages(bookRef.current.pageFlip().getPageCount())
    }
  }, [])

  const goNext = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext()
    }
  }

  const goPrev = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev()
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

  const bookWidth = isMobile ? 540 : 720
  const bookHeight = isMobile ? 870 : 1050

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-amber-50/80 border-b border-amber-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-amber-900" />
              <div>
                <h1 className="text-xl md:text-2xl font-serif font-bold text-amber-950">
                  Naval&apos;s Book Recommendations
                </h1>
                <p className="text-sm text-amber-700">Curated wisdom for wealth and happiness</p>
              </div>
            </div>
            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" />
              <Input
                type="search"
                placeholder="Search books, authors, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 bg-white/80 border-amber-300 focus-visible:ring-amber-500 text-amber-950 placeholder:text-amber-500"
                aria-label="Search books"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-900"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-2 md:py-4 px-2">
        {filteredBooks.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <BookOpen className="w-16 h-16 text-amber-300 mx-auto mb-4" />
              <h2 className="text-xl font-serif text-amber-900">No books found</h2>
              <p className="text-amber-600 mt-2">Try a different search term</p>
            </div>
          </div>
        ) : (
          <>
            {/* Book Container with shadow */}
            <div className="relative">
              {/* Book shadow */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-amber-900/20 blur-xl rounded-full" />

              {/* Flip Book */}
              <HTMLFlipBook
                ref={bookRef}
                width={bookWidth}
                height={bookHeight}
                size="stretch"
                minWidth={420}
                maxWidth={750}
                minHeight={600}
                maxHeight={1050}
                drawShadow={true}
                flippingTime={800}
                usePortrait={isMobile}
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
                className="h-12 w-12 rounded-full border-amber-300 text-amber-900 hover:bg-amber-200 hover:text-amber-950 disabled:opacity-30 bg-transparent"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <div className="flex items-center gap-2 min-w-[120px] justify-center">
                <span className="text-amber-900 font-serif font-medium text-lg">Page {currentPage + 1}</span>
                <span className="text-amber-600">/</span>
                <span className="text-amber-600">{totalPages || filteredBooks.length + 2}</span>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={goNext}
                disabled={currentPage >= totalPages - 1}
                className="h-12 w-12 rounded-full border-amber-300 text-amber-900 hover:bg-amber-200 hover:text-amber-950 disabled:opacity-30"
                aria-label="Next page"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Hints */}
            <p className="text-center text-xs text-amber-600 mt-2">
              {isMobile ? "Swipe or tap edges to turn pages" : "Click, drag, or use arrow keys to turn pages"}
            </p>
          </>
        )}
      </main>

      {/* Footer with Affiliate Disclosure */}
      <footer className="border-t border-amber-200 bg-amber-50/80">
        <div className="container mx-auto px-4 py-3">
          <p className="text-xs text-amber-700 text-center">
            <strong>Affiliate Disclosure:</strong> As an Amazon Associate, we earn from qualifying purchases at no extra
            cost to you. Book recommendations sourced from Naval Ravikant&apos;s public endorsements.
          </p>
        </div>
      </footer>
    </div>
  )
}
