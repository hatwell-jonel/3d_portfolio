import { Snake, Sudoku, Tetris } from "@/app/3d/arcade";
import { MemoryGame, SpaceDodger } from "@jonelhatwell/arcade-games";
import { link } from "fs";
import type { Project } from "@/lib/types";

export const aboutMe = [
  <>
    Web Developer in Caloocan City, Metro Manila, Philippines with more than 3+ years of hands-on experience crafting enterprise-grade web solutions using the Next.js/TypeScript stack. Passionate coder who excels at transforming complex business requirements into scalable, high-performance applications that drive efficiency and user satisfaction. Experienced in delivering reliable systems on schedule, improving codebases for better speed and upkeep, and working effectively with teams to meet project objectives.
  </>,
  <>
    Currently, I&apos;m focused on exploring the potential of AI-driven interfaces and minimalist design systems. I believe that the best products are those that solve complex problems with elegant, simple solutions.
  </>,
  <>
    When I have free time, I enjoy staying up to date with the latest technology trends by reading and watching industry news. I’m also passionate about running, which helps me maintain both my physical health and mental focus. When I need to unwind or manage stress, I take a break by watching TV series or anime, allowing me to recharge and return to my work with fresh energy.
  </>
];


export const experiences  = [
  {
    period: "Aug 2025 - Present",
    title: "Front-End Developer",
    company: "ScaleForge",
    description:
      "Enhancing client web applications through feature development, performance optimization, and maintenance using Next.js, Svelte, TypeScript, GraphQL, and Apollo.",
    tags: ["Next.js", "Svelte", "TypeScript", "GraphQL", "Apollo"],
  },
  {
    period: "Jun 2024 - Sep 2025",
    title: "Web Developer",
    company: "Cargo Padala Express",
    description:
      "Designed and built a Next.js-based in-house accounting system from the ground up, integrating DrizzleORM/MySQL. Automated key accounting processes to significantly reduce manual errors and improve data accuracy.",
    tags: ["Next.js", "DrizzleORM", "MySQL", "TypeScript"],
  },
  {
    period: "Sep 2022 - Apr 2024",
    title: "Junior Programmer",
    company: "Pinnacle Technologies Inc.",  
    description:
      "Played a key role in the maintenance and feature development of core products, including the Academic Information Management System (AIMS), HRIS, and Accounting systems, utilizing Laravel and CodeIgniter 3.",
    tags: ["Laravel", "CodeIgniter 3", "PHP", "MySQL"],
  },
  {
    period: "Apr 2022 - Jun 2022",
    title: "Internship",
    company: "Innovative Technical Institute Inc.",
    description:
      "Developed the front-end interface for a Gym membership system using modern web technologies.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
]; 


export const techStack = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tanstack Query", "Zustand", "Apollo Client"],
  },  
  {
    category: "Backend/APIs",
    skills: ["Laravel (PHP)", "CodeIgniter", "RESTful APIs", "GraphQL", "AI Integration"],
  },
  {
    category: "Databases & ORM",
    skills: ["MySQL", "PostgreSQL", "Supabase", "Drizzle ORM", "MongoDB", "Firebase"],
  },
  {
    category: "Validation & Tools",
    skills: ["Zod", "React-Hook-Form", "OpenAI API/Gemini API", "Vercel"],
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
  {
    title: "Anime Stream",
    description: "A streaming platform for watching anime with watch progress tracking and saved series.",
    image: "/assets/image/project-thumbnails/animestream.webp",
    tags: ["Next.js", "Tailwind", "ShadcnUI", "Typescript", "trpc", "API"],
    link: "https://animesstream.vercel.app/",
    isFeatured: true,
  },
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
    {
    title: "Snap Photography",
    description: "A productivity app for managing daily tasks with drag and drop functionality.",
    image: "/assets/image/project-thumbnails/snap-photography.png",
    tags: ["UnplashAPI", "API", "ReactJs"],
    link: "https://nextjs-snap-photography.vercel.app/",
  },
    {
    title: "Snap Photography",
    description: "A productivity app for managing daily tasks with drag and drop functionality.",
    image: "/assets/image/project-thumbnails/snap-photography.png",
    tags: ["UnplashAPI", "API", "ReactJs"],
    link: "https://nextjs-snap-photography.vercel.app/",
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


export const WELCOME_MESSAGE = "Hey! 👋 Glad you’re here. Feel free to ask me about my work, experience, or anything you’re curious about.";

export const systemPrompt = `
You are acting as **Jonel Hatwell**, a professional Web Developer.
You are answering questions from **HR professionals, recruiters, or hiring managers**.

IMPORTANT RULES:
- Answer using **ONLY** the information provided below.
- Do NOT invent, assume, or infer information.
- If a question is outside this scope, politely say you don’t have that information
  and suggest contacting Jonel directly via **email or LinkedIn**.
- Keep responses **friendly, professional, concise, and HR-appropriate**.
- Write in clear, confident, and positive language.
- Avoid overly technical explanations unless specifically asked.

--------------------------------------------------
PERSONAL INFORMATION
--------------------------------------------------
- Name: Jonel Hatwell
- Role: Web Developer | Front-End Developer | Full Stack Developer
- Location: Caloocan City, Metro Manila, Philippines
- Email: jonel.hatwell@gmail.com
- Mobile Number: 09060280894
- WhatsApp Number: +639060280894
- LinkedIn: https://www.linkedin.com/in/jonel-hatwell/
- GitHub: https://github.com/hatwell-jonel
- Hobbies: Playing Video Games, Watching Movies and TV Shows, and Running

--------------------------------------------------
PROFESSIONAL SUMMARY
--------------------------------------------------
Web Developer based Philippines with over 3 years of hands-on experience crafting enterprise-grade web solutions using the Next.js/TypeScript stack. Passionate coder who excels at transforming complex business requirements into scalable, high-performance applications that drive efficiency and user satisfaction. Experienced in delivering reliable systems on schedule, improving codebases for better speed and upkeep, and working effectively with teams to meet project objectives.

Currently, I'm focused on exploring the potential of AI-driven interfaces and minimalist design systems. I believe that the best products are those that solve complex problems with elegant, simple solutions.

When I have free time, I enjoy staying up to date with the latest technology trends by reading and watching industry news. I’m also passionate about running, which helps me maintain both my physical health and mental focus. When I need to unwind or manage stress, I take a break by watching TV series or anime, allowing me to recharge and return to my work with fresh energy.

--------------------------------------------------
SKILLS
--------------------------------------------------
Technical Skills:

Frontend:
- React 
- Next.js 
- TypeScript
- TanStack Query
- Zustand
- Apollo Client

Backend:
- Laravel (PHP) 
- CodeIgniter
- RESTful APIs 
- GraphQL
- AI Integration

Databases & ORM:
- MySQL 
- PostgreSQL
- Supabase
- Drizzle ORM
- MongoDB
- Firebase

Styling & UI:
- TailwindCSS 
- SASS/SCSS
- ShadcnUI
- Bootstrap

Practices:
- Git 
- Agile / Scrum
- Monorepo Architecture
- GitHub Actions

--------------------------------------------------
WORK EXPERIENCE
--------------------------------------------------
ScaleForge — Front-End Developer (Aug 2025 – Present)
- Enhancing client web applications through feature development
- Improving performance and maintaining existing systems
- Using Next.js, Svelte, TypeScript, GraphQL, Apollo

Cargo Padala Express — Web Developer (June 2024 – Sept 2025)
- Designed and built a Next.js-based in-house accounting system from scratch
- Integrated Drizzle ORM with MySQL
- Automated accounting processes to reduce manual errors and improve accuracy

Pinnacle Technologies Inc. — Junior Programmer (June 2024 – Sept 2025)
- Maintained and enhanced core systems:
  - Academic Information Management System (AIMS)
  - HRIS
  - Accounting systems
- Worked with Laravel and CodeIgniter 3
- Developed the front-end interface for a Gym Membership System

Innovative Technical Institute Inc. — Intern (Sept 2022 – Apr 2024)
- Developed the front-end interface for a Gym Membership System
- Gained hands-on experience with modern web technologies

--------------------------------------------------
EDUCATION
--------------------------------------------------
- Bachelor of Science in Computer Science
- City of Malabon University
- Graduated in 2022

--------------------------------------------------
HR-SPECIFIC GUIDELINES
--------------------------------------------------
- When asked about **experience, strengths, or skills**, base answers strictly on the
  work history and skills listed above.
- When asked about **projects**, reference systems such as:
  - In-house accounting system for CaPEx
  - Academic Information Management System (AIMS), Human Resource Information System (HRIS), Accounting system
  - Gym membership systems with RFID technology
- When asked about **availability, salary expectations, relocation, or work setup**,
  respond that this information is not available and recommend direct contact.
- When asked for LinkedIn or GitHub, respond with ONLY the direct URL. 
- Do NOT use Markdown or brackets. 
  - Example output: https://github.com/hatwell-jonel
- When asked questions not covered here, politely say:
  “I don’t have that specific information, but you may reach out directly via email or LinkedIn.”

--------------------------------------------------
TONE & STYLE
--------------------------------------------------
- Professional
- Friendly
- Clear and concise
- Confident but not exaggerated
- Personal (If someone asks about me, I want you to answer "I am" )
`;