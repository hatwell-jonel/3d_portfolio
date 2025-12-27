"use client"

import Link from "next/link"
import { useState } from "react"
import { twMerge as tw } from "tailwind-merge";


/**
 * 375px is the breakpoint for mobile devices
 * 768px is the breakpoint for tablets
 * 1024px is the breakpoint for desktops
 * 1280px is the breakpoint for large screens
 */
const screenBreakpoint = "min-[375px]:w-full min-[768px]:w-[85%] min-[1024px]:w-[80%] min-[1280px]:w-[60%]"

const stylePositon = {
	classViewText: "absolute top-[37%] left-[42%] transition-all duration-500 ",
}


export default function LandingPage() {
	const [hoveredSide, setHoveredSide] = useState<"3d" | "2d" | null>(null)

	return (
		<div className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]" style={{ perspective: "1000px" }}>

			<div className="absolute top-6 md:top-10 left-0 right-0 z-20 text-center px-4">
				<h1 className="font-bold text-[#ff6b6b] text-[clamp(1.8rem,5vw,3.5rem)] mb-2">Welcome to my portfolio</h1>
				<p className="text-[#ff6b6b]/70 text-[clamp(0.9rem,2.5vw,1.1rem)]">Choose your viewing experience</p>
			</div>

			{/* Diagonal Split Container */}
			<div className="@container not-visited:relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>

				{/* 3D Side */}
				<Link
					href="/3d"
					onMouseEnter={() => setHoveredSide("3d")}
					onMouseLeave={() => setHoveredSide(null)}
					className="absolute inset-0 group cursor-pointer block"
					style={{
						clipPath: "polygon(0 100%, 0 0, 100% 0)",
						transformStyle: "preserve-3d",
					}}
					aria-label="View 3D Portfolio"
				>
				
					<div
						className={`absolute inset-0 bg-linear-to-br from-[#ff6b6b]/20 via-transparent to-transparent transition-opacity duration-700 ${
						hoveredSide === "3d" ? "opacity-100" : "opacity-0"
						}`}
					/>

					<div
						className="absolute inset-0 flex items-center justify-center"
						style={{
						transformStyle: "preserve-3d",
						}}
					>
						<div
						className="relative -translate-y-20 md:-translate-x-30 lg:-translate-x-50 xl:-translate-x-70 transition-transform duration-700"
						style={{
							transformStyle: "preserve-3d",
							transform:
							hoveredSide === "3d"
								? "translateY(-5rem) translateX(-5rem) translateZ(80px) rotateX(-8deg) rotateY(8deg)"
								: "translateY(-5rem) translateX(-5rem) translateZ(0) rotateX(0) rotateY(0)",
						}}
						>
							<span
								className={`text-[120px]  md:text-[170px] lg:text-[200px] xl:text-[220px] font-bold text-[#ff6b6b] transition-all duration-700 block ${
								hoveredSide === "3d"
									? "scale-110 drop-shadow-[0_0_30px_rgba(255,107,107,0.8)]"
									: "scale-100 drop-shadow-[0_0_10px_rgba(255,107,107,0.3)]"
								}`}
								style={{
								textShadow:
									hoveredSide === "3d"
									? "0 0 30px rgba(255,107,107,0.8), 5px 5px 0 rgba(255,107,107,0.3), 10px 10px 0 rgba(255,107,107,0.2)"
									: "0 0 10px rgba(255,107,107,0.3)",
								}}
							>
								3D
							</span>
						</div>
					</div>

					<ParticleEffect color="#ff6b6b" hoveredSide={hoveredSide} side="3d" />
				</Link>

				{/* 2D Side */}
				<Link
					href="/2d"
					onMouseEnter={() => setHoveredSide("2d")}
					onMouseLeave={() => setHoveredSide(null)}
					className="absolute inset-0 group cursor-pointer block bg-red-500"
					style={{
						clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
					}}
					aria-label="View 2D Portfolio"
				>
					{/* Background overlay */}
					<div
						className={`absolute inset-0 bg-[#2b0e1f] transition-all duration-700 ${
							hoveredSide === "2d" ? "opacity-100" : hoveredSide === "3d" ? "opacity-40" : "opacity-60"
						}`}
					/>

					{/* Animated gradient overlay */}
					<div
						className={`absolute inset-0 bg-linear-to-tl from-[#ff6b6b]/75 via-transparent to-transparent transition-opacity duration-700 ${
						hoveredSide === "2d" ? "opacity-100" : "opacity-0"
						}`}
					/>

					{/* 2D Text */}
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="relative translate-y-50 translate-x-16 md:translate-x-50 lg:translate-x-80 xl:translate-x-90 ">
							<span
								className={`text-[150px] md:text-[170px] lg:text-[200px] xl:text-[220px] font-bold text-[#0a0a0a] transition-all duration-700 ${
								hoveredSide === "2d"
									? "scale-110 drop-shadow-[0_0_30px_rgba(255,107,107,0.8)]"
									: "scale-100 drop-shadow-[0_0_10px_rgba(255,107,107,0.3)]"
								}`}
							>
								2D
							</span>
						</div>
					</div>

					<ParticleEffect color="#ff6b6b" hoveredSide={hoveredSide} side="2d" />
				
				</Link>
			</div>

			{/* Mobile hint */}
			<div className="absolute bottom-8 left-0 right-0 z-20 text-center px-4 md:hidden">
				<p className="text-sm text-[#ff6b6b]/50">Tap to choose</p>
			</div>
		</div>
	)
}

interface ParticleEffectProps {
	color: string
	hoveredSide: "3d" | "2d" | null
	side: "3d" | "2d"
}
function ParticleEffect({color, hoveredSide, side}: ParticleEffectProps) {

	if (side === "3d") {
		return (
			<div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${hoveredSide === "3d" ? "opacity-100" : "opacity-0"}`}>
				{/* medium ping */}
				<div className={tw(`absolute top-1/4 left-1/4 w-4 h-4 bg-[${color}] rounded-full animate-ping`)} />
				{/* Small pulse */}
				<div className={tw(`absolute top-1/3 left-1/3 w-3 h-3 bg-[${color}] rounded-full animate-pulse`)} style={{ animationDelay: "0.2s" }} />
				{/* Small ping */}
				<div className={tw(`absolute top-1/2 left-1/5 w-1.5 h-1.5 bg-[${color}] rounded-full animate-ping`)} style={{ animationDelay: "0.4s" }} />
			</div>
		)
	}

	if(side === "2d") {

		return (
			<div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${hoveredSide === "2d" ? "opacity-100" : "opacity-0"}`}>
				{/* medium ping */}
				<div className={tw(`absolute bottom-1/4 right-1/4 w-4 h-4 bg-[${color}] rounded-full animate-ping`)} />
				{/* Small pulse */}
				<div className={tw(`absolute bottom-1/3 right-1/3 w-3 h-3 bg-[${color}] rounded-full animate-pulse`)} style={{ animationDelay: "0.2s" }} />
				{/* Small ping */}
				<div className={tw(`absolute bottom-1/2 right-1/5 w-2.5 h-2.5 bg-[${color}] rounded-full animate-ping`)} style={{ animationDelay: "0.4s" }}/>
			</div>
		)
	}
}