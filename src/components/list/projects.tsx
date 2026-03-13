'use client'

import { ArrowUpRight } from "lucide-react"
import { projects } from '@/lib/data'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Project } from "@/lib/types"

interface ProjectsProps {
	onlyFeatured?: boolean
}

function ProjectItem({ project }: { project: Project }) {
	return (
		<li className="mb-12">
			<Link href={project.link} className="block" target="_blank">
				<Card className="group relative border-none bg-transparent shadow-none transition-all lg:hover:opacity-100 lg:group-hover/list:opacity-50">
				
				<div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition lg:-inset-x-6 lg:block lg:group-hover:bg-muted/50 lg:group-hover:shadow-lg"></div>

				<CardHeader className="p-0 z-10 grid gap-6 sm:grid-cols-8">

					{/* Project Image */}
					<div className="relative sm:col-span-3 sm:order-1">
						<div className="relative w-full aspect-video overflow-hidden rounded border-2 border-muted/50 transition group-hover:border-primary/50">
							<Image
								src={project.image}
								alt={project.title}
								fill
								className="object-cover transition group-hover:scale-105"
							/>
						</div>
					</div>

					{/* Project Info */}
					<div className="z-10 sm:order-2 sm:col-span-5">
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
							{project.tags.map((tag: string) => (
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
			</Link>
		</li>
	)
}
export default function Projects({ onlyFeatured = false }: ProjectsProps) {
	const data = onlyFeatured
		? projects.filter((p) => p.isFeatured)
		: projects

	return (
		<ul className="group/list">
			{data.map((project, index) => (
				<ProjectItem key={index} project={project} />
			))}
		</ul>
	)
}