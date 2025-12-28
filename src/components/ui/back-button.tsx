import { cn } from '@/lib/utils'
import { ArrowLeftToLine } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const BackButton = () => {
  const style = `
        absolute
        top-5
        left-5
        text-white
        font-sans
        bg-black/80
        p-1.75
        rounded-[10px]
        border-2
        border-[#ff6b6b]
        text-[14px]
        shadow-none
        flex
        items-center
        justify-center
        gap-2
        font-bold
        cursor-pointer
  `
  return (
    <Link 
      href="/"
      className={cn(style)}>
      <ArrowLeftToLine />
      EXIT
    </Link>
  )
}

export default BackButton
