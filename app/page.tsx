import type { Metadata } from "next"
import { BookViewer } from "@/components/book-viewer"

export const metadata: Metadata = {
  title: "The Book of Love | Understanding True Love vs Attachment",
  description:
    "An interactive book exploring what love is, how to love without attachment, and the profound depth of true connection. Discover quotes and reflections on love.",
  keywords: [
    "Love",
    "What is love",
    "How to love",
    "Love vs attachment",
    "Love quotes",
    "True love",
    "Letting go",
    "Relationships",
  ],
  authors: [{ name: "LoveScript" }],
  creator: "LoveScript",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lovescript.vercel.app",
    siteName: "The Book of Love",
    title: "The Book of Love | Understanding True Love vs Attachment",
    description:
      "Explore the profound depths of love, transcending attachment. What is love? How do we love freely?",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Book of Love",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Home() {
  return (
    <>
      <BookViewer />
    </>
  )
}
