"use client"

import React from "react"
import type { Book } from "@/lib/books-data"
import { Star, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface BookPageProps {
  book: Book
  index: number
  pageNumber: number
}

export const BookPage = React.forwardRef<HTMLDivElement, BookPageProps>(({ book, index, pageNumber }, ref) => {
  const amazonUrl = book.amazon_in_product_url
    ? `${book.amazon_in_product_url}${book.amazon_in_product_url.includes("?") ? "&" : "?"}tag=xdotcom-21`
    : "#"

  return (
    <div
      ref={ref}
      className="w-full h-full bg-gradient-to-br from-amber-50 via-orange-50/50 to-amber-100 p-4 md:p-6 overflow-hidden"
      data-density="soft"
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZjVmNWY0Ij48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlN2U1ZTQiPjwvcmVjdD4KPC9zdmc+')] opacity-20 pointer-events-none" />

      {/* Page number */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-amber-500 font-serif">{pageNumber}</div>

      <div className="flex flex-col items-center justify-center h-full gap-3 md:gap-4 relative">
        {/* Book Cover - Clickable with just cursor pointer */}
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="relative shrink-0 cursor-pointer"
          aria-label={`View ${book.title} on Amazon (affiliate link)`}
        >
          <div className="relative">
            <img
              src={book.book_cover_image_url || "/placeholder.svg"}
              alt={`Cover of ${book.title}`}
              className="w-32 h-48 md:w-40 md:h-60 lg:w-48 lg:h-72 object-cover rounded-md shadow-2xl"
              crossOrigin="anonymous"
            />
            <div className="absolute top-2 left-2 bg-amber-900/90 text-amber-50 text-xs font-medium px-2 py-1 rounded">
              #{index + 1}
            </div>
          </div>
        </a>

        {/* Book Details */}
        <div className="flex flex-col gap-1.5 text-center flex-shrink min-w-0 w-full px-2">
          <div>
            <Badge variant="secondary" className="mb-1 bg-amber-100 text-amber-900 hover:bg-amber-200 text-xs">
              {book.genre}
            </Badge>
            <h2 className="font-serif font-bold text-amber-950 leading-tight text-balance text-sm md:text-base lg:text-lg line-clamp-2">
              {book.title}
            </h2>
            <p className="text-amber-800 text-xs md:text-sm mt-0.5">by {book.author}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-1 flex-wrap">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(book.amazon_in_customer_rating) ? "fill-amber-500 text-amber-500" : "text-amber-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-amber-900 font-medium text-xs">{book.amazon_in_customer_rating}</span>
            <span className="text-amber-600 text-xs">({book.total_reviews.toLocaleString()})</span>
          </div>

          <Button asChild size="sm" className="bg-amber-900 hover:bg-amber-800 text-amber-50 w-auto mx-auto mt-1">
            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              aria-label={`View ${book.title} on Amazon (affiliate link)`}
            >
              View on Amazon
              <ExternalLink className="ml-2 w-3 h-3" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
})

BookPage.displayName = "BookPage"

export const CoverPage = React.forwardRef<HTMLDivElement, { type: "front" | "back" }>(({ type }, ref) => {
  return (
    <div
      ref={ref}
      className="w-full h-full bg-gradient-to-br from-amber-800 via-amber-900 to-amber-950 flex items-center justify-center"
      data-density="hard"
    >
      {type === "front" ? (
        <div className="text-center p-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-100/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-amber-100 mb-3">Naval&apos;s Library</h1>
          <p className="text-amber-200/80 text-sm md:text-base max-w-xs mx-auto">
            A curated collection of books recommended by Naval Ravikant
          </p>
          <div className="mt-8 text-amber-300/60 text-xs">Click or drag to turn pages →</div>
        </div>
      ) : (
        <div className="text-center p-8">
          <p className="text-amber-200/80 text-sm md:text-base mb-4">Thank you for exploring</p>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-100 mb-6">
            Naval&apos;s Book Recommendations
          </h2>
          <p className="text-amber-300/60 text-xs max-w-xs mx-auto">
            &ldquo;Read what you love until you love to read.&rdquo;
            <br />— Naval Ravikant
          </p>
        </div>
      )}
    </div>
  )
})

CoverPage.displayName = "CoverPage"
