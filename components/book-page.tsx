"use client"

import React from "react"
import type { Book } from "@/lib/books-data"
import { Star, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface BookPageProps {
  book: Book
  index: number
  pageNumber: number
}

export const BookPage = React.forwardRef<HTMLDivElement, BookPageProps>(({ book, index, pageNumber }, ref) => {
  return (
    <div
      ref={ref}
      className="w-full h-full bg-linear-to-br from-rose-50 via-pink-50/50 to-rose-100 dark:from-rose-950 dark:via-pink-950/50 dark:to-rose-900 p-4 md:p-6 overflow-y-auto [&::-webkit-scrollbar]:hidden relative transition-colors duration-500"
      data-density="soft"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZjVmNWY0Ij48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlN2U1ZTQiPjwvcmVjdD4KPC9zdmc+')] opacity-20 pointer-events-none" />

      <div className="flex flex-col items-center justify-start h-full gap-6 relative pb-12">
        {/* Chapter Header Image */}
        <div className="relative w-full shrink-0">
          <img
            src={book.book_cover_image_url || "/placeholder.svg"}
            alt={`Illustration for ${book.title}`}
            className="w-full h-48 md:h-64 lg:h-72 object-cover rounded-xl shadow-md border-4 border-white dark:border-rose-900 pb-0 transition-colors duration-500"
            crossOrigin="anonymous"
          />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-rose-600 dark:bg-rose-700 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap transition-colors duration-500">
            Chapter {index + 1}
          </div>
        </div>

        {/* Chapter Title & Meta */}
        <div className="flex flex-col gap-2 text-center shrink min-w-0 w-full px-2 mt-4">
          <Badge variant="outline" className="mx-auto mb-1 border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-400 bg-white/50 dark:bg-rose-900/50 backdrop-blur-sm hover:bg-rose-100 dark:hover:bg-rose-800 text-[10px] md:text-xs transition-colors duration-500">
            {book.genre}
          </Badge>
          <h2 className="font-serif font-bold text-rose-950 dark:text-rose-100 leading-tight text-balance text-2xl md:text-3xl lg:text-4xl mt-2 transition-colors duration-500">
            {book.title}
          </h2>
          <p className="text-rose-500 dark:text-rose-400 italic text-xs md:text-sm mt-1 mb-2 transition-colors duration-500">{book.author}</p>
          <div className="w-12 h-1 bg-rose-300/50 dark:bg-rose-700/50 mx-auto my-1 rounded-full transition-colors duration-500" />
        </div>

        {/* Content Paragraphs */}
        {book.content && book.content.length > 0 && (
          <div className="flex flex-col gap-5 text-justify w-full px-2 md:px-6 text-rose-900/90 dark:text-rose-200/90 font-serif text-sm md:text-base leading-relaxed tracking-wide transition-colors duration-500">
            {book.content.map((paragraph, i) => (
              <p key={i} className={i === 0 ? "first-letter:text-5xl first-letter:font-bold first-letter:text-rose-500 dark:first-letter:text-rose-400 first-letter:mr-1 first-letter:float-left first-line:uppercase first-line:tracking-widest" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Page number */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-rose-400 dark:text-rose-500 font-serif bg-white/50 dark:bg-rose-900/50 px-2 rounded-full py-0.5 transition-colors duration-500">{pageNumber}</div>
    </div>
  )
})

BookPage.displayName = "BookPage"

export const CoverPage = React.forwardRef<HTMLDivElement, { type: "front" | "back" }>(({ type }, ref) => {
  return (
    <div
      ref={ref}
      className="w-full h-full bg-linear-to-br from-rose-800 via-rose-900 to-rose-950 dark:from-rose-950 dark:via-black dark:to-stone-950 flex items-center justify-center transition-colors duration-500"
      data-density="hard"
    >
      {type === "front" ? (
        <div className="w-full h-full p-4 md:p-6 relative text-center flex flex-col">
          {/* Inner Golden/Rose Frame */}
          <div className="flex-1 border border-rose-300/30 rounded-sm p-8 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Elegant corner decorations */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t border-l border-rose-300/40 rounded-tl-lg" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-rose-300/40 rounded-tr-lg" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b border-l border-rose-300/40 rounded-bl-lg" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b border-r border-rose-300/40 rounded-br-lg" />
            
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-linear-to-tr from-rose-500/20 to-rose-300/5 backdrop-blur-md border border-rose-200/10 flex items-center justify-center shadow-2xl shadow-rose-900/50">
              <svg className="w-10 h-10 text-rose-100 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 tracking-wide bg-linear-to-r from-rose-200 via-white to-rose-200 bg-clip-text text-transparent drop-shadow-sm">
              The Book of Love
            </h1>
            
            <p className="text-rose-200/70 text-sm md:text-base max-w-xs mx-auto italic font-serif leading-relaxed">
              A profound exploration of love, connection, and truth.
            </p>
            
            <div className="mt-12 flex flex-col items-center">
              <div className="w-12 h-px bg-linear-to-r from-transparent via-rose-400/50 to-transparent mb-4" />
              <p className="text-rose-400/80 text-[10px] tracking-[0.3em] uppercase mb-2 font-medium">Author</p>
              <p className="font-serif italic text-rose-100 text-xl lg:text-2xl drop-shadow-sm">Basudev</p>
              <div className="w-12 h-px bg-linear-to-r from-transparent via-rose-400/50 to-transparent mt-4" />
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-rose-300/40 text-xs tracking-widest uppercase">
              Click or drag →
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-8">
          <p className="text-rose-200/80 text-sm md:text-base mb-4">Forever embracing</p>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-rose-100 mb-6">
            The Book of Love
          </h2>
          <p className="text-rose-300/60 text-xs max-w-xs mx-auto">
            &ldquo;Love is not an emotion, it is your very existence.&rdquo;
            <br />— Rumi
          </p>
        </div>
      )}
    </div>
  )
})

CoverPage.displayName = "CoverPage"
