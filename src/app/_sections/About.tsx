"use client";
import { Card, CardContent } from "@/components/ui/card";
import { aboutMe } from "@/lib/data"
import ChatWithMe from "@/components/features/ChatWithMe"

export function AboutSection() {
	return (
		<section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="About me">
			<div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0">
				<h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Who I am</h2>
			</div>
			<div className="mb-12">
				{
				aboutMe.map((text, index) => (
					<p key={index} className="mb-4 text-muted-foreground leading-relaxed">
					{text}
					</p>
				))
				}
			</div>
			<ChatSection />
		</section>
	)
}


function ChatSection() {
	return (
		<Card className="border-primary/20 bg-primary/5">
			<CardContent >
				<div className="flex items-center justify-between">
					<div>
						<h3 className="font-semibold text-foreground mb-1">Want to chat?</h3>
						<p className="text-sm text-muted-foreground">  Let&apos;s start a quick conversation.</p>
					</div>

					<ChatWithMe />
				</div>
			</CardContent>
		</Card>
	)
}