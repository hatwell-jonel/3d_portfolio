"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#2b0e1f] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-2xl w-full">
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border border-primary/20 animate-pulse">
          <AlertCircle className="w-12 h-12 text-primary" />
        </div>

        <h1 className="text-8xl md:text-[12rem] font-black text-primary tracking-tighter leading-none mb-4 drop-shadow-2xl">
          404
        </h1>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-primary/50 tracking-tight text-balance">
            Lost in the eggplant void.
          </h2>
          <p className="text-primary/40 text-lg md:text-xl max-w-md mx-auto leading-relaxed text-pretty">
            The page you&apos;re looking for has vanished into the deep shadows. Let&apos;s get you back to safety.
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto px-8 py-6 text-lg font-semibold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Link>
          </Button>
        </div>
      </main>

      <footer className="absolute bottom-8 left-0 w-full text-primary/40  text-sm font-mono tracking-widest uppercase">
        Error Code: ERR_PAGE_NOT_FOUND_VOID
      </footer>
    </div>
  )
}
