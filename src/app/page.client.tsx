"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import ElectricBorder from "@/components/ui/electric-border/ElectricBorder"
import NavLinks from "@/components/features/NavLinks"
import SocialLinks from "@/components/features/SocialLinks"
import {  AboutSection, ExperienceSection, TechStackSection, MyWorksSection } from "./_sections"
import { CertificatesSection } from "./_sections/Certificate"


export default function PortfolioPage() {

	return (
		<>
			{/* Sidebar / Navigation */}
			<header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
				<div>
					<h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
						<Link href="/">Jonel Hatwell</Link>
					</h1>
					<h2 className="mt-3 text-lg font-medium tracking-tight text-primary sm:text-xl">Web Developer</h2>
					<p className="mt-4 max-w-xs leading-normal text-muted-foreground">
						I build websites that work smoothly, look sharp, and make users smile.
					</p>

					<NavLinks />

					<Link 
						href="/3d"
						className=""
					>
						<ElectricBorder
							color="#ff6661"
							speed={1}
							chaos={0.12}
							style={{ borderRadius: 16 }}
							className="w-fit"
						>
							<Button size="sm" className="px-12 mt-5 hidden lg:block">
								View in 3D
							</Button>
						</ElectricBorder>
					</Link>
				</div>
				<SocialLinks />
			</header>

			{/* Content Area */}
			<main id="content" className="pt-24 lg:w-1/2 lg:py-24">

				<AboutSection />
				<ExperienceSection />
				<TechStackSection />
				<MyWorksSection />
				<CertificatesSection />

				<footer className="max-w-md pb-16 text-sm text-muted-foreground sm:pb-0">
					<blockquote className="italic">
						<p>
							“The bridge between knowledge and skill is practice.
							The bridge between skill and mastery is time.”
						</p>
						<footer className="mt-2 not-italic">
						<cite>Jim Bouchard</cite>
						</footer>
					</blockquote>
				</footer>
			</main>
		</>

	)
}


