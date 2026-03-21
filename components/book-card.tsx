"use client"

import type { Book } from "@/lib/books-data"
import { Star, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface BookCardProps {
  book: Book
  index: number
  compact?: boolean
}

export function BookCard({ book, index, compact = false }: BookCardProps) {
  return (
    <div className={`flex flex-col items-center justify-center h-full ${compact ? "p-3 md:p-4" : "p-4 md:p-8"}`}>
      <div
        className={`flex flex-col gap-4 items-center w-full ${compact ? "max-w-xs" : "max-w-4xl md:flex-row md:gap-10"}`}
      >
        {/* Book Cover */}
        <div className="relative group shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/20 to-amber-800/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500" />
          <div className="relative">
            <img
              src={book.book_cover_image_url || "/placeholder.svg"}
              alt={`Cover of ${book.title}`}
              className={`object-cover rounded-md shadow-2xl ${compact ? "w-28 h-40 md:w-36 md:h-52" : "w-40 h-56 md:w-52 md:h-72"}`}
              crossOrigin="anonymous"
            />
            <div className="absolute top-2 left-2 bg-amber-900/90 text-amber-50 text-xs font-medium px-2 py-1 rounded">
              #{index + 1}
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="flex flex-col gap-2 text-center flex-1 min-w-0">
          <div>
            <Badge variant="secondary" className="mb-1 bg-amber-100 text-amber-900 hover:bg-amber-200 text-xs">
              {book.genre}
            </Badge>
            <h2
              className={`font-serif font-bold text-amber-950 leading-tight text-balance ${compact ? "text-sm md:text-base lg:text-lg" : "text-xl md:text-2xl lg:text-3xl"}`}
            >
              {book.title}
            </h2>
            <p className={`text-amber-800 mt-1 ${compact ? "text-xs md:text-sm" : "text-base md:text-lg"}`}>
              by {book.author}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-1 flex-wrap">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`${compact ? "w-3 h-3" : "w-4 h-4"} ${
                    i < Math.floor(book.amazon_in_customer_rating) ? "fill-amber-500 text-amber-500" : "text-amber-300"
                  }`}
                />
              ))}
            </div>
            <span className={`text-amber-900 font-medium ${compact ? "text-xs" : "text-sm"}`}>
              {book.amazon_in_customer_rating}
            </span>
            <span className={`text-amber-600 ${compact ? "text-xs" : "text-sm"}`}>
              ({book.total_reviews.toLocaleString()})
            </span>
          </div>

          {/* CTA Button */}
          <Button
            asChild
            size={compact ? "sm" : "default"}
            className="bg-amber-900 hover:bg-amber-800 text-amber-50 w-full mt-1"
          >
            <a
              href={book.amazon_in_product_url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              aria-label={`View ${book.title} on Amazon (affiliate link)`}
            >
              View on Amazon
              <ExternalLink className={`ml-2 ${compact ? "w-3 h-3" : "w-4 h-4"}`} />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
