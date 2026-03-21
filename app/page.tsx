import type { Metadata } from "next"
import { BookViewer } from "@/components/book-viewer"

export const metadata: Metadata = {
  title: "Naval Ravikant's Book Recommendations | Must-Read Books for Wealth & Wisdom",
  description:
    "Discover the books Naval Ravikant recommends for building wealth, finding happiness, and achieving success. Curated reading list featuring Sapiens, The Black Swan, Antifragile, and more transformative titles.",
  keywords: [
    "Naval Ravikant books",
    "Naval Ravikant reading list",
    "best books for entrepreneurs",
    "wealth building books",
    "self improvement books",
    "Naval book recommendations",
    "philosophy books",
    "science fiction books Naval",
    "stoicism books",
    "personal development reading list",
    "business books",
    "startup founder books",
  ],
  authors: [{ name: "Naval Ravikant Book Recommendations" }],
  creator: "Naval Ravikant Book Recommendations",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://naval-books.vercel.app",
    siteName: "Naval Ravikant Book Recommendations",
    title: "Naval Ravikant's Book Recommendations | Must-Read Books for Wealth & Wisdom",
    description:
      "Discover the books Naval Ravikant recommends for building wealth, finding happiness, and achieving success. 23+ handpicked titles from philosophy to science fiction.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Naval Ravikant Book Recommendations - Curated Reading List",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naval Ravikant's Book Recommendations",
    description:
      "Discover 23+ books Naval recommends for wealth, wisdom, and happiness. From Sapiens to The Black Swan.",
    images: ["/og-image.jpg"],
    creator: "@naval",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://naval-books.vercel.app",
  },
}

export default function Home() {
  return (
    <>
      <BookViewer />
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Naval Ravikant's Book Recommendations",
            description:
              "A curated list of books recommended by Naval Ravikant for building wealth and finding happiness",
            numberOfItems: 23,
            itemListElement: [
              {
                "@type": "Book",
                position: 1,
                name: "Sapiens: A Brief History of Humankind",
                author: { "@type": "Person", name: "Yuval Noah Harari" },
              },
              {
                "@type": "Book",
                position: 2,
                name: "The Black Swan",
                author: { "@type": "Person", name: "Nassim Nicholas Taleb" },
              },
              {
                "@type": "Book",
                position: 3,
                name: "Antifragile",
                author: { "@type": "Person", name: "Nassim Nicholas Taleb" },
              },
            ],
          }),
        }}
      />
    </>
  )
}
