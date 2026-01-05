'use client';

import { aboutMe, experiences } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import ChatWithMe from "./ChatWithMe";

const AboutMe = () => {
  return (
    <>
            <div>
                <div className="text-3xl font-bold text-center">
                  <span className="text-white font-bold text-center">ABOUT ME</span>
                </div>
            </div>
            <>
              {
                aboutMe.map((text, index) => (
                  <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                  {text}
                  </p>
                ))
              }

              <ChatWithMe />

              <div className="relative">
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