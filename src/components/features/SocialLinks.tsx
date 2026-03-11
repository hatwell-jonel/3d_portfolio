'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Github, Linkedin, Mail, Phone } from "lucide-react"

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    icon: Github,
    href: "https://github.com/hatwell-jonel",
  },
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/jonel-hatwell/",
  },
  {
    label: "Email",
    icon: Mail,
    href: "mailto:jonelhatwell@gmail.com",
    tooltip: "Gmail | jonelhatwell@gmail.com",
  },
  {
    label: "Phone",
    icon: Phone,
    tooltip: "(+63) 906-0280-894",
  },
]

export default function SocialLinks() {
  return (
    <TooltipProvider>
      <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
        {SOCIAL_LINKS.map((item, index) => {
          const Icon = item.icon

          return (
            <li key={item.label} className={index !== SOCIAL_LINKS.length - 1 ? "mr-5" : ""}>
              <Tooltip>
                <TooltipTrigger asChild>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block hover:text-primary transition-colors"
                    >
                      <span className="sr-only">{item.label}</span>
                      <Icon className="h-6 w-6" />
                    </a>
                  ) : (
                    <div className="cursor-pointer hover:text-primary transition-colors">
                      <span className="sr-only">{item.label}</span>
                      <Icon className="h-6 w-6" />
                    </div>
                  )}
                </TooltipTrigger>

                <TooltipContent className="font-bold text-primary">
                  {item.tooltip || item.label}
                </TooltipContent>
              </Tooltip>
            </li>
          )
        })}
      </ul>
    </TooltipProvider>
  )
}