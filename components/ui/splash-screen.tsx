"use client"

import { useEffect, useState } from "react"
import { BookOpen } from "lucide-react"

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    // Start fade out at 2.5s
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true)
    }, 2500)

    // Completely remove from DOM at 3.3s
    const removeTimer = setTimeout(() => {
      setIsVisible(false)
    }, 3300)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-rose-50 dark:bg-rose-950 transition-opacity duration-700 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.3); opacity: 0.6; }
        }
        @keyframes float-up {
          0% { transform: scale(0.5) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes bounce-dot {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-pulse-glow { animation: pulse-glow 3s infinite ease-in-out; }
        .animate-float-up { animation: float-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .bounce-1 { animation: bounce-dot 0.6s infinite 0ms; }
        .bounce-2 { animation: bounce-dot 0.6s infinite 150ms; }
        .bounce-3 { animation: bounce-dot 0.6s infinite 300ms; }
      `}</style>

      <div className="relative">
        {/* Pulsing glow background */}
        <div className="absolute inset-0 bg-rose-400 blur-3xl rounded-full animate-pulse-glow" />

        {/* Main Logo Container */}
        <div className="relative flex flex-col items-center animate-float-up">
          <div className="w-24 h-24 mb-6 rounded-3xl bg-linear-to-br from-rose-500 to-pink-600 shadow-2xl flex items-center justify-center border-4 border-white/20 backdrop-blur-sm">
            <BookOpen className="w-12 h-12 text-white" />
          </div>

          <div className="text-center opacity-0 [animation-delay:600ms] animate-float-up bg-inherit">
            <h1 className="text-3xl font-serif font-bold text-rose-950 dark:text-rose-50 tracking-tight">
              LoveScript
            </h1>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <div className="w-1 h-1 rounded-full bg-rose-400 bounce-1" />
              <div className="w-1 h-1 rounded-full bg-rose-500 bounce-2" />
              <div className="w-1 h-1 rounded-full bg-rose-400 bounce-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
