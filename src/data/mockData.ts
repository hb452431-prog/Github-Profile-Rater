export interface Developer {
  id: string
  username: string
  name: string
  avatar: string
  bio: string
  location: string
  company: string
  website: string
  country: string
  countryName: string
  flag: string
  primaryLanguage: string
  languages: { name: string; percentage: number; color: string }[]
  gitRankScore: number
  rank: number
  previousRank: number
  percentile: string
  level: string
  streak: number
  followers: number
  following: number
  stars: number
  contributions: number
  repositories: number
  issuesSolved: number
  prsMerged: number
  commitsThisYear: number
  trend: "up" | "down" | "flat"
  growth: number
  archetype: string
  cardId: string
  badges: string[]
  achievements: { title: string; description: string; icon: string; date: string }[]
  rankingHistory: { month: string; rank: number; score: number }[]
  contributionActivity: { month: string; commits: number; prs: number; reviews: number }[]
  topRepos: { name: string; stars: number; forks: number; description: string; language: string }[]
}

export interface Repository {
  id: string
  name: string
  owner: string
  ownerAvatar: string
  description: string
  language: string
  languageColor: string
  stars: number
  forks: number
  watchers: number
  openIssues: number
  closedIssues: number
  pullRequests: number
  growth: number
  trendBadge: "Hot" | "Rising" | "Trending" | "Featured" | "Breakthrough"
  category: "AI" | "Web" | "Mobile" | "DevTools" | "Data" | "Security" | "Blockchain" | "Cloud"
  license: string
  createdDate: string
  lastUpdated: string
  rankScore: number
  starGrowth: { month: string; stars: number }[]
  contributorActivity: { week: string; commits: number }[]
}

export interface Organization {
  id: string
  name: string
  login: string
  avatar: string
  description: string
  location: string
  website: string
  repositoriesCount: number
  starsCount: number
  followersCount: number
  membersCount: number
  gitRankScore: number
  growth: number
  verified: boolean
  topLanguages: string[]
  topRepositories: string[]
}

export interface LanguageStat {
  name: string
  icon: string
  color: string
  developerCount: number
  repositoryCount: number
  avgScore: number
  growth: number
  description: string
  topDeveloper: string
}

export interface CountryStat {
  code: string
  name: string
  flag: string
  developerCount: number
  avgScore: number
  topDeveloper: string
  growth: number
  region: string
}

export const developers: Developer[] = [
  {
    id: "1",
    username: "torvalds",
    name: "Linus Torvalds",
    avatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
    bio: "Creator of Linux & Git. Linux Foundation Fellow.",
    location: "Portland, OR, USA",
    company: "Linux Foundation",
    website: "https://kernel.org",
    country: "US",
    countryName: "United States",
    flag: "🇺🇸",
    primaryLanguage: "C",
    languages: [
      { name: "C", percentage: 88, color: "#555555" },
      { name: "Assembly", percentage: 7, color: "#6E4C13" },
      { name: "Shell", percentage: 5, color: "#89e051" },
    ],
    gitRankScore: 99.8,
    rank: 1,
    previousRank: 1,
    percentile: "Top 0.001%",
    level: "Mythic Architect",
    streak: 428,
    followers: 215000,
    following: 0,
    stars: 198000,
    contributions: 4250,
    repositories: 12,
    issuesSolved: 1420,
    prsMerged: 8900,
    commitsThisYear: 1840,
    trend: "flat",
    growth: 1.4,
    archetype: "THE ARCHITECT",
    cardId: "GR-2026-000001",
    badges: ["Legendary Creator", "Linux Kernel", "Git Founder", "Top 1%"],
    achievements: [
      { title: "Kernel of Modern Computing", description: "Created Linux kernel used on >85% servers worldwide", icon: "Crown", date: "All-Time" },
      { title: "Version Control Pioneer", description: "Invented Git, powering global software collaboration", icon: "GitBranch", date: "All-Time" },
      { title: "Relentless Reviewer", description: "Merged over 15,000 core subsystem pull requests", icon: "Flame", date: "2026" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 1, score: 99.6 },
      { month: "Feb", rank: 1, score: 99.7 },
      { month: "Mar", rank: 1, score: 99.8 },
      { month: "Apr", rank: 1, score: 99.8 },
      { month: "May", rank: 1, score: 99.8 },
      { month: "Jun", rank: 1, score: 99.8 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 280, prs: 64, reviews: 140 },
      { month: "Feb", commits: 310, prs: 72, reviews: 165 },
      { month: "Mar", commits: 295, prs: 80, reviews: 155 },
      { month: "Apr", commits: 340, prs: 90, reviews: 180 },
      { month: "May", commits: 320, prs: 85, reviews: 175 },
      { month: "Jun", commits: 295, prs: 78, reviews: 160 }
    ],
    topRepos: [
      { name: "linux", stars: 178000, forks: 54000, description: "Linux kernel source tree", language: "C" },
      { name: "subsurface-for-dir", stars: 2100, forks: 450, description: "Divelog program", language: "C++" },
      { name: "pesconvert", stars: 650, forks: 80, description: "Embroidery format converter", language: "C" }
    ]
  },
  {
    id: "2",
    username: "antfu",
    name: "Anthony Fu",
    avatar: "https://avatars.githubusercontent.com/u/11247099?v=4",
    bio: "Core team member of Vue, Vite, Nuxt & Vitest. Fanatical open-sourcer.",
    location: "Tokyo, Japan",
    company: "NuxtLabs / Open Source",
    website: "https://antfu.me",
    country: "JP",
    countryName: "Japan",
    flag: "🇯🇵",
    primaryLanguage: "TypeScript",
    languages: [
      { name: "TypeScript", percentage: 76, color: "#3178c6" },
      { name: "Vue", percentage: 18, color: "#41b883" },
      { name: "JavaScript", percentage: 6, color: "#f7df1e" }
    ],
    gitRankScore: 99.2,
    rank: 2,
    previousRank: 3,
    percentile: "Top 0.01%",
    level: "Grandmaster Polyglot",
    streak: 612,
    followers: 135000,
    following: 340,
    stars: 285000,
    contributions: 9400,
    repositories: 480,
    issuesSolved: 3400,
    prsMerged: 6200,
    commitsThisYear: 3900,
    trend: "up",
    growth: 8.7,
    archetype: "THE OPEN-SOURCE CHAMPION",
    cardId: "GR-2026-000002",
    badges: ["Vite Core", "Vitest Creator", "UnoCSS Master", "Top 1%"],
    achievements: [
      { title: "Tooling Overhaul", description: "Created Vitest, UnoCSS, VueUse with 10M+ weekly downloads", icon: "Zap", date: "2026" },
      { title: "Contribution Machine", description: "Maintained a 600+ day commit streak across 100+ repos", icon: "Flame", date: "2026" },
      { title: "Framework Innovator", description: "Vite and Nuxt core architect", icon: "Layers", date: "2025" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 4, score: 98.4 },
      { month: "Feb", rank: 3, score: 98.8 },
      { month: "Mar", rank: 3, score: 99.0 },
      { month: "Apr", rank: 2, score: 99.1 },
      { month: "May", rank: 2, score: 99.2 },
      { month: "Jun", rank: 2, score: 99.2 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 620, prs: 140, reviews: 210 },
      { month: "Feb", commits: 680, prs: 165, reviews: 240 },
      { month: "Mar", commits: 710, prs: 180, reviews: 290 },
      { month: "Apr", commits: 740, prs: 195, reviews: 310 },
      { month: "May", commits: 690, prs: 170, reviews: 280 },
      { month: "Jun", commits: 720, prs: 185, reviews: 300 }
    ],
    topRepos: [
      { name: "vueuse", stars: 21500, forks: 3100, description: "Collection of essential Vue Composition Utilities", language: "TypeScript" },
      { name: "unocss", stars: 16800, forks: 1100, description: "The instant on-demand atomic CSS engine", language: "TypeScript" },
      { name: "slidev", stars: 32000, forks: 1600, description: "Presentation slides for developers", language: "TypeScript" }
    ]
  },
  {
    id: "3",
    username: "yyx990803",
    name: "Evan You",
    avatar: "https://avatars.githubusercontent.com/u/499550?v=4",
    bio: "Creator of Vue.js, Vite and Rolldown. Founder of VoidZero.",
    location: "Singapore",
    company: "VoidZero",
    website: "https://evanyou.me",
    country: "SG",
    countryName: "Singapore",
    flag: "🇸🇬",
    primaryLanguage: "TypeScript",
    languages: [
      { name: "TypeScript", percentage: 65, color: "#3178c6" },
      { name: "JavaScript", percentage: 25, color: "#f7df1e" },
      { name: "Rust", percentage: 10, color: "#dea584" }
    ],
    gitRankScore: 98.9,
    rank: 3,
    previousRank: 2,
    percentile: "Top 0.01%",
    level: "Ecosystem Titan",
    streak: 320,
    followers: 104000,
    following: 80,
    stars: 260000,
    contributions: 3800,
    repositories: 195,
    issuesSolved: 2800,
    prsMerged: 3500,
    commitsThisYear: 2100,
    trend: "flat",
    growth: 4.8,
    archetype: "THE ECOSYSTEM BUILDER",
    cardId: "GR-2026-000003",
    badges: ["Vue Creator", "Vite Founder", "VoidZero CEO", "Top 1%"],
    achievements: [
      { title: "Web Frontend Revolution", description: "Built Vue.js, now powering millions of modern web applications", icon: "Sparkles", date: "All-Time" },
      { title: "Next-Gen Bundling", description: "Pioneered Vite & next generation unified JS toolchains", icon: "Zap", date: "2025" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 2, score: 99.0 },
      { month: "Feb", rank: 2, score: 99.0 },
      { month: "Mar", rank: 2, score: 98.9 },
      { month: "Apr", rank: 3, score: 98.9 },
      { month: "May", rank: 3, score: 98.9 },
      { month: "Jun", rank: 3, score: 98.9 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 290, prs: 48, reviews: 110 },
      { month: "Feb", commits: 320, prs: 55, reviews: 130 },
      { month: "Mar", commits: 300, prs: 50, reviews: 125 },
      { month: "Apr", commits: 350, prs: 60, reviews: 145 },
      { month: "May", commits: 310, prs: 52, reviews: 120 },
      { month: "Jun", commits: 330, prs: 58, reviews: 135 }
    ],
    topRepos: [
      { name: "vue", stars: 208000, forks: 34000, description: "Progressive JavaScript Framework", language: "TypeScript" },
      { name: "vite", stars: 71000, forks: 6200, description: "Next Generation Frontend Tooling", language: "TypeScript" },
      { name: "rolldown", stars: 12500, forks: 800, description: "Fast Rust-based bundler for Vite", language: "Rust" }
    ]
  },
  {
    id: "4",
    username: "shadcn",
    name: "shadcn",
    avatar: "https://avatars.githubusercontent.com/u/124599?v=4",
    bio: "Building UI components and design systems for the modern web.",
    location: "San Francisco, CA",
    company: "Independent",
    website: "https://ui.shadcn.com",
    country: "US",
    countryName: "United States",
    flag: "🇺🇸",
    primaryLanguage: "TypeScript",
    languages: [
      { name: "TypeScript", percentage: 82, color: "#3178c6" },
      { name: "CSS", percentage: 12, color: "#563d7c" },
      { name: "JavaScript", percentage: 6, color: "#f7df1e" }
    ],
    gitRankScore: 98.4,
    rank: 4,
    previousRank: 6,
    percentile: "Top 0.05%",
    level: "Design Alchemist",
    streak: 280,
    followers: 86000,
    following: 110,
    stars: 142000,
    contributions: 3100,
    repositories: 45,
    issuesSolved: 1850,
    prsMerged: 2200,
    commitsThisYear: 1650,
    trend: "up",
    growth: 14.2,
    archetype: "THE UI CRAFTSMAN",
    cardId: "GR-2026-000004",
    badges: ["UI Leader", "Radix Champion", "Tailwind Innovator", "Top 1%"],
    achievements: [
      { title: "UI Paradigm Shift", description: "Created shadcn/ui, the fastest-growing React UI collection ever", icon: "Palette", date: "2026" },
      { title: "Design Engineering", description: "Redefined component composition in Tailwind & React", icon: "Box", date: "2025" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 8, score: 96.5 },
      { month: "Feb", rank: 7, score: 97.1 },
      { month: "Mar", rank: 6, score: 97.6 },
      { month: "Apr", rank: 5, score: 98.0 },
      { month: "May", rank: 4, score: 98.3 },
      { month: "Jun", rank: 4, score: 98.4 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 210, prs: 40, reviews: 85 },
      { month: "Feb", commits: 240, prs: 48, reviews: 98 },
      { month: "Mar", commits: 270, prs: 55, reviews: 110 },
      { month: "Apr", commits: 290, prs: 62, reviews: 120 },
      { month: "May", commits: 280, prs: 58, reviews: 115 },
      { month: "Jun", commits: 310, prs: 65, reviews: 130 }
    ],
    topRepos: [
      { name: "ui", stars: 81000, forks: 7100, description: "Beautifully designed components built with Radix UI and Tailwind CSS", language: "TypeScript" },
      { name: "taxonomy", stars: 18500, forks: 2400, description: "An open source application built using Next.js 14 and server components", language: "TypeScript" }
    ]
  },
  {
    id: "5",
    username: "sindresorhus",
    name: "Sindre Sorhus",
    avatar: "https://avatars.githubusercontent.com/u/170270?v=4",
    bio: "Full-Time Open-Sourcerer. Created thousands of essential npm modules.",
    location: "Bangkok, Thailand",
    company: "Full-Time Open Source",
    website: "https://sindresorhus.com",
    country: "NO",
    countryName: "Norway",
    flag: "🇳🇴",
    primaryLanguage: "JavaScript",
    languages: [
      { name: "JavaScript", percentage: 55, color: "#f7df1e" },
      { name: "TypeScript", percentage: 32, color: "#3178c6" },
      { name: "Swift", percentage: 13, color: "#ffac45" }
    ],
    gitRankScore: 98.1,
    rank: 5,
    previousRank: 4,
    percentile: "Top 0.05%",
    level: "Package Patriarch",
    streak: 940,
    followers: 64000,
    following: 40,
    stars: 320000,
    contributions: 5400,
    repositories: 1150,
    issuesSolved: 6200,
    prsMerged: 7800,
    commitsThisYear: 2800,
    trend: "flat",
    growth: 3.2,
    archetype: "THE CODE ARCHITECT",
    cardId: "GR-2026-000005",
    badges: ["1B+ Downloads", "Awesome Founder", "Swift Artisan", "Top 1%"],
    achievements: [
      { title: "NPM Foundation", description: "Created chalk, p-limit, execa, electron-is and 1,000+ packages", icon: "Package", date: "All-Time" },
      { title: "The Awesome List", description: "Started the global curated 'awesome' repository movement", icon: "Star", date: "All-Time" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 5, score: 98.3 },
      { month: "Feb", rank: 5, score: 98.2 },
      { month: "Mar", rank: 4, score: 98.2 },
      { month: "Apr", rank: 4, score: 98.1 },
      { month: "May", rank: 5, score: 98.1 },
      { month: "Jun", rank: 5, score: 98.1 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 380, prs: 82, reviews: 140 },
      { month: "Feb", commits: 410, prs: 90, reviews: 155 },
      { month: "Mar", commits: 395, prs: 85, reviews: 150 },
      { month: "Apr", commits: 440, prs: 95, reviews: 170 },
      { month: "May", commits: 420, prs: 92, reviews: 165 },
      { month: "Jun", commits: 430, prs: 96, reviews: 168 }
    ],
    topRepos: [
      { name: "awesome", stars: 335000, forks: 28000, description: "Awesome lists about all kinds of interesting topics", language: "Markdown" },
      { name: "chalk", stars: 22800, forks: 950, description: "Terminal string styling done right", language: "TypeScript" },
      { name: "ky", stars: 14200, forks: 450, description: "Tiny & elegant HTTP client based on window.fetch", language: "TypeScript" }
    ]
  },
  {
    id: "6",
    username: "rauchg",
    name: "Guillermo Rauch",
    avatar: "https://avatars.githubusercontent.com/u/13041?v=4",
    bio: "CEO @vercel. Creator of Next.js, Socket.io and Mongoose.",
    location: "San Francisco, CA",
    company: "Vercel",
    website: "https://rauchg.com",
    country: "AR",
    countryName: "Argentina",
    flag: "🇦🇷",
    primaryLanguage: "TypeScript",
    languages: [
      { name: "TypeScript", percentage: 68, color: "#3178c6" },
      { name: "JavaScript", percentage: 24, color: "#f7df1e" },
      { name: "Rust", percentage: 8, color: "#dea584" }
    ],
    gitRankScore: 97.7,
    rank: 6,
    previousRank: 7,
    percentile: "Top 0.1%",
    level: "Cloud Visionary",
    streak: 210,
    followers: 81000,
    following: 420,
    stars: 185000,
    contributions: 2400,
    repositories: 140,
    issuesSolved: 1200,
    prsMerged: 2100,
    commitsThisYear: 1420,
    trend: "up",
    growth: 6.9,
    archetype: "THE INNOVATOR",
    cardId: "GR-2026-000006",
    badges: ["Next.js Creator", "Vercel Founder", "Socket.io", "Top 1%"],
    achievements: [
      { title: "Real-Time Web Era", description: "Created Socket.io connecting millions of concurrent websockets", icon: "Radio", date: "All-Time" },
      { title: "Full-Stack Serverless", description: "Co-created Next.js driving the modern React paradigm", icon: "Globe", date: "2025" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 7, score: 96.9 },
      { month: "Feb", rank: 8, score: 97.1 },
      { month: "Mar", rank: 7, score: 97.3 },
      { month: "Apr", rank: 7, score: 97.5 },
      { month: "May", rank: 6, score: 97.6 },
      { month: "Jun", rank: 6, score: 97.7 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 160, prs: 32, reviews: 75 },
      { month: "Feb", commits: 180, prs: 38, reviews: 88 },
      { month: "Mar", commits: 195, prs: 42, reviews: 95 },
      { month: "Apr", commits: 210, prs: 45, reviews: 105 },
      { month: "May", commits: 190, prs: 40, reviews: 90 },
      { month: "Jun", commits: 205, prs: 44, reviews: 100 }
    ],
    topRepos: [
      { name: "next.js", stars: 124000, forks: 26000, description: "The React Framework for the Web", language: "TypeScript" },
      { name: "socket.io", stars: 61000, forks: 10200, description: "Realtime application framework", language: "JavaScript" },
      { name: "mongoose", stars: 27000, forks: 3600, description: "MongoDB object modeling for Node.js", language: "JavaScript" }
    ]
  },
  {
    id: "7",
    username: "gaearon",
    name: "Dan Abramov",
    avatar: "https://avatars.githubusercontent.com/u/810438?v=4",
    bio: "Co-author of Redux and Create React App. Former React Core team.",
    location: "London, UK",
    company: "Bluesky / Independent",
    website: "https://overreacted.io",
    country: "GB",
    countryName: "United Kingdom",
    flag: "🇬🇧",
    primaryLanguage: "JavaScript",
    languages: [
      { name: "JavaScript", percentage: 60, color: "#f7df1e" },
      { name: "TypeScript", percentage: 35, color: "#3178c6" },
      { name: "CSS", percentage: 5, color: "#563d7c" }
    ],
    gitRankScore: 97.3,
    rank: 7,
    previousRank: 5,
    percentile: "Top 0.1%",
    level: "State Master",
    streak: 140,
    followers: 94000,
    following: 150,
    stars: 190000,
    contributions: 2800,
    repositories: 260,
    issuesSolved: 2400,
    prsMerged: 3100,
    commitsThisYear: 1250,
    trend: "down",
    growth: 2.1,
    archetype: "THE COMMUNICATOR",
    cardId: "GR-2026-000007",
    badges: ["Redux Creator", "React Core", "Overreacted", "Top 1%"],
    achievements: [
      { title: "Predictable State", description: "Created Redux, shaping predictable state machines for millions of web apps", icon: "Cpu", date: "All-Time" },
      { title: "React Dev Experience", description: "Built Fast Refresh & React Hot Loader for zero-delay development", icon: "RefreshCw", date: "All-Time" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 5, score: 97.8 },
      { month: "Feb", rank: 6, score: 97.6 },
      { month: "Mar", rank: 6, score: 97.5 },
      { month: "Apr", rank: 6, score: 97.4 },
      { month: "May", rank: 7, score: 97.3 },
      { month: "Jun", rank: 7, score: 97.3 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 140, prs: 28, reviews: 60 },
      { month: "Feb", commits: 155, prs: 30, reviews: 65 },
      { month: "Mar", commits: 150, prs: 29, reviews: 62 },
      { month: "Apr", commits: 165, prs: 34, reviews: 70 },
      { month: "May", commits: 145, prs: 30, reviews: 64 },
      { month: "Jun", commits: 160, prs: 32, reviews: 68 }
    ],
    topRepos: [
      { name: "redux", stars: 60500, forks: 15400, description: "Predictable state container for JavaScript apps", language: "TypeScript" },
      { name: "react-hot-loader", stars: 13000, forks: 900, description: "Tweak React components in real time", language: "JavaScript" }
    ]
  },
  {
    id: "8",
    username: "Rich-Harris",
    name: "Rich Harris",
    avatar: "https://avatars.githubusercontent.com/u/1162160?v=4",
    bio: "Creator of Svelte and Rollup. Principal Software Engineer @vercel.",
    location: "New York, USA",
    company: "Vercel",
    website: "https://svelte.dev",
    country: "US",
    countryName: "United States",
    flag: "🇺🇸",
    primaryLanguage: "TypeScript",
    languages: [
      { name: "TypeScript", percentage: 58, color: "#3178c6" },
      { name: "JavaScript", percentage: 34, color: "#f7df1e" },
      { name: "HTML", percentage: 8, color: "#e34c26" }
    ],
    gitRankScore: 96.9,
    rank: 8,
    previousRank: 9,
    percentile: "Top 0.2%",
    level: "Reactive Virtuoso",
    streak: 195,
    followers: 52000,
    following: 110,
    stars: 165000,
    contributions: 3200,
    repositories: 175,
    issuesSolved: 1900,
    prsMerged: 2400,
    commitsThisYear: 1800,
    trend: "up",
    growth: 9.4,
    archetype: "THE COMPILER SPECIALIST",
    cardId: "GR-2026-000008",
    badges: ["Svelte Creator", "Rollup Pioneer", "Svelte 5", "Top 1%"],
    achievements: [
      { title: "Zero-Virtual-DOM", description: "Created Svelte, moving reactivity directly into compile time", icon: "Code", date: "All-Time" },
      { title: "ES Module Bundling", description: "Invented Rollup, pioneering tree-shaking for modern JavaScript", icon: "Package", date: "All-Time" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 11, score: 95.8 },
      { month: "Feb", rank: 10, score: 96.1 },
      { month: "Mar", rank: 9, score: 96.4 },
      { month: "Apr", rank: 9, score: 96.6 },
      { month: "May", rank: 8, score: 96.8 },
      { month: "Jun", rank: 8, score: 96.9 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 220, prs: 42, reviews: 80 },
      { month: "Feb", commits: 250, prs: 48, reviews: 92 },
      { month: "Mar", commits: 280, prs: 55, reviews: 105 },
      { month: "Apr", commits: 310, prs: 60, reviews: 115 },
      { month: "May", commits: 290, prs: 56, reviews: 108 },
      { month: "Jun", commits: 320, prs: 62, reviews: 120 }
    ],
    topRepos: [
      { name: "svelte", stars: 78000, forks: 4200, description: "Cybernetically enhanced web apps", language: "TypeScript" },
      { name: "rollup", stars: 25000, forks: 1400, description: "Next-generation ES module bundler", language: "TypeScript" }
    ]
  },
  {
    id: "9",
    username: "mitchellh",
    name: "Mitchell Hashimoto",
    avatar: "https://avatars.githubusercontent.com/u/1299?v=4",
    bio: "Founder of HashiCorp (Vagrant, Terraform, Consul, Vault). Building Ghostty terminal in Zig.",
    location: "Seattle, WA",
    company: "Ghostty / Independent",
    website: "https://mitchellh.com",
    country: "US",
    countryName: "United States",
    flag: "🇺🇸",
    primaryLanguage: "Go",
    languages: [
      { name: "Go", percentage: 52, color: "#00ADD8" },
      { name: "Zig", percentage: 38, color: "#ec915c" },
      { name: "Ruby", percentage: 10, color: "#701516" }
    ],
    gitRankScore: 96.5,
    rank: 9,
    previousRank: 8,
    percentile: "Top 0.2%",
    level: "Infra Vanguard",
    streak: 380,
    followers: 61000,
    following: 19,
    stars: 180000,
    contributions: 3900,
    repositories: 190,
    issuesSolved: 3100,
    prsMerged: 4200,
    commitsThisYear: 2400,
    trend: "flat",
    growth: 7.8,
    archetype: "THE INFRASTRUCTURE TITAN",
    cardId: "GR-2026-000009",
    badges: ["HashiCorp Founder", "Terraform Creator", "Ghostty Pioneer", "Top 1%"],
    achievements: [
      { title: "Cloud Infrastructure as Code", description: "Created Terraform, automating cloud environments across AWS, GCP, Azure", icon: "Cloud", date: "All-Time" },
      { title: "Native System Craft", description: "Building Ghostty, the fastest native GPU-accelerated terminal", icon: "Terminal", date: "2026" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 8, score: 96.1 },
      { month: "Feb", rank: 9, score: 96.2 },
      { month: "Mar", rank: 8, score: 96.3 },
      { month: "Apr", rank: 8, score: 96.4 },
      { month: "May", rank: 9, score: 96.5 },
      { month: "Jun", rank: 9, score: 96.5 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 310, prs: 50, reviews: 90 },
      { month: "Feb", commits: 340, prs: 58, reviews: 105 },
      { month: "Mar", commits: 360, prs: 62, reviews: 115 },
      { month: "Apr", commits: 380, prs: 68, reviews: 125 },
      { month: "May", commits: 350, prs: 64, reviews: 118 },
      { month: "Jun", commits: 370, prs: 66, reviews: 122 }
    ],
    topRepos: [
      { name: "ghostty", stars: 24000, forks: 950, description: "Fast, native, feature-rich terminal emulator in Zig", language: "Zig" },
      { name: "vagrant", stars: 26000, forks: 4200, description: "Tool for building and distributing development environments", language: "Ruby" }
    ]
  },
  {
    id: "10",
    username: "tj",
    name: "TJ Holowaychuk",
    avatar: "https://avatars.githubusercontent.com/u/25254?v=4",
    bio: "Prolific author of Express, Koa, Mocha, Commander, Apex and hundreds of libraries.",
    location: "Victoria, BC, Canada",
    company: "Apex Software",
    website: "https://apex.sh",
    country: "CA",
    countryName: "Canada",
    flag: "🇨🇦",
    primaryLanguage: "Go",
    languages: [
      { name: "Go", percentage: 55, color: "#00ADD8" },
      { name: "JavaScript", percentage: 35, color: "#f7df1e" },
      { name: "C", percentage: 10, color: "#555555" }
    ],
    gitRankScore: 96.1,
    rank: 10,
    previousRank: 10,
    percentile: "Top 0.3%",
    level: "Origin Craftsman",
    streak: 410,
    followers: 51000,
    following: 0,
    stars: 210000,
    contributions: 3600,
    repositories: 620,
    issuesSolved: 4200,
    prsMerged: 5100,
    commitsThisYear: 1900,
    trend: "flat",
    growth: 4.5,
    archetype: "THE FOUNDATIONAL BUILDER",
    cardId: "GR-2026-000010",
    badges: ["Express Creator", "Node Pioneer", "Koa Co-author", "Top 1%"],
    achievements: [
      { title: "Node.js Web Backbone", description: "Built Express.js, serving billions of backend API requests per second", icon: "Server", date: "All-Time" },
      { title: "Testing & CLI Standard", description: "Created Mocha test framework and Commander.js CLI parser", icon: "CheckCircle", date: "All-Time" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 10, score: 96.0 },
      { month: "Feb", rank: 10, score: 96.0 },
      { month: "Mar", rank: 10, score: 96.1 },
      { month: "Apr", rank: 10, score: 96.1 },
      { month: "May", rank: 10, score: 96.1 },
      { month: "Jun", rank: 10, score: 96.1 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 250, prs: 44, reviews: 75 },
      { month: "Feb", commits: 270, prs: 48, reviews: 82 },
      { month: "Mar", commits: 265, prs: 46, reviews: 80 },
      { month: "Apr", commits: 290, prs: 52, reviews: 90 },
      { month: "May", commits: 275, prs: 49, reviews: 85 },
      { month: "Jun", commits: 285, prs: 50, reviews: 88 }
    ],
    topRepos: [
      { name: "commander.js", stars: 26500, forks: 1700, description: "Node.js command-line interfaces made easy", language: "JavaScript" },
      { name: "koa", stars: 34500, forks: 3100, description: "Next generation web framework for node.js", language: "JavaScript" }
    ]
  },
  {
    id: "11",
    username: "dhh",
    name: "David Heinemeier Hansson",
    avatar: "https://avatars.githubusercontent.com/u/2741?v=4",
    bio: "Creator of Ruby on Rails. Co-owner & CTO @37signals (Basecamp & HEY).",
    location: "Chicago, IL",
    company: "37signals",
    website: "https://world.hey.com/dhh",
    country: "DK",
    countryName: "Denmark",
    flag: "🇩🇰",
    primaryLanguage: "Ruby",
    languages: [
      { name: "Ruby", percentage: 80, color: "#701516" },
      { name: "JavaScript", percentage: 15, color: "#f7df1e" },
      { name: "HTML", percentage: 5, color: "#e34c26" }
    ],
    gitRankScore: 95.8,
    rank: 11,
    previousRank: 12,
    percentile: "Top 0.5%",
    level: "Framework Patriarch",
    streak: 150,
    followers: 47000,
    following: 0,
    stars: 125000,
    contributions: 2100,
    repositories: 48,
    issuesSolved: 1400,
    prsMerged: 1900,
    commitsThisYear: 1100,
    trend: "up",
    growth: 5.2,
    archetype: "THE PRAGMATIC BUILDER",
    cardId: "GR-2026-000011",
    badges: ["Rails Creator", "Basecamp CTO", "ONCE Founder", "Top 1%"],
    achievements: [
      { title: "Convention Over Configuration", description: "Created Ruby on Rails, enabling Airbnb, Shopify, GitHub and Stripe to launch", icon: "Award", date: "All-Time" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 13, score: 95.2 },
      { month: "Feb", rank: 12, score: 95.4 },
      { month: "Mar", rank: 12, score: 95.5 },
      { month: "Apr", rank: 12, score: 95.6 },
      { month: "May", rank: 11, score: 95.7 },
      { month: "Jun", rank: 11, score: 95.8 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 120, prs: 20, reviews: 45 },
      { month: "Feb", commits: 140, prs: 24, reviews: 52 },
      { month: "Mar", commits: 155, prs: 28, reviews: 58 },
      { month: "Apr", commits: 170, prs: 30, reviews: 65 },
      { month: "May", commits: 160, prs: 27, reviews: 60 },
      { month: "Jun", commits: 165, prs: 29, reviews: 62 }
    ],
    topRepos: [
      { name: "rails", stars: 55000, forks: 21000, description: "Ruby on Rails", language: "Ruby" },
      { name: "kamal", stars: 11500, forks: 600, description: "Deploy web apps anywhere without complexity", language: "Ruby" }
    ]
  },
  {
    id: "12",
    username: "leeerob",
    name: "Lee Robinson",
    avatar: "https://avatars.githubusercontent.com/u/9113740?v=4",
    bio: "VP of Product @vercel. Teaching React, Next.js, and web development.",
    location: "Des Moines, IA",
    company: "Vercel",
    website: "https://leerob.io",
    country: "US",
    countryName: "United States",
    flag: "🇺🇸",
    primaryLanguage: "TypeScript",
    languages: [
      { name: "TypeScript", percentage: 70, color: "#3178c6" },
      { name: "JavaScript", percentage: 20, color: "#f7df1e" },
      { name: "CSS", percentage: 10, color: "#563d7c" }
    ],
    gitRankScore: 95.2,
    rank: 12,
    previousRank: 15,
    percentile: "Top 0.5%",
    level: "Ecosystem Champion",
    streak: 240,
    followers: 43000,
    following: 280,
    stars: 88000,
    contributions: 3100,
    repositories: 110,
    issuesSolved: 1600,
    prsMerged: 2300,
    commitsThisYear: 1750,
    trend: "up",
    growth: 12.8,
    archetype: "THE COMMUNITY LEADER",
    cardId: "GR-2026-000012",
    badges: ["Next.js Lead", "Vercel VP", "Web Dev Mentor", "Top 1%"],
    achievements: [
      { title: "React Modern Education", description: "Created tutorials & open starter kits studied by over 500,000 developers", icon: "BookOpen", date: "2026" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 16, score: 94.0 },
      { month: "Feb", rank: 15, score: 94.3 },
      { month: "Mar", rank: 14, score: 94.6 },
      { month: "Apr", rank: 13, score: 94.9 },
      { month: "May", rank: 12, score: 95.1 },
      { month: "Jun", rank: 12, score: 95.2 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 210, prs: 38, reviews: 80 },
      { month: "Feb", commits: 230, prs: 42, reviews: 88 },
      { month: "Mar", commits: 260, prs: 48, reviews: 98 },
      { month: "Apr", commits: 280, prs: 52, reviews: 108 },
      { month: "May", commits: 270, prs: 50, reviews: 102 },
      { month: "Jun", commits: 290, prs: 54, reviews: 112 }
    ],
    topRepos: [
      { name: "leerob.io", stars: 7400, forks: 1200, description: "The source code for my personal website", language: "TypeScript" },
      { name: "next-saas-starter", stars: 9200, forks: 1800, description: "Next.js Postgres Auth Stripe SaaS template", language: "TypeScript" }
    ]
  },
  {
    id: "13",
    username: "t3dotgg",
    name: "Theo Browne",
    avatar: "https://avatars.githubusercontent.com/u/6751787?v=4",
    bio: "CEO Ping Labs. Creator of create-t3-app and UploadThing. Tech YouTuber.",
    location: "San Francisco, CA",
    company: "Ping Labs",
    website: "https://t3.gg",
    country: "US",
    countryName: "United States",
    flag: "🇺🇸",
    primaryLanguage: "TypeScript",
    languages: [
      { name: "TypeScript", percentage: 85, color: "#3178c6" },
      { name: "Rust", percentage: 10, color: "#dea584" },
      { name: "CSS", percentage: 5, color: "#563d7c" }
    ],
    gitRankScore: 94.7,
    rank: 13,
    previousRank: 16,
    percentile: "Top 0.8%",
    level: "Type-Safe Evangelist",
    streak: 190,
    followers: 41000,
    following: 190,
    stars: 62000,
    contributions: 2900,
    repositories: 95,
    issuesSolved: 1200,
    prsMerged: 1800,
    commitsThisYear: 1600,
    trend: "up",
    growth: 15.6,
    archetype: "THE RISING STAR",
    cardId: "GR-2026-000013",
    badges: ["T3 Stack Creator", "UploadThing", "Type Safety", "Top 1%"],
    achievements: [
      { title: "Type-Safe Web Standard", description: "Created Create-T3-App, defining modern fullstack type-safety", icon: "Shield", date: "2025" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 18, score: 93.2 },
      { month: "Feb", rank: 17, score: 93.6 },
      { month: "Mar", rank: 16, score: 94.0 },
      { month: "Apr", rank: 14, score: 94.3 },
      { month: "May", rank: 13, score: 94.6 },
      { month: "Jun", rank: 13, score: 94.7 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 190, prs: 34, reviews: 70 },
      { month: "Feb", commits: 215, prs: 39, reviews: 78 },
      { month: "Mar", commits: 240, prs: 44, reviews: 88 },
      { month: "Apr", commits: 265, prs: 48, reviews: 96 },
      { month: "May", commits: 250, prs: 45, reviews: 92 },
      { month: "Jun", commits: 270, prs: 50, reviews: 100 }
    ],
    topRepos: [
      { name: "create-t3-app", stars: 25000, forks: 1700, description: "The best way to start a full-stack, typesafe Next.js app", language: "TypeScript" },
      { name: "uploadthing", stars: 7800, forks: 450, description: "File uploads for modern web developers", language: "TypeScript" }
    ]
  },
  {
    id: "14",
    username: "kentcdodds",
    name: "Kent C. Dodds",
    avatar: "https://avatars.githubusercontent.com/u/1500684?v=4",
    bio: "Creator of Testing Library and Epic Web. Co-founder of EpicWeb.dev.",
    location: "Salt Lake City, UT",
    company: "Epic Web",
    website: "https://kentcdodds.com",
    country: "US",
    countryName: "United States",
    flag: "🇺🇸",
    primaryLanguage: "TypeScript",
    languages: [
      { name: "TypeScript", percentage: 72, color: "#3178c6" },
      { name: "JavaScript", percentage: 22, color: "#f7df1e" },
      { name: "CSS", percentage: 6, color: "#563d7c" }
    ],
    gitRankScore: 94.3,
    rank: 14,
    previousRank: 13,
    percentile: "Top 0.8%",
    level: "Testing Guru",
    streak: 310,
    followers: 48000,
    following: 12,
    stars: 110000,
    contributions: 2700,
    repositories: 380,
    issuesSolved: 1900,
    prsMerged: 2400,
    commitsThisYear: 1450,
    trend: "flat",
    growth: 3.8,
    archetype: "THE TESTING MENTOR",
    cardId: "GR-2026-000014",
    badges: ["Testing Library", "Epic Web", "React Mentor", "Top 1%"],
    achievements: [
      { title: "User-Centric Testing", description: "Created DOM Testing Library & React Testing Library used across >80% React codebases", icon: "CheckSquare", date: "All-Time" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 12, score: 94.6 },
      { month: "Feb", rank: 13, score: 94.5 },
      { month: "Mar", rank: 13, score: 94.4 },
      { month: "Apr", rank: 14, score: 94.4 },
      { month: "May", rank: 14, score: 94.3 },
      { month: "Jun", rank: 14, score: 94.3 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 160, prs: 30, reviews: 60 },
      { month: "Feb", commits: 175, prs: 32, reviews: 65 },
      { month: "Mar", commits: 180, prs: 34, reviews: 68 },
      { month: "Apr", commits: 195, prs: 38, reviews: 75 },
      { month: "May", commits: 185, prs: 35, reviews: 70 },
      { month: "Jun", commits: 190, prs: 36, reviews: 72 }
    ],
    topRepos: [
      { name: "dom-testing-library", stars: 19500, forks: 1100, description: "Simple and complete DOM testing utilities", language: "TypeScript" },
      { name: "epic-stack", stars: 8500, forks: 950, description: "Opinionated full-stack starter for Remix", language: "TypeScript" }
    ]
  },
  {
    id: "15",
    username: "mcollina",
    name: "Matteo Collina",
    avatar: "https://avatars.githubusercontent.com/u/52195?v=4",
    bio: "Platformatic Co-Founder & CTO. Node.js Technical Steering Committee. Fastify Lead.",
    location: "Forlì, Italy",
    company: "Platformatic",
    website: "https://matteocollina.com",
    country: "IT",
    countryName: "Italy",
    flag: "🇮🇹",
    primaryLanguage: "JavaScript",
    languages: [
      { name: "JavaScript", percentage: 65, color: "#f7df1e" },
      { name: "TypeScript", percentage: 28, color: "#3178c6" },
      { name: "C++", percentage: 7, color: "#f34b7d" }
    ],
    gitRankScore: 93.9,
    rank: 15,
    previousRank: 17,
    percentile: "Top 1.0%",
    level: "Speed Specialist",
    streak: 490,
    followers: 32000,
    following: 310,
    stars: 95000,
    contributions: 4600,
    repositories: 420,
    issuesSolved: 3200,
    prsMerged: 4800,
    commitsThisYear: 2600,
    trend: "up",
    growth: 8.9,
    archetype: "THE PERFORMANCE MASTER",
    cardId: "GR-2026-000015",
    badges: ["Fastify Lead", "Node.js Core TSC", "Pino Author", "Top 1%"],
    achievements: [
      { title: "Blazing Node APIs", description: "Created Fastify & Pino, establishing Node.js as a high-throughput runtime", icon: "Activity", date: "All-Time" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 19, score: 92.8 },
      { month: "Feb", rank: 18, score: 93.1 },
      { month: "Mar", rank: 17, score: 93.4 },
      { month: "Apr", rank: 16, score: 93.6 },
      { month: "May", rank: 15, score: 93.8 },
      { month: "Jun", rank: 15, score: 93.9 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 320, prs: 65, reviews: 110 },
      { month: "Feb", commits: 350, prs: 70, reviews: 125 },
      { month: "Mar", commits: 370, prs: 76, reviews: 135 },
      { month: "Apr", commits: 395, prs: 82, reviews: 145 },
      { month: "May", commits: 380, prs: 78, reviews: 140 },
      { month: "Jun", commits: 390, prs: 80, reviews: 142 }
    ],
    topRepos: [
      { name: "fastify", stars: 32000, forks: 2400, description: "Fast and low overhead web framework for Node.js", language: "JavaScript" },
      { name: "pino", stars: 14500, forks: 750, description: "Super fast, all natural json logger", language: "JavaScript" }
    ]
  },
  {
    id: "16",
    username: "andrewrk",
    name: "Andrew Kelley",
    avatar: "https://avatars.githubusercontent.com/u/106511?v=4",
    bio: "Creator of Zig programming language and President of the Zig Software Foundation.",
    location: "Austin, TX",
    company: "Zig Software Foundation",
    website: "https://ziglang.org",
    country: "US",
    countryName: "United States",
    flag: "🇺🇸",
    primaryLanguage: "Zig",
    languages: [
      { name: "Zig", percentage: 88, color: "#ec915c" },
      { name: "C++", percentage: 8, color: "#f34b7d" },
      { name: "C", percentage: 4, color: "#555555" }
    ],
    gitRankScore: 93.5,
    rank: 16,
    previousRank: 18,
    percentile: "Top 1.2%",
    level: "Language Architect",
    streak: 540,
    followers: 29000,
    following: 0,
    stars: 84000,
    contributions: 3900,
    repositories: 75,
    issuesSolved: 2800,
    prsMerged: 3900,
    commitsThisYear: 2300,
    trend: "up",
    growth: 14.5,
    archetype: "THE LANGUAGE CREATOR",
    cardId: "GR-2026-000016",
    badges: ["Zig Creator", "ZSF President", "Systems Pioneer", "Top 2%"],
    achievements: [
      { title: "Next Systems Language", description: "Created Zig, a general-purpose programming language and toolchain for robust software", icon: "Code", date: "All-Time" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 21, score: 92.1 },
      { month: "Feb", rank: 20, score: 92.5 },
      { month: "Mar", rank: 19, score: 92.9 },
      { month: "Apr", rank: 18, score: 93.1 },
      { month: "May", rank: 17, score: 93.3 },
      { month: "Jun", rank: 16, score: 93.5 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 290, prs: 55, reviews: 90 },
      { month: "Feb", commits: 310, prs: 60, reviews: 100 },
      { month: "Mar", commits: 335, prs: 66, reviews: 110 },
      { month: "Apr", commits: 360, prs: 72, reviews: 120 },
      { month: "May", commits: 340, prs: 68, reviews: 115 },
      { month: "Jun", commits: 355, prs: 70, reviews: 118 }
    ],
    topRepos: [
      { name: "zig", stars: 36000, forks: 2500, description: "General-purpose programming language and toolchain for maintaining robust, optimal and reusable software", language: "Zig" }
    ]
  },
  {
    id: "17",
    username: "cassidoo",
    name: "Cassidy Williams",
    avatar: "https://avatars.githubusercontent.com/u/1454517?v=4",
    bio: "Head of Developer Experience @Contenda. Keynote speaker, newsletter author & dev humorist.",
    location: "Chicago, IL",
    company: "Contenda",
    website: "https://cassidoo.co",
    country: "US",
    countryName: "United States",
    flag: "🇺🇸",
    primaryLanguage: "JavaScript",
    languages: [
      { name: "JavaScript", percentage: 65, color: "#f7df1e" },
      { name: "TypeScript", percentage: 25, color: "#3178c6" },
      { name: "HTML", percentage: 10, color: "#e34c26" }
    ],
    gitRankScore: 92.8,
    rank: 17,
    previousRank: 19,
    percentile: "Top 1.5%",
    level: "Community Catalyst",
    streak: 360,
    followers: 42000,
    following: 480,
    stars: 38000,
    contributions: 2800,
    repositories: 140,
    issuesSolved: 950,
    prsMerged: 1400,
    commitsThisYear: 1550,
    trend: "up",
    growth: 11.2,
    archetype: "THE COMMUNITY LEADER",
    cardId: "GR-2026-000017",
    badges: ["Dev Newsletter", "Open Source Voice", "DX Specialist", "Top 2%"],
    achievements: [
      { title: "Weekly Dev Challenges", description: "Ran 300+ weekly open-source coding algorithm challenges reaching 100k+ subscribers", icon: "Coffee", date: "2026" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 22, score: 91.5 },
      { month: "Feb", rank: 21, score: 91.9 },
      { month: "Mar", rank: 20, score: 92.2 },
      { month: "Apr", rank: 19, score: 92.5 },
      { month: "May", rank: 18, score: 92.7 },
      { month: "Jun", rank: 17, score: 92.8 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 180, prs: 32, reviews: 55 },
      { month: "Feb", commits: 200, prs: 36, reviews: 62 },
      { month: "Mar", commits: 220, prs: 40, reviews: 70 },
      { month: "Apr", commits: 245, prs: 45, reviews: 78 },
      { month: "May", commits: 230, prs: 42, reviews: 74 },
      { month: "Jun", commits: 240, prs: 44, reviews: 76 }
    ],
    topRepos: [
      { name: "todomvc", stars: 6200, forks: 980, description: "Helping you select an MV* framework", language: "JavaScript" },
      { name: "cassidoo.co", stars: 2100, forks: 340, description: "Personal website and weekly newsletter", language: "TypeScript" }
    ]
  },
  {
    id: "18",
    username: "charlermagne",
    name: "Charlie Marsh",
    avatar: "https://avatars.githubusercontent.com/u/1309177?v=4",
    bio: "Founder of Astral (Ruff & uv in Rust). Speeding up the Python tooling ecosystem.",
    location: "New York, NY",
    company: "Astral",
    website: "https://astral.sh",
    country: "US",
    countryName: "United States",
    flag: "🇺🇸",
    primaryLanguage: "Rust",
    languages: [
      { name: "Rust", percentage: 84, color: "#dea584" },
      { name: "Python", percentage: 14, color: "#3572A5" },
      { name: "Shell", percentage: 2, color: "#89e051" }
    ],
    gitRankScore: 92.4,
    rank: 18,
    previousRank: 24,
    percentile: "Top 1.5%",
    level: "Tooling Titan",
    streak: 390,
    followers: 24000,
    following: 60,
    stars: 68000,
    contributions: 3800,
    repositories: 42,
    issuesSolved: 2400,
    prsMerged: 3600,
    commitsThisYear: 2800,
    trend: "up",
    growth: 28.4,
    archetype: "THE RISING STAR",
    cardId: "GR-2026-000018",
    badges: ["Ruff Creator", "uv Creator", "Astral CEO", "Top 2%"],
    achievements: [
      { title: "Python 100x Speedup", description: "Created Ruff and uv in Rust, revolutionizing Python packaging & linting speed", icon: "Zap", date: "2026" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 32, score: 89.2 },
      { month: "Feb", rank: 28, score: 90.1 },
      { month: "Mar", rank: 24, score: 90.9 },
      { month: "Apr", rank: 21, score: 91.6 },
      { month: "May", rank: 19, score: 92.1 },
      { month: "Jun", rank: 18, score: 92.4 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 340, prs: 68, reviews: 110 },
      { month: "Feb", commits: 380, prs: 75, reviews: 125 },
      { month: "Mar", commits: 410, prs: 82, reviews: 140 },
      { month: "Apr", commits: 440, prs: 90, reviews: 155 },
      { month: "May", commits: 420, prs: 85, reviews: 148 },
      { month: "Jun", commits: 435, prs: 88, reviews: 152 }
    ],
    topRepos: [
      { name: "ruff", stars: 36500, forks: 1400, description: "An extremely fast Python linter and code formatter, written in Rust", language: "Rust" },
      { name: "uv", stars: 29000, forks: 950, description: "An extremely fast Python package and project manager, written in Rust", language: "Rust" }
    ]
  },
  {
    id: "19",
    username: "jarred-sumner",
    name: "Jarred Sumner",
    avatar: "https://avatars.githubusercontent.com/u/709451?v=4",
    bio: "Creator of Bun (fast JavaScript runtime, bundler, test runner & package manager).",
    location: "San Francisco, CA",
    company: "Oven",
    website: "https://bun.sh",
    country: "US",
    countryName: "United States",
    flag: "🇺🇸",
    primaryLanguage: "Zig",
    languages: [
      { name: "Zig", percentage: 70, color: "#ec915c" },
      { name: "C++", percentage: 18, color: "#f34b7d" },
      { name: "TypeScript", percentage: 12, color: "#3178c6" }
    ],
    gitRankScore: 92.0,
    rank: 19,
    previousRank: 22,
    percentile: "Top 1.8%",
    level: "Runtime Visionary",
    streak: 440,
    followers: 31000,
    following: 15,
    stars: 76000,
    contributions: 4100,
    repositories: 58,
    issuesSolved: 3100,
    prsMerged: 4200,
    commitsThisYear: 3100,
    trend: "up",
    growth: 19.2,
    archetype: "THE INNOVATOR",
    cardId: "GR-2026-000019",
    badges: ["Bun Creator", "Oven CEO", "Zig Master", "Top 2%"],
    achievements: [
      { title: "All-in-One JS Runtime", description: "Engineered Bun from scratch in Zig with ultra-fast startup and SQLite/Node API parity", icon: "Flame", date: "2026" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 27, score: 89.8 },
      { month: "Feb", rank: 25, score: 90.5 },
      { month: "Mar", rank: 22, score: 91.1 },
      { month: "Apr", rank: 20, score: 91.5 },
      { month: "May", rank: 19, score: 91.8 },
      { month: "Jun", rank: 19, score: 92.0 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 380, prs: 72, reviews: 120 },
      { month: "Feb", commits: 420, prs: 80, reviews: 135 },
      { month: "Mar", commits: 450, prs: 88, reviews: 150 },
      { month: "Apr", commits: 480, prs: 95, reviews: 165 },
      { month: "May", commits: 460, prs: 90, reviews: 158 },
      { month: "Jun", commits: 475, prs: 92, reviews: 162 }
    ],
    topRepos: [
      { name: "bun", stars: 74000, forks: 2800, description: "Incredibly fast JavaScript runtime, bundler, test runner, and package manager", language: "Zig" }
    ]
  },
  {
    id: "20",
    username: "posva",
    name: "Eduardo San Martin Morote",
    avatar: "https://avatars.githubusercontent.com/u/664177?v=4",
    bio: "Vue.js core team, author of Pinia & Vue Router. Open source architect.",
    location: "Paris, France",
    company: "Vue.js / Independent",
    website: "https://esm.dev",
    country: "FR",
    countryName: "France",
    flag: "🇫🇷",
    primaryLanguage: "TypeScript",
    languages: [
      { name: "TypeScript", percentage: 80, color: "#3178c6" },
      { name: "Vue", percentage: 15, color: "#41b883" },
      { name: "JavaScript", percentage: 5, color: "#f7df1e" }
    ],
    gitRankScore: 91.5,
    rank: 20,
    previousRank: 20,
    percentile: "Top 2.0%",
    level: "State Navigator",
    streak: 290,
    followers: 27000,
    following: 160,
    stars: 58000,
    contributions: 2900,
    repositories: 180,
    issuesSolved: 1800,
    prsMerged: 2600,
    commitsThisYear: 1700,
    trend: "flat",
    growth: 5.6,
    archetype: "THE ARCHITECT",
    cardId: "GR-2026-000020",
    badges: ["Pinia Creator", "Vue Router Lead", "Vue Core", "Top 2%"],
    achievements: [
      { title: "Standard Vue State", description: "Created Pinia, the modern official type-safe state store for Vue.js", icon: "Layers", date: "All-Time" }
    ],
    rankingHistory: [
      { month: "Jan", rank: 20, score: 91.2 },
      { month: "Feb", rank: 20, score: 91.3 },
      { month: "Mar", rank: 20, score: 91.4 },
      { month: "Apr", rank: 20, score: 91.4 },
      { month: "May", rank: 20, score: 91.5 },
      { month: "Jun", rank: 20, score: 91.5 }
    ],
    contributionActivity: [
      { month: "Jan", commits: 190, prs: 38, reviews: 75 },
      { month: "Feb", commits: 210, prs: 42, reviews: 82 },
      { month: "Mar", commits: 230, prs: 46, reviews: 90 },
      { month: "Apr", commits: 250, prs: 50, reviews: 98 },
      { month: "May", commits: 240, prs: 48, reviews: 94 },
      { month: "Jun", commits: 245, prs: 49, reviews: 96 }
    ],
    topRepos: [
      { name: "pinia", stars: 13000, forks: 850, description: "Intuitive, type-safe, light and flexible Store for Vue", language: "TypeScript" },
      { name: "vue-router", stars: 20500, forks: 4900, description: "The official router for Vue.js", language: "TypeScript" }
    ]
  }
]

export const repositories: Repository[] = [
  {
    id: "r1",
    name: "react",
    owner: "facebook",
    ownerAvatar: "https://avatars.githubusercontent.com/u/69631?v=4",
    description: "The library for web and native user interfaces.",
    language: "JavaScript",
    languageColor: "#f7df1e",
    stars: 224000,
    forks: 46800,
    watchers: 6700,
    openIssues: 920,
    closedIssues: 13400,
    pullRequests: 280,
    growth: 3.2,
    trendBadge: "Hot",
    category: "Web",
    license: "MIT",
    createdDate: "2013-05-24",
    lastUpdated: "2026-06-01",
    rankScore: 99.4,
    starGrowth: [
      { month: "Jan", stars: 218000 },
      { month: "Feb", stars: 219500 },
      { month: "Mar", stars: 221000 },
      { month: "Apr", stars: 222200 },
      { month: "May", stars: 223100 },
      { month: "Jun", stars: 224000 }
    ],
    contributorActivity: [
      { week: "W1", commits: 45 },
      { week: "W2", commits: 52 },
      { week: "W3", commits: 48 },
      { week: "W4", commits: 60 }
    ]
  },
  {
    id: "r2",
    name: "vue",
    owner: "vuejs",
    ownerAvatar: "https://avatars.githubusercontent.com/u/6128107?v=4",
    description: "Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 208000,
    forks: 34200,
    watchers: 5800,
    openIssues: 540,
    closedIssues: 10200,
    pullRequests: 140,
    growth: 4.1,
    trendBadge: "Hot",
    category: "Web",
    license: "MIT",
    createdDate: "2013-07-29",
    lastUpdated: "2026-06-02",
    rankScore: 98.8,
    starGrowth: [
      { month: "Jan", stars: 202000 },
      { month: "Feb", stars: 203500 },
      { month: "Mar", stars: 205000 },
      { month: "Apr", stars: 206200 },
      { month: "May", stars: 207100 },
      { month: "Jun", stars: 208000 }
    ],
    contributorActivity: [
      { week: "W1", commits: 38 },
      { week: "W2", commits: 44 },
      { week: "W3", commits: 40 },
      { week: "W4", commits: 55 }
    ]
  },
  {
    id: "r3",
    name: "next.js",
    owner: "vercel",
    ownerAvatar: "https://avatars.githubusercontent.com/u/14985020?v=4",
    description: "The React Framework for the Web with Server Components and App Router.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 124000,
    forks: 26400,
    watchers: 3200,
    openIssues: 1800,
    closedIssues: 22400,
    pullRequests: 320,
    growth: 8.5,
    trendBadge: "Rising",
    category: "Web",
    license: "MIT",
    createdDate: "2016-10-05",
    lastUpdated: "2026-06-04",
    rankScore: 98.5,
    starGrowth: [
      { month: "Jan", stars: 116000 },
      { month: "Feb", stars: 118000 },
      { month: "Mar", stars: 119800 },
      { month: "Apr", stars: 121400 },
      { month: "May", stars: 122900 },
      { month: "Jun", stars: 124000 }
    ],
    contributorActivity: [
      { week: "W1", commits: 80 },
      { week: "W2", commits: 95 },
      { week: "W3", commits: 88 },
      { week: "W4", commits: 110 }
    ]
  },
  {
    id: "r4",
    name: "ui",
    owner: "shadcn",
    ownerAvatar: "https://avatars.githubusercontent.com/u/124599?v=4",
    description: "Beautifully designed components that you can copy and paste into your apps.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 81000,
    forks: 7200,
    watchers: 1400,
    openIssues: 280,
    closedIssues: 3800,
    pullRequests: 85,
    growth: 18.4,
    trendBadge: "Trending",
    category: "DevTools",
    license: "MIT",
    createdDate: "2023-01-20",
    lastUpdated: "2026-06-03",
    rankScore: 97.9,
    starGrowth: [
      { month: "Jan", stars: 68000 },
      { month: "Feb", stars: 71000 },
      { month: "Mar", stars: 74000 },
      { month: "Apr", stars: 77000 },
      { month: "May", stars: 79200 },
      { month: "Jun", stars: 81000 }
    ],
    contributorActivity: [
      { week: "W1", commits: 30 },
      { week: "W2", commits: 38 },
      { week: "W3", commits: 35 },
      { week: "W4", commits: 45 }
    ]
  },
  {
    id: "r5",
    name: "bun",
    owner: "oven-sh",
    ownerAvatar: "https://avatars.githubusercontent.com/u/96434458?v=4",
    description: "Incredibly fast JavaScript runtime, bundler, test runner, and package manager – all in one.",
    language: "Zig",
    languageColor: "#ec915c",
    stars: 74000,
    forks: 2900,
    watchers: 1800,
    openIssues: 1200,
    closedIssues: 6800,
    pullRequests: 95,
    growth: 14.8,
    trendBadge: "Hot",
    category: "DevTools",
    license: "MIT",
    createdDate: "2021-04-12",
    lastUpdated: "2026-06-04",
    rankScore: 97.4,
    starGrowth: [
      { month: "Jan", stars: 63000 },
      { month: "Feb", stars: 66000 },
      { month: "Mar", stars: 68500 },
      { month: "Apr", stars: 71000 },
      { month: "May", stars: 72800 },
      { month: "Jun", stars: 74000 }
    ],
    contributorActivity: [
      { week: "W1", commits: 90 },
      { week: "W2", commits: 110 },
      { week: "W3", commits: 105 },
      { week: "W4", commits: 125 }
    ]
  },
  {
    id: "r6",
    name: "ollama",
    owner: "ollama",
    ownerAvatar: "https://avatars.githubusercontent.com/u/132989496?v=4",
    description: "Get up and running with Llama 3, Mistral, Gemma, and other large language models locally.",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 98000,
    forks: 8200,
    watchers: 2200,
    openIssues: 740,
    closedIssues: 4200,
    pullRequests: 110,
    growth: 29.5,
    trendBadge: "Breakthrough",
    category: "AI",
    license: "MIT",
    createdDate: "2023-06-20",
    lastUpdated: "2026-06-04",
    rankScore: 98.7,
    starGrowth: [
      { month: "Jan", stars: 72000 },
      { month: "Feb", stars: 78000 },
      { month: "Mar", stars: 85000 },
      { month: "Apr", stars: 91000 },
      { month: "May", stars: 95000 },
      { month: "Jun", stars: 98000 }
    ],
    contributorActivity: [
      { week: "W1", commits: 60 },
      { week: "W2", commits: 75 },
      { week: "W3", commits: 70 },
      { week: "W4", commits: 90 }
    ]
  },
  {
    id: "r7",
    name: "supabase",
    owner: "supabase",
    ownerAvatar: "https://avatars.githubusercontent.com/u/54469796?v=4",
    description: "The open source Firebase alternative with Postgres Database, Auth, Realtime, Storage and Edge Functions.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 72000,
    forks: 5800,
    watchers: 1200,
    openIssues: 890,
    closedIssues: 8200,
    pullRequests: 160,
    growth: 11.2,
    trendBadge: "Featured",
    category: "Cloud",
    license: "Apache-2.0",
    createdDate: "2020-01-14",
    lastUpdated: "2026-06-03",
    rankScore: 96.8,
    starGrowth: [
      { month: "Jan", stars: 64000 },
      { month: "Feb", stars: 66000 },
      { month: "Mar", stars: 68000 },
      { month: "Apr", stars: 69800 },
      { month: "May", stars: 71000 },
      { month: "Jun", stars: 72000 }
    ],
    contributorActivity: [
      { week: "W1", commits: 55 },
      { week: "W2", commits: 68 },
      { week: "W3", commits: 62 },
      { week: "W4", commits: 75 }
    ]
  },
  {
    id: "r8",
    name: "langchain",
    owner: "langchain-ai",
    ownerAvatar: "https://avatars.githubusercontent.com/u/126733545?v=4",
    description: "Building applications with LLMs through composability and agents.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 92000,
    forks: 14800,
    watchers: 1900,
    openIssues: 1400,
    closedIssues: 11500,
    pullRequests: 210,
    growth: 16.4,
    trendBadge: "Trending",
    category: "AI",
    license: "MIT",
    createdDate: "2022-10-17",
    lastUpdated: "2026-06-04",
    rankScore: 97.2,
    starGrowth: [
      { month: "Jan", stars: 78000 },
      { month: "Feb", stars: 81500 },
      { month: "Mar", stars: 85000 },
      { month: "Apr", stars: 88200 },
      { month: "May", stars: 90500 },
      { month: "Jun", stars: 92000 }
    ],
    contributorActivity: [
      { week: "W1", commits: 95 },
      { week: "W2", commits: 120 },
      { week: "W3", commits: 110 },
      { week: "W4", commits: 135 }
    ]
  }
]

export const organizations: Organization[] = [
  {
    id: "org1",
    name: "Vercel",
    login: "vercel",
    avatar: "https://avatars.githubusercontent.com/u/14985020?v=4",
    description: "Develop. Preview. Ship. Creators of Next.js, Turbo, SWR and v0.",
    location: "San Francisco, CA",
    website: "https://vercel.com",
    repositoriesCount: 290,
    starsCount: 380000,
    followersCount: 48000,
    membersCount: 180,
    gitRankScore: 99.1,
    growth: 12.4,
    verified: true,
    topLanguages: ["TypeScript", "Rust", "Go", "JavaScript"],
    topRepositories: ["next.js", "turborepo", "swr", "ai"]
  },
  {
    id: "org2",
    name: "Meta",
    login: "facebook",
    avatar: "https://avatars.githubusercontent.com/u/69631?v=4",
    description: "Open source projects from Meta: React, PyTorch, Llama, Docusaurus, Lexical.",
    location: "Menlo Park, CA",
    website: "https://opensource.fb.com",
    repositoriesCount: 650,
    starsCount: 790000,
    followersCount: 82000,
    membersCount: 450,
    gitRankScore: 98.9,
    growth: 9.8,
    verified: true,
    topLanguages: ["Python", "C++", "JavaScript", "TypeScript"],
    topRepositories: ["react", "llama", "react-native", "docusaurus"]
  },
  {
    id: "org3",
    name: "Vue.js",
    login: "vuejs",
    avatar: "https://avatars.githubusercontent.com/u/6128107?v=4",
    description: "The Progressive JavaScript Framework and its official ecosystem.",
    location: "Global",
    website: "https://vuejs.org",
    repositoriesCount: 85,
    starsCount: 320000,
    followersCount: 39000,
    membersCount: 45,
    gitRankScore: 97.8,
    growth: 7.2,
    verified: true,
    topLanguages: ["TypeScript", "JavaScript", "Vue"],
    topRepositories: ["vue", "core", "vue-router", "pinia"]
  },
  {
    id: "org4",
    name: "Supabase",
    login: "supabase",
    avatar: "https://avatars.githubusercontent.com/u/54469796?v=4",
    description: "The Open Source Firebase Alternative. Built with Postgres.",
    location: "San Francisco, CA & Global",
    website: "https://supabase.com",
    repositoriesCount: 160,
    starsCount: 155000,
    followersCount: 22000,
    membersCount: 95,
    gitRankScore: 96.5,
    growth: 15.1,
    verified: true,
    topLanguages: ["TypeScript", "Go", "Elixir", "PostgreSQL"],
    topRepositories: ["supabase", "realtime", "auth", "storage-api"]
  },
  {
    id: "org5",
    name: "Tailwind Labs",
    login: "tailwindlabs",
    avatar: "https://avatars.githubusercontent.com/u/67109815?v=4",
    description: "Creators of Tailwind CSS, Headless UI, Heroicons, and Tailwind UI.",
    location: "Canada & Global",
    website: "https://tailwindcss.com",
    repositoriesCount: 48,
    starsCount: 145000,
    followersCount: 28000,
    membersCount: 22,
    gitRankScore: 96.1,
    growth: 11.8,
    verified: true,
    topLanguages: ["TypeScript", "CSS", "Rust", "JavaScript"],
    topRepositories: ["tailwindcss", "headlessui", "heroicons", "prettier-plugin-tailwindcss"]
  }
]

export const languages: LanguageStat[] = [
  {
    name: "TypeScript",
    icon: "FileCode",
    color: "#3178c6",
    developerCount: 840000,
    repositoryCount: 4800000,
    avgScore: 88.4,
    growth: 14.5,
    description: "Typed superset of JavaScript that compiles to plain JavaScript.",
    topDeveloper: "Anthony Fu (@antfu)"
  },
  {
    name: "Python",
    icon: "Terminal",
    color: "#3572A5",
    developerCount: 920000,
    repositoryCount: 5200000,
    avgScore: 87.9,
    growth: 18.2,
    description: "Dynamic language powering AI, ML, data science, and modern automation.",
    topDeveloper: "Guido van Rossum"
  },
  {
    name: "Rust",
    icon: "Shield",
    color: "#dea584",
    developerCount: 380000,
    repositoryCount: 1200000,
    avgScore: 91.2,
    growth: 26.8,
    description: "High-performance language empowering everyone to build reliable and efficient software.",
    topDeveloper: "Charlie Marsh (@charlermagne)"
  },
  {
    name: "JavaScript",
    icon: "Code2",
    color: "#f7df1e",
    developerCount: 1450000,
    repositoryCount: 8600000,
    avgScore: 85.1,
    growth: 5.2,
    description: "The ubiquitous language of the web, powering frontend and backend development.",
    topDeveloper: "Sindre Sorhus (@sindresorhus)"
  },
  {
    name: "Go",
    icon: "Cpu",
    color: "#00ADD8",
    developerCount: 520000,
    repositoryCount: 2100000,
    avgScore: 89.6,
    growth: 12.1,
    description: "Open source programming language supported by Google for fast, scalable microservices.",
    topDeveloper: "Mitchell Hashimoto (@mitchellh)"
  },
  {
    name: "Zig",
    icon: "Zap",
    color: "#ec915c",
    developerCount: 95000,
    repositoryCount: 280000,
    avgScore: 92.8,
    growth: 45.4,
    description: "General-purpose programming language and toolchain for maintaining robust software.",
    topDeveloper: "Andrew Kelley (@andrewrk)"
  },
  {
    name: "C",
    icon: "Binary",
    color: "#555555",
    developerCount: 420000,
    repositoryCount: 1800000,
    avgScore: 92.4,
    growth: 2.1,
    description: "The classic foundational systems language powering OS kernels and embedded devices.",
    topDeveloper: "Linus Torvalds (@torvalds)"
  },
  {
    name: "Ruby",
    icon: "Gem",
    color: "#701516",
    developerCount: 310000,
    repositoryCount: 1400000,
    avgScore: 86.8,
    growth: 3.4,
    description: "Dynamic, open source programming language with a focus on simplicity and productivity.",
    topDeveloper: "DHH (@dhh)"
  }
]

export const countries: CountryStat[] = [
  { code: "US", name: "United States", flag: "🇺🇸", developerCount: 780000, avgScore: 88.6, topDeveloper: "Linus Torvalds", growth: 8.2, region: "North America" },
  { code: "JP", name: "Japan", flag: "🇯🇵", developerCount: 240000, avgScore: 89.2, topDeveloper: "Anthony Fu", growth: 12.4, region: "Asia" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", developerCount: 85000, avgScore: 91.4, topDeveloper: "Evan You", growth: 15.6, region: "Asia" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", developerCount: 310000, avgScore: 87.8, topDeveloper: "Dan Abramov", growth: 7.9, region: "Europe" },
  { code: "NO", name: "Norway", flag: "🇳🇴", developerCount: 62000, avgScore: 90.1, topDeveloper: "Sindre Sorhus", growth: 9.2, region: "Europe" },
  { code: "DE", name: "Germany", flag: "🇩🇪", developerCount: 340000, avgScore: 88.1, topDeveloper: "Tobias Koppers", growth: 8.7, region: "Europe" },
  { code: "FR", name: "France", flag: "🇫🇷", developerCount: 280000, avgScore: 87.4, topDeveloper: "Eduardo San Martin Morote", growth: 9.5, region: "Europe" },
  { code: "CA", name: "Canada", flag: "🇨🇦", developerCount: 210000, avgScore: 87.9, topDeveloper: "TJ Holowaychuk", growth: 8.1, region: "North America" },
  { code: "AR", name: "Argentina", flag: "🇦🇷", developerCount: 95000, avgScore: 88.9, topDeveloper: "Guillermo Rauch", growth: 16.4, region: "South America" },
  { code: "IN", name: "India", flag: "🇮🇳", developerCount: 950000, avgScore: 86.4, topDeveloper: "Kailash Nadh", growth: 24.2, region: "Asia" }
]

export const platformStats = {
  totalDevelopers: "2.4M+",
  totalRepositories: "18.5M+",
  totalCountries: 142,
  totalLanguages: 98,
  dailyEvaluations: "450K+"
}
