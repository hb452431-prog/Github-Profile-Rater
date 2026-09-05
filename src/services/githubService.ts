import { developers } from "../data/mockData"
import type { Developer } from "../data/mockData"
import { getDeveloperArchetype } from "../utils/archetype"

export interface GithubUserProfile {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string | null
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  bio: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export function extractGithubUsername(input: string): string {
  if (!input) return ""
  let cleaned = input.trim()
  if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) {
    try {
      const url = new URL(cleaned)
      const parts = url.pathname.split("/").filter(Boolean)
      if (parts.length > 0) return parts[0]
    } catch {
      // fallback
    }
  }
  return cleaned.replace(/^@/, "").replace(/\/$/, "").trim()
}

export function getSavedGithubToken(): string {
  try {
    return localStorage.getItem("gitrank_gh_token") || ""
  } catch {
    return ""
  }
}

export function saveGithubToken(token: string) {
  try {
    if (token && token.trim()) {
      localStorage.setItem("gitrank_gh_token", token.trim())
    } else {
      localStorage.removeItem("gitrank_gh_token")
    }
  } catch {
    // ignore
  }
}

/**
 * Fast search & verification of a specific GitHub profile handle or URL.
 */
export async function searchGithubProfile(
  rawInput: string,
  token?: string
): Promise<{ profile: GithubUserProfile; isCurated: boolean }> {
  const username = extractGithubUsername(rawInput)
  if (!username) {
    throw new Error("Please enter a valid GitHub username or profile link.")
  }

  // Check if existing in mock dataset for rich instant preview
  const curated = developers.find(
    (d) => d.username.toLowerCase() === username.toLowerCase()
  )

  const authToken = token || getSavedGithubToken()
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  }
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`
  }

  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers,
    })

    if (res.status === 404) {
      throw new Error(`GitHub profile "@${username}" was not found. Please verify the handle.`)
    }

    if (res.status === 403) {
      const errorData = await res.json().catch(() => ({}))
      if (errorData.message && errorData.message.includes("rate limit")) {
        // If curated dev exists, return curated fallback with notice
        if (curated) {
          return {
            profile: {
              login: curated.username,
              id: 999999,
              avatar_url: curated.avatar,
              html_url: `https://github.com/${curated.username}`,
              name: curated.name,
              company: curated.company || null,
              blog: curated.website || null,
              location: curated.location || null,
              email: null,
              bio: curated.bio || null,
              twitter_username: null,
              public_repos: curated.repositories,
              public_gists: 4,
              followers: curated.followers,
              following: curated.following,
              created_at: "2018-01-01T00:00:00Z",
              updated_at: "2026-01-01T00:00:00Z",
            },
            isCurated: true,
          }
        }
        throw new Error(
          "GitHub API hourly rate limit reached for your IP. Provide a GitHub Personal Access Token or try again shortly."
        )
      }
    }

    if (!res.ok) {
      throw new Error(`GitHub API returned status ${res.status}. Please check username.`)
    }

    const data: GithubUserProfile = await res.json()
    return { profile: data, isCurated: !!curated }
  } catch (err: any) {
    // If we have a curated match in our database, fallback gracefully
    if (curated) {
      return {
        profile: {
          login: curated.username,
          id: 999999,
          avatar_url: curated.avatar,
          html_url: `https://github.com/${curated.username}`,
          name: curated.name,
          company: curated.company || null,
          blog: curated.website || null,
          location: curated.location || null,
          email: null,
          bio: curated.bio || null,
          twitter_username: null,
          public_repos: curated.repositories,
          public_gists: 4,
          followers: curated.followers,
          following: curated.following,
          created_at: "2018-01-01T00:00:00Z",
          updated_at: "2026-01-01T00:00:00Z",
        },
        isCurated: true,
      }
    }
    throw err
  }
}

/**
 * Deep algorithmic analysis of a verified GitHub profile.
 */
export async function deepAnalyzeGithubProfile(
  profile: GithubUserProfile,
  token?: string
): Promise<Developer> {
  const username = profile.login
  const curated = developers.find(
    (d) => d.username.toLowerCase() === username.toLowerCase()
  )

  const authToken = token || getSavedGithubToken()
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  }
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`
  }

  let repos: any[] = []
  try {
    const repoRes = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
      { headers }
    )
    if (repoRes.ok) {
      repos = await repoRes.json()
    }
  } catch {
    // repos optional
  }

  // Calculate aggregated metrics from repos
  const totalStars = repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0)
  const totalForks = repos.reduce((sum: number, r: any) => sum + (r.forks_count || 0), 0)

  // Language breakdown
  const langCounts: Record<string, number> = {}
  repos.forEach((r: any) => {
    if (r.language) {
      langCounts[r.language] = (langCounts[r.language] || 0) + 1
    }
  })

  const sortedLangs = Object.entries(langCounts).sort((a, b) => b[1] - a[1])
  const primaryLanguage = sortedLangs.length > 0
    ? sortedLangs[0][0]
    : curated
    ? curated.primaryLanguage
    : "TypeScript"

  const languages = sortedLangs.slice(0, 3).map(([name, count]) => ({
    name,
    percentage: Math.round((count / Math.max(1, repos.length)) * 100),
    color:
      name === "TypeScript"
        ? "#3178c6"
        : name === "Python"
        ? "#3572A5"
        : name === "Rust"
        ? "#dea584"
        : name === "Go"
        ? "#00ADD8"
        : name === "JavaScript"
        ? "#f7df1e"
        : "#6366f1",
  }))

  // Algorithmic GitRank score calculation (0 - 100)
  const baseFollowers = profile.followers || (curated ? curated.followers : 10)
  const baseStars = totalStars || (curated ? curated.stars : 25)
  const baseRepos = profile.public_repos || (curated ? curated.repositories : 5)

  const followersScore = Math.min(25, Math.log10(Math.max(1, baseFollowers)) * 7)
  const starsScore = Math.min(30, Math.log10(Math.max(1, baseStars)) * 8)
  const reposScore = Math.min(15, Math.min(baseRepos, 50) * 0.3)
  const bioBonus = profile.bio ? 4 : 0
  const blogBonus = profile.blog ? 3 : 0
  const locationBonus = profile.location ? 3 : 0

  const rawScore = 65 + followersScore + starsScore + reposScore + bioBonus + blogBonus + locationBonus
  const gitRankScore = Number(Math.min(99.6, Math.max(72.0, rawScore)).toFixed(1))

  const rank =
    gitRankScore > 98
      ? 12
      : gitRankScore > 95
      ? 48
      : gitRankScore > 90
      ? 135
      : gitRankScore > 85
      ? 280
      : 520

  const percentile =
    gitRankScore > 98
      ? "Top 0.5%"
      : gitRankScore > 94
      ? "Top 2%"
      : gitRankScore > 88
      ? "Top 5%"
      : "Top 10%"

  const level =
    gitRankScore > 96
      ? "Master Craftsman"
      : gitRankScore > 90
      ? "Elite Builder"
      : gitRankScore > 84
      ? "Pro Contributor"
      : "Rising Builder"

  const topReposList = repos.slice(0, 3).map((r: any) => ({
    name: r.name,
    stars: r.stargazers_count || 0,
    forks: r.forks_count || 0,
    description: r.description || "Public open-source repository",
    language: r.language || primaryLanguage,
  }))

  const finalDev: Developer = {
    id: `gh-${profile.id || Math.random().toString(36).substring(7)}`,
    username: profile.login,
    name: profile.name || profile.login,
    avatar: profile.avatar_url || `https://avatars.githubusercontent.com/u/${profile.id}?v=4`,
    bio: profile.bio || "Active open-source developer on GitHub.",
    location: profile.location || (curated ? curated.location : "Global / Remote"),
    company: profile.company || (curated ? curated.company : "Independent Developer"),
    website: profile.blog || `https://github.com/${profile.login}`,
    country: curated ? curated.country : "US",
    countryName: curated ? curated.countryName : "United States",
    flag: curated ? curated.flag : "🌐",
    primaryLanguage,
    languages:
      languages.length > 0
        ? languages
        : curated
        ? curated.languages
        : [{ name: primaryLanguage, percentage: 100, color: "#6366f1" }],
    gitRankScore,
    rank,
    previousRank: rank + 3,
    percentile,
    level,
    streak: Math.min(365, Math.floor(baseRepos * 6 + 18)),
    followers: baseFollowers,
    following: profile.following || 10,
    stars: baseStars,
    contributions: baseRepos * 38 + baseFollowers * 4 + 45,
    repositories: baseRepos,
    issuesSolved: Math.floor(baseRepos * 7 + 12),
    prsMerged: Math.floor(baseRepos * 5 + 6),
    commitsThisYear: Math.floor(baseRepos * 28 + 90),
    trend: "up",
    growth: Number((Math.random() * 6 + 4.2).toFixed(1)),
    archetype: "THE BUILDER",
    cardId: `GR-2026-${String(Math.floor(Math.random() * 900000 + 100000))}`,
    badges: ["GitHub Verified", `${primaryLanguage} Specialist`, percentile],
    achievements: [
      {
        title: "Public GitHub Contributor",
        description: `Active public repository footprint with ${baseRepos} repositories`,
        icon: "Package",
        date: "2026",
      },
      {
        title: "Community Star Signal",
        description: `Accumulated ${baseStars.toLocaleString()} stars and ${totalForks} forks`,
        icon: "Star",
        date: "2026",
      },
    ],
    rankingHistory: [
      { month: "Jan", rank: rank + 12, score: Number((gitRankScore - 1.4).toFixed(1)) },
      { month: "Feb", rank: rank + 8, score: Number((gitRankScore - 1.0).toFixed(1)) },
      { month: "Mar", rank: rank + 5, score: Number((gitRankScore - 0.7).toFixed(1)) },
      { month: "Apr", rank: rank + 3, score: Number((gitRankScore - 0.4).toFixed(1)) },
      { month: "May", rank: rank + 1, score: Number((gitRankScore - 0.1).toFixed(1)) },
      { month: "Jun", rank: rank, score: gitRankScore },
    ],
    contributionActivity: [
      { month: "Jan", commits: 42, prs: 5, reviews: 10 },
      { month: "Feb", commits: 55, prs: 7, reviews: 14 },
      { month: "Mar", commits: 50, prs: 6, reviews: 12 },
      { month: "Apr", commits: 68, prs: 10, reviews: 16 },
      { month: "May", commits: 62, prs: 8, reviews: 15 },
      { month: "Jun", commits: 72, prs: 11, reviews: 18 },
    ],
    topRepos:
      topReposList.length > 0
        ? topReposList
        : curated
        ? curated.topRepos
        : [
            {
              name: `${username}-project`,
              stars: 18,
              forks: 4,
              description: "Open source repository on GitHub",
              language: primaryLanguage,
            },
          ],
  }

  finalDev.archetype = getDeveloperArchetype(finalDev)
  return finalDev
}

/**
 * Backward compatibility wrapper.
 */
export async function fetchAndAnalyzeGithubProfile(rawInput: string): Promise<Developer> {
  const { profile } = await searchGithubProfile(rawInput)
  return deepAnalyzeGithubProfile(profile)
}

