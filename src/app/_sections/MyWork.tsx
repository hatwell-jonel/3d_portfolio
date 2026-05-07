'use client'
import Projects from "@/components/list/projects";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";
import { useModalStore } from "@/lib/stores/modal-store";
import { ArrowRight } from "lucide-react";

export function MyWorksSection() {
	const setModal = useModalStore((state) => state.setModal);
	
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

			<Projects 
				onlyFeatured={true}
			/>

			{
				projects.length > 3 && (
					<Button
						variant="outline"
						className="mt-6 group border-primary/30 hover:border-primary hover:bg-primary/10"
						onClick={() => setModal("myworks")}
					>
						View more projects
						<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Button>
				)
			}
		</section>
	)
}