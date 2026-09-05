import type { Developer } from "../data/mockData"

export function getDeveloperArchetype(dev: Developer): string {
  if (dev.archetype) return dev.archetype

  if (dev.contributions > 6000) return "THE OPEN-SOURCE CHAMPION"
  if (dev.repositories > 200) return "THE CODE ARCHITECT"
  if (dev.growth > 20) return "THE RISING STAR"
  if (dev.followers > 80000) return "THE COMMUNITY LEADER"
  if (dev.languages && dev.languages.length >= 3) return "THE POLYGLOT"
  if (dev.gitRankScore >= 98.5) return "THE ARCHITECT"
  return "THE BUILDER"
}

export function getDeveloperRankBadge(rank: number): { label: string; color: string; bg: string } {
  if (rank === 1) return { label: "🥇 RANK #1 WORLDWIDE", color: "text-amber-400", bg: "from-amber-500/20 to-yellow-500/10 border-amber-500/40" }
  if (rank === 2) return { label: "🥈 RANK #2 WORLDWIDE", color: "text-slate-200", bg: "from-slate-400/20 to-slate-200/10 border-slate-400/40" }
  if (rank === 3) return { label: "🥉 RANK #3 WORLDWIDE", color: "text-amber-600", bg: "from-amber-700/20 to-amber-600/10 border-amber-600/40" }
  if (rank <= 10) return { label: "⚡ TOP 10 GLOBAL", color: "text-indigo-400", bg: "from-indigo-500/20 to-violet-500/10 border-indigo-500/40" }
  if (rank <= 50) return { label: "⭐ TOP 1% DEVELOPER", color: "text-cyan-400", bg: "from-cyan-500/20 to-blue-500/10 border-cyan-500/40" }
  return { label: "🚀 RISING BUILDER", color: "text-emerald-400", bg: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40" }
}

export function getCardThemeByRank(rank: number): "gold" | "silver" | "bronze" | "neon" | "cyber" | "cosmic" {
  if (rank === 1) return "gold"
  if (rank === 2) return "silver"
  if (rank === 3) return "bronze"
  if (rank <= 10) return "neon"
  if (rank <= 20) return "cyber"
  return "cosmic"
}
