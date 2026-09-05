import { developers } from "../data/mockData"
import type { Developer } from "../data/mockData"
import { getDeveloperArchetype } from "../utils/archetype"

export function extractGithubUsername(input: string): string {
  let cleaned = input.trim()
  if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) {
    try {
      const url = new URL(cleaned)
      const parts = url.pathname.split("/").filter(Boolean)
      if (parts.length > 0) return parts[0]
    } catch {
      // fallback to regex
    }
  }
  return cleaned.replace(/^@/, "").replace(/\/$/, "").trim()
}

export async function fetchAndAnalyzeGithubProfile(rawInput: string): Promise<Developer> {
  const username = extractGithubUsername(rawInput)

  // 1. Check if user already exists in local curated database
  const existing = developers.find(
    (d) => d.username.toLowerCase() === username.toLowerCase()
  )
  if (existing) {
    return existing
  }

  // 2. Attempt to fetch real profile from GitHub Public API
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`)
    if (userRes.ok) {
      const u = await userRes.json()

      // Fetch repos to calculate languages and star footprint
      let repos: any[] = []
      try {
        const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
        if (repoRes.ok) {
          repos = await repoRes.json()
        }
      } catch {
        // repo fetch optional
      }

      // Calculate aggregated metrics
      const totalStars = repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0)

      // Language distribution
      const langCounts: Record<string, number> = {}
      repos.forEach((r: any) => {
        if (r.language) {
          langCounts[r.language] = (langCounts[r.language] || 0) + 1
        }
      })

      const sortedLangs = Object.entries(langCounts).sort((a, b) => b[1] - a[1])
      const primaryLanguage = sortedLangs.length > 0 ? sortedLangs[0][0] : "TypeScript"

      const languages = sortedLangs.slice(0, 3).map(([name, count]) => ({
        name,
        percentage: Math.round((count / Math.max(1, repos.length)) * 100),
        color: name === "TypeScript" ? "#3178c6" : name === "Python" ? "#3572A5" : name === "Rust" ? "#dea584" : "#f7df1e",
      }))

      // Calculate dynamic GitRank score (0-100)
      const followersScore = Math.min(30, Math.log10(Math.max(1, u.followers)) * 8)
      const starsScore = Math.min(35, Math.log10(Math.max(1, totalStars)) * 9)
      const reposScore = Math.min(15, Math.min(u.public_repos, 50) * 0.3)
      const bioBonus = u.bio ? 5 : 0
      const blogBonus = u.blog ? 5 : 0
      const rawScore = 60 + followersScore + starsScore + reposScore + bioBonus + blogBonus
      const gitRankScore = Number(Math.min(99.4, Math.max(72.0, rawScore)).toFixed(1))

      const rank = gitRankScore > 98 ? 14 : gitRankScore > 95 ? 45 : gitRankScore > 90 ? 120 : 450
      const percentile = gitRankScore > 98 ? "Top 0.5%" : gitRankScore > 94 ? "Top 2%" : "Top 5%"

      const topReposList = repos.slice(0, 3).map((r: any) => ({
        name: r.name,
        stars: r.stargazers_count || 0,
        forks: r.forks_count || 0,
        description: r.description || "Public open-source repository",
        language: r.language || primaryLanguage,
      }))

      const createdDev: Developer = {
        id: `gh-${u.id || Math.random().toString(36).substring(7)}`,
        username: u.login,
        name: u.name || u.login,
        avatar: u.avatar_url || `https://avatars.githubusercontent.com/u/${u.id}?v=4`,
        bio: u.bio || "Active open-source developer on GitHub.",
        location: u.location || "Global / Remote",
        company: u.company || "Independent",
        website: u.blog || `https://github.com/${u.login}`,
        country: "US",
        countryName: "United States",
        flag: "🌐",
        primaryLanguage,
        languages: languages.length > 0 ? languages : [{ name: primaryLanguage, percentage: 100, color: "#6366f1" }],
        gitRankScore,
        rank,
        previousRank: rank + 3,
        percentile,
        level: gitRankScore > 96 ? "Master Craftsman" : gitRankScore > 90 ? "Elite Builder" : "Pro Contributor",
        streak: Math.min(365, Math.floor((u.public_repos || 5) * 8 + 14)),
        followers: u.followers || 120,
        following: u.following || 45,
        stars: totalStars || 85,
        contributions: (u.public_repos || 10) * 45 + (u.followers || 5) * 6,
        repositories: u.public_repos || 12,
        issuesSolved: Math.floor((u.public_repos || 5) * 12 + 10),
        prsMerged: Math.floor((u.public_repos || 5) * 8 + 5),
        commitsThisYear: Math.floor((u.public_repos || 5) * 35 + 80),
        trend: "up",
        growth: Number((Math.random() * 8 + 4).toFixed(1)),
        archetype: "THE BUILDER",
        cardId: `GR-2026-${String(Math.floor(Math.random() * 900000 + 100000))}`,
        badges: ["Verified GitHub", `${primaryLanguage} Dev`, percentile],
        achievements: [
          { title: "Public GitHub Contributor", description: `Active repository footprint with ${u.public_repos || 0} public repositories`, icon: "Package", date: "2026" },
          { title: "Community Star Signal", description: `Accumulated ${totalStars.toLocaleString()} stars across open projects`, icon: "Star", date: "2026" }
        ],
        rankingHistory: [
          { month: "Jan", rank: rank + 12, score: Number((gitRankScore - 1.4).toFixed(1)) },
          { month: "Feb", rank: rank + 8, score: Number((gitRankScore - 1.0).toFixed(1)) },
          { month: "Mar", rank: rank + 5, score: Number((gitRankScore - 0.7).toFixed(1)) },
          { month: "Apr", rank: rank + 3, score: Number((gitRankScore - 0.4).toFixed(1)) },
          { month: "May", rank: rank + 1, score: Number((gitRankScore - 0.1).toFixed(1)) },
          { month: "Jun", rank: rank, score: gitRankScore }
        ],
        contributionActivity: [
          { month: "Jan", commits: 45, prs: 6, reviews: 12 },
          { month: "Feb", commits: 60, prs: 8, reviews: 15 },
          { month: "Mar", commits: 55, prs: 7, reviews: 14 },
          { month: "Apr", commits: 70, prs: 11, reviews: 18 },
          { month: "May", commits: 65, prs: 9, reviews: 16 },
          { month: "Jun", commits: 75, prs: 12, reviews: 20 }
        ],
        topRepos: topReposList.length > 0 ? topReposList : [
          { name: `${username}-project`, stars: 24, forks: 6, description: "Featured open source project", language: primaryLanguage }
        ]
      }

      createdDev.archetype = getDeveloperArchetype(createdDev)
      return createdDev
    }
  } catch (error) {
    console.warn("GitHub API fetch fallback:", error)
  }

  // 3. Fallback: Heuristic simulated builder for any handle
  const hash = username.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const score = Number((82.0 + (hash % 150) / 10).toFixed(1))
  const rank = Math.floor(100 + (hash % 400))
  const stars = (hash % 800) + 120
  const followers = (hash % 400) + 80
  const repos = (hash % 35) + 8

  const fallbackDev: Developer = {
    id: `custom-${username}`,
    username,
    name: username.charAt(0).toUpperCase() + username.slice(1),
    avatar: `https://images.unsplash.com/photo-${1535713875002 + (hash % 1000)}?auto=format&fit=crop&w=250&q=80`,
    bio: "Open-source builder and software engineer.",
    location: "Global",
    company: "Independent Developer",
    website: `https://github.com/${username}`,
    country: "US",
    countryName: "United States",
    flag: "🌐",
    primaryLanguage: (["TypeScript", "Python", "Rust", "Go", "JavaScript"])[hash % 5],
    languages: [
      { name: "TypeScript", percentage: 65, color: "#3178c6" },
      { name: "Python", percentage: 35, color: "#3572A5" }
    ],
    gitRankScore: score,
    rank,
    previousRank: rank + 5,
    percentile: "Top 5%",
    level: "Elite Contributor",
    streak: 64,
    followers,
    following: 38,
    stars,
    contributions: repos * 32 + followers * 3,
    repositories: repos,
    issuesSolved: repos * 8,
    prsMerged: repos * 5,
    commitsThisYear: repos * 25,
    trend: "up",
    growth: 8.4,
    archetype: "THE BUILDER",
    cardId: `GR-2026-${String(Math.floor(Math.random() * 900000 + 100000))}`,
    badges: ["Simulated Scan", "Active Contributor", "Top 5%"],
    achievements: [
      { title: "Continuous Contributor", description: "Active public contribution track record", icon: "Flame", date: "2026" }
    ],
    rankingHistory: [
      { month: "Jan", rank: rank + 10, score: Number((score - 1.2).toFixed(1)) },
      { month: "Feb", rank: rank + 8, score: Number((score - 0.9).toFixed(1)) },
      { month: "Mar", rank: rank + 5, score: Number((score - 0.6).toFixed(1)) },
      { month: "Apr", rank: rank + 3, score: Number((score - 0.4).toFixed(1)) },
      { month: "May", rank: rank + 1, score: Number((score - 0.1).toFixed(1)) },
      { month: "Jun", rank: rank, score }
    ],
    contributionActivity: [
      { month: "Jan", commits: 35, prs: 5, reviews: 8 },
      { month: "Feb", commits: 45, prs: 6, reviews: 10 },
      { month: "Mar", commits: 50, prs: 7, reviews: 12 },
      { month: "Apr", commits: 60, prs: 9, reviews: 15 },
      { month: "May", commits: 55, prs: 8, reviews: 14 },
      { month: "Jun", commits: 65, prs: 10, reviews: 16 }
    ],
    topRepos: [
      { name: `${username}-app`, stars: Math.floor(stars * 0.7), forks: 12, description: "Core flagship application", language: "TypeScript" },
      { name: "toolkit", stars: Math.floor(stars * 0.3), forks: 5, description: "Developer utilities and scripts", language: "Python" }
    ]
  }

  fallbackDev.archetype = getDeveloperArchetype(fallbackDev)
  return fallbackDev
}
