'use client'
import { Badge } from "@/components/ui/badge";
import { techStack } from "@/lib/data";

export function TechStackSection() {
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
