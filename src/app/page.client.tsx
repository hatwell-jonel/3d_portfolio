"use client"

import {  ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import ChatWithMe from "@/components/features/ChatWithMe"
import Maintenance from "@/components/features/Maintenance"
import { aboutMe, certificates, experiences, projects, techStack } from "@/lib/data"
import { Button } from "@/components/ui/button"
import ElectricBorder from "@/components/ui/electric-border/ElectricBorder"
import NavLinks from "@/components/features/NavLinks"
import SocialLinks from "@/components/features/SocialLinks"


export default function PortfolioPage() {

	return (
		<div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
			<div className="mx-auto max-w-7xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
				<div className="lg:flex lg:justify-between lg:gap-4">
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
						<CertificatesSection />
						<MyWorksSection />

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
				</div>
			</div>
		</div>
	)
}


function AboutSection() {
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

function ExperienceSection() {
	return (       
		<section
			id="experiences"
			className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
			aria-label="My experiences"
		>
			<div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0">
				<h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Experiences</h2>
			</div>
			<div className="relative ml-3 border-l-2 border-muted-foreground/20 pl-8">
				{/* Timeline dot */}
				{experiences.map((job, index) => (
					<div key={index} className="relative mb-12 last:mb-0">
						{/* Timeline dot */}
						<div className="absolute -left-10.25 top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background ring-4 ring-background"></div>

						<Card className="group relative border-none bg-transparent shadow-none transition-all lg:hover:opacity-100!">
							<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-muted/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
							<CardHeader className="z-10 p-0">
								<div className="z-10 mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
									{job.period}
								</div>
								<div className="z-10">
									<CardTitle>
										<h3 className="font-medium leading-snug text-foreground">
											<div>
												<span className="text-base">{job.title}</span>{" "}
												<span className="inline-block text-primary">· {job.company}</span>
											</div>
										</h3>
									</CardTitle>
									<CardDescription className="mt-2 text-sm leading-normal text-muted-foreground">
										{job.description}
									</CardDescription>
									<CardContent className="mt-2 flex flex-wrap gap-1.5 p-0" aria-label="Technologies used">
										{job.tags.map((tag) => (
											<Badge
											key={tag}
											variant="secondary"
											className="bg-primary/10 text-primary hover:bg-primary/20"
											>
											{tag}
											</Badge>
										))}
									</CardContent>
								</div>
							</CardHeader>
						</Card>
					</div>
				))}
			</div>
		</section>
	)
}

function TechStackSection() {
	return (
		<section
			id="techstack"
			className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
			aria-label="tech stack"
		>
			<div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0">
				<h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Tech Stack</h2>
			</div>
			<div>
				<div className="grid grid-cols-1 gap-8">
				{techStack.map((group) => (
					<div key={group.category}>
					<h3 className="text-xs uppercase tracking-wider text-foreground mb-4">
						{group.category}
					</h3>
					<ul className="flex flex-wrap gap-2" aria-label={`${group.category} skills`}>
						{group.skills.map((skill) => (
						<li key={skill}>
							<Badge
							variant="secondary"
							className="px-3 py-1 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all cursor-default"
							>
							{skill}
							</Badge>
						</li>
						))}
					</ul>
					</div>
				))}
				</div>
			</div>
		</section>
	)
}

function CertificatesSection() {
	return (
		<section
			id="certificates"
			className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
			aria-label="My certificates"
		>
			<div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0">
				<h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Certificates</h2>
			</div>
			<ul className="group/list">
				{certificates.map((cert, index) => (
					<li key={index} className="mb-12">
						<a
							href={cert.credentials}
							target="_blank"
							rel="noreferrer"
							className="block"
						>
							<Card className="group relative border-none bg-transparent shadow-none transition-all lg:hover:opacity-100! lg:group-hover/list:opacity-50">
								<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-muted/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
								<CardHeader className="p-0 z-10 grid gap-4 sm:grid-cols-8 sm:gap-8 md:gap-4">
									<div className="z-10 sm:order-2 sm:col-span-6">
										<CardTitle>
											<h3 className="font-medium leading-snug text-foreground">
												<span>{cert.title}</span>
												<span className="inline-block text-primary ms-4"> · {cert.issuer}</span>
												<span className="inline-block ml-1">
													<ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
												</span>
											</h3>
										</CardTitle>
										<CardDescription className="mt-2 text-sm leading-normal text-muted-foreground">
											{cert.description}
										</CardDescription>
									</div>
									<div className="z-10 sm:order-1 sm:col-span-2">
										<Image
											alt={cert.title}
											loading="lazy"
											width="200"
											height="48"
											decoding="async"
											className="rounded border-2 border-muted/50 transition group-hover:border-primary/50 sm:translate-y-1"
											src={cert.image || "/placeholder.svg"}
										/>
									</div>
								</CardHeader>
							</Card>
						</a>
					</li>
				))}
			</ul>
		</section>
	)
}

function MyWorksSection() {
	return (
		<section
			id="works"
			className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
			aria-label="Selected projects"
		>
			<div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0">
				<h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
					My Works
				</h2>
			</div>

			<ul className="group/list">
				{projects.map((project, index) => (
					<li key={index} className="mb-12">
						<Link href={project.link} className="block" target="_blank">
							<Card className="group relative border-none bg-transparent shadow-none transition-all lg:hover:opacity-100 lg:group-hover/list:opacity-50">
								<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition lg:-inset-x-6 lg:block lg:group-hover:bg-muted/50 lg:group-hover:shadow-lg"></div>

								<CardHeader className="p-0 z-10 grid gap-4 sm:grid-cols-8 sm:gap-8 md:gap-4">
									
									{/* Project Info */}
									<div className="z-10 sm:order-2 sm:col-span-6">
										<CardTitle>
											<h3 className="font-medium leading-snug text-foreground">
												<span>{project.title}</span>

												<span className="inline-block ml-2">
													<ArrowUpRight className="inline-block h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
												</span>
											</h3>
										</CardTitle>

										<CardDescription className="mt-2 text-sm leading-normal text-muted-foreground">
											{project.description}
										</CardDescription>

										<CardContent className="mt-3 flex flex-wrap gap-2 p-0">
											{project.tags.map((tag) => (
												<Badge
													key={tag}
													variant="secondary"
													className="bg-primary/10 text-primary hover:bg-primary/20"
												>
													{tag}
												</Badge>
											))}
										</CardContent>
									</div>

									{/* Project Image */}
									<div className="z-10 sm:order-1 sm:col-span-2">
										<Image
											src={project.image}
											alt={project.title}
											width={200}
											height={120}
											className="rounded border-2 border-muted/50 transition group-hover:border-primary/50 sm:translate-y-1"
										/>
									</div>
								</CardHeader>
							</Card>
						</Link>
					</li>
				))}
			</ul>
		</section>
	)
}