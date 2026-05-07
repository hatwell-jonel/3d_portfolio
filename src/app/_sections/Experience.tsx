'use client'
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { experiences } from "@/lib/data";

export function ExperienceSection() {
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