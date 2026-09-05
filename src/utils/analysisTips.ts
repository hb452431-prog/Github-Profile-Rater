import type { Developer } from "../data/mockData"

export interface ProfileTip {
  id: string
  title: string
  category: "Profile & Branding" | "Repository Polish" | "Contribution Velocity" | "Community & Impact"
  impact: "High Impact" | "Medium Impact" | "Quick Win"
  pointsBoost: number
  description: string
  actionText: string
  completedByDefault?: boolean
}

export interface ProfileAnalysisResult {
  developer: Developer
  scoreBreakdown: {
    overallScore: number
    codeImpact: number // out of 100
    activityVelocity: number // out of 100
    profileQuality: number // out of 100
    ecosystemBreadth: number // out of 100
    documentationHealth: number // out of 100
  }
  tips: ProfileTip[]
  strengths: string[]
  weaknesses: string[]
}

export function analyzeDeveloperProfile(dev: Developer): ProfileAnalysisResult {
  const tips: ProfileTip[] = []
  const strengths: string[] = []
  const weaknesses: string[] = []

  // 1. Evaluate Profile & Branding
  let profileQuality = 70
  if (dev.bio && dev.bio.length > 20) {
    profileQuality += 10
    strengths.push("Well-crafted personal bio and elevator pitch")
  } else {
    profileQuality -= 15
    weaknesses.push("Missing or minimal profile bio")
    tips.push({
      id: "tip-bio",
      title: "Add an Impactful Profile Bio",
      category: "Profile & Branding",
      impact: "Quick Win",
      pointsBoost: 1.5,
      description: "Write a concise 1-2 sentence bio highlighting your tech stack, current role, and what you are actively building.",
      actionText: "Edit GitHub Bio",
    })
  }

  if (dev.website || dev.location) {
    profileQuality += 10
    strengths.push("Complete location and portfolio/website metadata")
  } else {
    tips.push({
      id: "tip-links",
      title: "Link Personal Portfolio or Social Profile",
      category: "Profile & Branding",
      impact: "Quick Win",
      pointsBoost: 1.0,
      description: "Add your personal website, portfolio, Twitter/X handle, or LinkedIn to your public GitHub profile.",
      actionText: "Add Website Link",
    })
  }

  // 2. Evaluate Code Impact & Stars
  let codeImpact = Math.min(100, Math.round((dev.stars / 2000) * 80 + 20))
  if (dev.stars >= 1000) {
    strengths.push(`Impressive repository star footprint (${dev.stars.toLocaleString()} stars)`)
  } else if (dev.stars < 100) {
    codeImpact = Math.max(35, codeImpact)
    weaknesses.push("Low repository star count on public repositories")
    tips.push({
      id: "tip-stars",
      title: "Showcase Flagship Projects on Dev Communities",
      category: "Community & Impact",
      impact: "High Impact",
      pointsBoost: 3.5,
      description: "Share your best open-source repositories on Reddit (r/webdev, r/programming), Hacker News, X, and Dev.to to earn organic stars.",
      actionText: "Launch on Product Hunt & Reddit",
    })
  }

  // 3. Evaluate Repository Polish & Documentation
  let documentationHealth = 75
  if (dev.repositories > 0) {
    tips.push({
      id: "tip-readme",
      title: "Create a Custom GitHub Profile README (username/username)",
      category: "Profile & Branding",
      impact: "High Impact",
      pointsBoost: 2.5,
      description: "Create a special repository with your username to display dynamic stats, currently learning techs, and featured showcase projects.",
      actionText: "Create Profile README",
    })
    tips.push({
      id: "tip-repo-hygiene",
      title: "Add Open Source Licenses & Topic Tags to Top Repos",
      category: "Repository Polish",
      impact: "Medium Impact",
      pointsBoost: 1.8,
      description: "Ensure all public repos have an MIT/Apache 2.0 license, descriptive README with screenshots, and relevant GitHub topic tags.",
      actionText: "Add License & Topics",
    })
  }

  // 4. Evaluate Activity & Consistency
  let activityVelocity = Math.min(100, Math.round((dev.contributions / 3000) * 75 + 25))
  if (dev.streak >= 100) {
    strengths.push(`Exceptional contribution streak (${dev.streak} consecutive active days)`)
  } else {
    tips.push({
      id: "tip-streak",
      title: "Build a Consistent Commit Cadence",
      category: "Contribution Velocity",
      impact: "High Impact",
      pointsBoost: 3.0,
      description: "Aim for 3-5 commits per week across side projects or open-source PRs to demonstrate active coding momentum.",
      actionText: "Set Daily Commit Goal",
    })
  }

  if (dev.prsMerged < 50) {
    tips.push({
      id: "tip-prs",
      title: "Contribute Pull Requests to Established Repositories",
      category: "Contribution Velocity",
      impact: "High Impact",
      pointsBoost: 2.8,
      description: "Submit bug fixes, documentation improvements, or features to trending repositories (e.g. Next.js, Vite, Tailwind, LangChain).",
      actionText: "Browse Good First Issues",
    })
  }

  // 5. Ecosystem Breadth
  const ecosystemBreadth = Math.min(100, (dev.languages ? dev.languages.length : 1) * 25 + 25)
  if (dev.languages && dev.languages.length >= 3) {
    strengths.push(`Diverse polyglot tech stack (${dev.languages.map((l) => l.name).join(", ")})`)
  } else {
    tips.push({
      id: "tip-polyglot",
      title: "Diversify Your Tech Stack with a Systems or Fullstack Language",
      category: "Repository Polish",
      impact: "Medium Impact",
      pointsBoost: 2.0,
      description: "Publish side projects exploring TypeScript, Rust, Go, or Python to showcase modern versatility to engineering teams.",
      actionText: "Explore New Tech",
    })
  }

  return {
    developer: dev,
    scoreBreakdown: {
      overallScore: dev.gitRankScore,
      codeImpact: Math.min(99, Math.max(40, codeImpact)),
      activityVelocity: Math.min(99, Math.max(45, activityVelocity)),
      profileQuality: Math.min(99, Math.max(50, profileQuality)),
      ecosystemBreadth: Math.min(99, Math.max(40, ecosystemBreadth)),
      documentationHealth: Math.min(99, Math.max(50, documentationHealth)),
    },
    tips,
    strengths,
    weaknesses,
  }
}
