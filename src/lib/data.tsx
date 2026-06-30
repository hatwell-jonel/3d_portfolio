import { Snake, Sudoku, Tetris } from "@/app/3d/arcade";
import { MemoryGame, SpaceDodger } from "@jonelhatwell/arcade-games";
import type { Project } from "@/lib/types";

export const profile = {
  name: "Jonel Hatwell",
  initials: "JH",
  role: "Web Developer",
  location: "Caloocan City, Metro Manila, Philippines",
  status: "Available for work",
  tagline: "I build websites that work smoothly, look sharp, and make users smile.",
  email: "jonel.hatwell@gmail.com",
  phone: "+63 908 351 1931",
  github: "https://github.com/hatwell-jonel",
  portfolio: "https://jonelhatwell.vercel.app/",
  linkedin: "https://www.linkedin.com/in/jonel-hatwell/",
};

export type NavSection = {
  id: string;
  label: string;
};

export const navSections: NavSection[] = [
  { id: "profile", label: "Profile" },
  { id: "experience", label: "Experience" },
  { id: "techstack", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
];

export const skillChips: string[] = [
  "Next.js",
  "TypeScript",
  "React",
  "GraphQL",
  "TailwindCSS",
  "AI Integration",
];


export const aboutMe = [
  <>
    Full-Stack Web Developer focused on building modern web and AI-powered applications. I specialize in Next.js, React, TypeScript, Node.js, and integrating large language models (LLMs) and AI automation into scalable, user-centric products.
  </>,
];

export const experiences  = [
  {
    period: "Aug 2025 - June 2026",
    title: "Front-End Developer -> Full-Stack Developer",
    company: "ScaleForge",
    description:
      "Leveraged OpenCode AI to automate migration file generation for game onboarding workflows. Expanded into full-stack development, implementing game provider APIs and enhancing client-facing web applications using Next.js, Svelte, TypeScript, and GraphQL.",
    tags: ["Next.js", "Svelte", "TypeScript", "GraphQL", "Apollo", "TanStack Query", "Zustand"],
  },
  {
    period: "Jun 2024 - Jul 2025",
    title: "Web Developer",
    company: "Cargo Padala Express",
    description:
      "Designed and developed an in-house Financial Information Management System (FIMS) using Next.js, Drizzle ORM, and MySQL. Automated core accounting workflows, significantly reducing manual data entry errors and improving data accuracy.",
    tags: ["Next.js", "Drizzle ORM", "MySQL", "TypeScript"],
  },
  {
    period: "Sep 2022 - Apr 2024",
    title: "Junior Programmer",
    company: "Pinnacle Technologies Inc.",  
    description:
      "Played a key role in the maintenance and feature development of core products, including the Academic Information Management System (AIMS), HRIS, and Accounting systems, utilizing Laravel and CodeIgniter 3.",
    tags: ["Laravel", "CodeIgniter 3", "PHP", "MySQL"],
  },
]; 


export const techStack = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tanstack Query", "Zustand", "Apollo Client"],
  },  
  {
    category: "Backend/APIs",
    skills: ["Laravel (PHP)", "CodeIgniter", "NestJs", "RESTful APIs", "GraphQL", "AI Integration"],
  },
  {
    category: "Databases & ORM",
    skills: ["MySQL", "PostgreSQL", "Supabase", "Drizzle ORM", "MongoDB", "Firebase"],
  },
  {
    category: "Validation & Tools",
    skills: ["Zod", "React-Hook-Form", "OpenAI API/Gemini API", "Claude API", "OpenCode CLI", "Vercel"],
  },
  {
    category: "Styling & UI",
    skills: ["TailwindCSS", "SASS/SCSS", "ShadcnUI", "Bootstrap"],
  },
  {
    category: "Practices",
    skills: ["Git", "Agile/Scrum", "Monorepo Architecture", "Github Actions"],
  }
];


export const projects : Project[] = [
  // {
  //   title: "Anime Stream",
  //   description: "A streaming platform for watching anime with watch progress tracking and saved series.",
  //   image: "/assets/image/project-thumbnails/animestream.webp",
  //   tags: ["Next.js", "Tailwind", "ShadcnUI", "Typescript", "trpc", "API"],
  //   link: "https://animesstream.vercel.app/",
  //   isFeatured: true,
  // },
  {
    title: "Math Problem Generator with AI",
    description: "A math problem generator with AI that generates random math problems and provides step-by-step solutions.",
    image: "/assets/image/project-thumbnails/math-ai.png",
    tags: ["Next.js", "GenAI", "Tailwind", "AI"],
    link: "https://ai-math-generator-jonelhatwell.vercel.app/",
    isFeatured: true,
  },
  {
    title: "Snap Photography",
    description: "A productivity app for managing daily tasks with drag and drop functionality.",
    image: "/assets/image/project-thumbnails/snap-photography.png",
    tags: ["UnplashAPI", "API", "ReactJs"],
    link: "https://nextjs-snap-photography.vercel.app/",
    isFeatured: true,
  },
]

type Game = {
    name: string
    value: string;
    image: string
    description: string
    component: React.ReactNode
}

export const games: Game[] = [
    {
        name: 'Space Dodger',
        value: 'spaceDodger',
        image: '🚀',
        description: 'Space Dodger is a classic arcade game where you have to dodge asteroids and collect power-ups to score points.',
        component: <SpaceDodger />
    },
    {
        name: 'Memory Game',
        value: 'memoryGame',
        image: '🧠',
        description: 'Memorize and click the numbers in order. Levels get harder as the speed and count increase.', 
        component: <MemoryGame />
    },
    {
        name: 'Tetris',
        value: 'tetris',
        image: '🟦',
        description: 'Tetris is a classic arcade game where you have to clear lines of falling blocks to score points.',
        component: <Tetris />
    },
    {
        name: 'Snake',
        value: 'snake',
        image: '🐍',
        description: 'Snake is a classic arcade game where you have to eat apples and avoid obstacles to grow and grow.',
        component: <Snake />
    },
    {
        name: 'Sudoku',
        value: 'sudoku',
        image: '🔢',
        description: 'Sudoku is a classic arcade game where you have to fill in the numbers to complete the grid.', 
        component: <Sudoku />
    },
]

export const certificates = [
	{
		title: "SEO Certified",
		issuer: "HubSpot Academy",
    description: "Demonstrates a strong understanding of SEO fundamentals, including on-page optimization, keyword research, and link-building strategies to improve website visibility and search engine rankings.",
		image: "/assets/certificates/HUBSPOT_SEO_CERTIFICATE.png",
		credentials: "https://app-na2.hubspot.com/academy/achievements/z2q94b7v/en/1/jonel-hatwell/seo"
	},
	{
		title: "SEO II",
		issuer: "HubSpot Academy",
		description: "Builds upon foundational SEO knowledge by covering advanced techniques, such as technical SEO, content strategy, and performance analysis to drive more effective search engine marketing results.",
		image: "/assets/certificates/HUBSPOT_SEO_CERTIFICATE_II.png",
		credentials: "https://app-na2.hubspot.com/academy/achievements/lgtjvcfm/en/1/jonel-hatwell/seo-ii"
	},
]

export const writings = [
  {
    link: "https://www.linkedin.com/posts/jonel-hatwell_npm-npmjs-pnpm-activity-7407790141668433920-mPRD/",
    title: "How to build a library using React 19, Vite, Tsup, and PNPM",
    date: "12/19/2025",
  },
  {
    link: "https://www.linkedin.com/posts/jonel-hatwell_guide-activity-7409963472979066881-IBHf/",
    title: "Automating NPM Package Publishing with GitHub Actions",
    date: "12/25/2025"
  },
  {
    link: "https://www.linkedin.com/posts/jonel-hatwell_git-tag-activity-7412100414797471744-bzR0",
    title: "Mastering Git Tags: Your Version Release Superpower ",
    date: "12/31/2025"
  }
]


export { systemPrompt } from "./data/system-prompt";
export { resumeText } from "./data/resume";

export const WELCOME_MESSAGE = "Hey! 👋 Glad you're here. Feel free to ask me about my work, experience, or anything you're curious about.";
