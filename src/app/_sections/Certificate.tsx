'use client'
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { certificates } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image"

export function CertificatesSection() {
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
