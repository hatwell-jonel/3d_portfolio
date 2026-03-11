'use client';

import { aboutMe, experiences, techStack } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import ChatWithMe from "./ChatWithMe";
import { twMerge } from "tailwind-merge";


const style = {
	sectionTitle: twMerge(
		"text-sm font-bold uppercase tracking-widest text-foreground mb-4"
	) 
}
const AboutMe = () => {
	return (
		<>
					<div>
						<div className="text-3xl font-bold text-center">
                    		<span className='bg-linear-to-b from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent'>ABOUT ME</span> 
						</div>
					</div>
					<>
						{
							aboutMe.map((text, index) => (
							<p key={index} className="mb-4 text-muted-foreground leading-relaxed ">
							{text}
							</p>
							))
						}

					<div>
						<ChatWithMe />
					</div>

					<div className="my-10">
						<p className={style.sectionTitle}>Tech Stack</p>
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
					</div>

					<div className="relative">
						<p className={style.sectionTitle}>Experiences</p>
						{
							experiences.map((job, index) => (
							<div key={index} className="relative mb-9 last:mb-0">
								{/* Timeline dot */}
								<div className="absolute left-0 top-0 h-4 w-4 rounded-full border-2 border-primary bg-background ring-4 ring-background"></div>

								<Card className="group relative  bg-transparent shadow-none transition-all border-none! pt-0 ps-7">
								<CardHeader className="z-10 p-0">
									<div className="z-10 mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
									{job.period}
									</div>
									<div className="z-10">
									<CardTitle>
										<h3 className="font-medium leading-snug text-foreground">
										<div>
											<span>{job.title}</span>{" "}
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
							))
						}
					</div>


				</>
		</>
	)
}


export default AboutMe;