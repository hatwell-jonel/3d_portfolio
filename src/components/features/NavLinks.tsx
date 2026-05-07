'use client'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
    { id: "about", label: "Who I am" },
    { id: "experiences", label: "Experiences" },
    { id: "techstack", label: "Tech Stack" },
    { id: "works", label: "My Works" },
    { id: "writings", label: "Writings" },
    { id: "certificates", label: "Certificates" },
] 

type NavItemProps = {
    id: string
    label: string
    active: boolean
    onClick: (id: string) => void
}

function NavItem({ id, label, active, onClick }: NavItemProps) {
    const indicatorClass = active
        ? "w-16 bg-foreground"
        : "w-8 bg-muted-foreground"

    const textClass = active
        ? "text-foreground"
        : "text-muted-foreground"
    
    return (
        <li>
            <a
                href={`#${id}`}
                onClick={() => onClick(id)}
                className={`group flex items-center py-3 ${active ? "active" : ""}`}
            >
                <span
                    className={cn(
                        "group-hover:w-16 group-hover:bg-foreground group-focus-visible:w-16 group-focus-visible:bg-foreground",
                        'mr-4 h-px transition-all motion-reduce:transition-none',
                        indicatorClass,
                    )}
                />
                <span
                    className={cn(
                        "group-hover:text-foreground group-focus-visible:text-foreground",
                        "text-xs font-bold uppercase tracking-widest transition-colors",
                        textClass,
                    )}
                >
                    {label}
                </span>
            </a>
        </li>
    )
}

export default function NavLinks() {
    const [activeSection, setActiveSection] = useState(NAV_LINKS[0].id)

    useEffect(() => {
        const sectionIds = NAV_LINKS.map(link => link.id)

        const handleScroll = () => {
        const scrollPosition = window.scrollY + 200

        for (const id of sectionIds) {
            const element = document.getElementById(id)

            if (!element) continue

            const { offsetTop, offsetHeight } = element

            if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
            ) {
            setActiveSection(id)
            break
            }
        }
        }

        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav className="nav hidden lg:block" aria-label="In-page jump links">
            <ul className="mt-16 w-max">
                {NAV_LINKS.map(link => (
                    <NavItem
                        key={link.id}
                        id={link.id}
                        label={link.label}
                        active={activeSection === link.id}
                        onClick={setActiveSection}
                    />
                ))}
            </ul>
        </nav>
    )
}