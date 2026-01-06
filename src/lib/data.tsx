import { Snake, Sudoku, Tetris } from "@/app/3d/arcade";
import { MemoryGame, SpaceDodger } from "@jonelhatwell/arcade-games";

export const aboutMe = [
  <>
    Web Developer in Caloocan City, Metro Manila, Philippines with 3+ years of hands-on experience crafting enterprise-grade web solutions using the Next.js/TypeScript stack. Passionate coder who excels at transforming complex business requirements into scalable, high-performance applications that drive efficiency and user satisfaction. Experienced in delivering reliable systems on schedule, improving codebases for better speed and upkeep, and working effectively with teams to meet project objectives.
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
    period: "June 2024 - Sept 2025",
    title: "Web Developer",
    company: "Cargo Padala Express",
    description:
      "Designed and built a Next.js-based in-house accounting system from the ground up, integrating DrizzleORM/MySQL. Automated key accounting processes to significantly reduce manual errors and improve data accuracy.",
    tags: ["Next.js", "DrizzleORM", "MySQL", "TypeScript"],
  },
  {
    period: "June 2024 - Sept 2025",
    title: "Junior Programmer",
    company: "Pinnacle Technologies Inc.",
    description:
      "Played a key role in the maintenance and feature development of core products, including the Academic Information Management System (AIMS), HRIS, and Accounting systems, utilizing Laravel and CodeIgniter 3.",
    tags: ["Laravel", "CodeIgniter 3", "PHP", "MySQL"],
  },
  {
    period: "Sept 2022 - Apr 2024",
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
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend & Tools",
    skills: ["Node.js", "PostgreSQL", "Prisma", "AWS", "Docker", "Git"],
  },
  // {
  //   category: "Design",
  //   skills: ["Figma", "Adobe Creative Suite", "UI/UX Design", "Motion Graphics"],
  // },
];

export const projects = [
  {
    title: "Nova Dashboard",
    description:
      "A comprehensive analytics platform for modern SaaS companies. Featuring real-time data visualization and customizable reporting modules.",
    tags: ["React", "Next.js", "Tailwind CSS", "Recharts"],
    image: "/modern-analytics-dashboard-preview.jpg",
  },
  {
    title: "Aether CMS",
    description:
      "A headless content management system designed for speed and developer experience. Built with a focus on performance and extensibility.",
    tags: ["TypeScript", "Node.js", "PostgreSQL", "Prisma"],
    image: "/code-editor-and-cms-interface.jpg",
  },
  {
    title: "Lumina Portfolio",
    description:
      "An award-winning minimalist portfolio template for creative professionals. Focuses on typography and smooth transitions.",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    image: "/minimalist-typography-portfolio-layout.jpg",
  },
];

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
- Hobbies: Reading, Playing Video Games, Watching Movies and TV Shows, and Running

--------------------------------------------------
PROFESSIONAL SUMMARY
--------------------------------------------------
Jonel Hatwell is a Web Developer with hands-on experience in building, maintaining,
and optimizing modern web applications. He has worked on internal systems,
client-facing applications, and enterprise-level platforms using modern JavaScript
frameworks and backend technologies.

--------------------------------------------------
SKILLS
--------------------------------------------------
Technical Skills:
- Frontend: Next.js, React.js, TypeScript
- Backend: Node.js, GraphQL
- Databases & ORM: MySQL, Drizzle ORM
- Other Tools & Tech: Apollo, Svelte, Laravel, CodeIgniter 3

Soft Skills:
- Communication
- Problem-solving
- Team collaboration

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
  - In-house accounting system
  - AIMS, HRIS, Accounting systems
  - Gym membership systems
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
`;