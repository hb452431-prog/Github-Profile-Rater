import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from "recharts"
import {
  GitCompare,
  Crown,
  Sparkles,
  Star,
  Users,
  Flame,
  Package,
  TrendingUp,
  Code2
} from "lucide-react"
import { developers } from "../data/mockData"
import type { Developer } from "../data/mockData"
import { useShareCard } from "../context/ShareCardContext"
import { getDeveloperArchetype } from "../utils/archetype"

export default function Compare() {
  const [searchParams] = useSearchParams()
  const { openShareCard } = useShareCard()

  const defaultDev1 = searchParams.get("dev1") || "torvalds"
  const defaultDev2 = searchParams.get("dev2") || "antfu"
  const defaultDev3 = searchParams.get("dev3") || "yyx990803"

  const [dev1Username, setDev1Username] = useState(defaultDev1)
  const [dev2Username, setDev2Username] = useState(defaultDev2)
  const [dev3Username, setDev3Username] = useState(defaultDev3)
  const [slotCount, setSlotCount] = useState<2 | 3>(3)

  const dev1 = developers.find((d) => d.username.toLowerCase() === dev1Username.toLowerCase()) || developers[0]
  const dev2 = developers.find((d) => d.username.toLowerCase() === dev2Username.toLowerCase()) || developers[1]
  const dev3 = developers.find((d) => d.username.toLowerCase() === dev3Username.toLowerCase()) || developers[2]

  const activeDevelopers = slotCount === 2 ? [dev1, dev2] : [dev1, dev2, dev3]

  // Find winners for each key metric
  const getWinner = (metricKey: keyof Developer) => {
    let best = activeDevelopers[0]
    for (const d of activeDevelopers) {
      if ((d[metricKey] as number) > (best[metricKey] as number)) {
        best = d
      }
    }
    return best.id
  }

  const scoreWinner = getWinner("gitRankScore")
  const starsWinner = getWinner("stars")
  const followersWinner = getWinner("followers")
  const commitsWinner = getWinner("contributions")
  const reposWinner = getWinner("repositories")
  const growthWinner = getWinner("growth")

  // Chart Comparison Data
  const chartData = [
    {
      metric: "Score (x100)",
      [dev1.name]: dev1.gitRankScore,
      [dev2.name]: dev2.gitRankScore,
      ...(slotCount === 3 ? { [dev3.name]: dev3.gitRankScore } : {}),
    },
    {
      metric: "Stars (k)",
      [dev1.name]: Math.round(dev1.stars / 1000),
      [dev2.name]: Math.round(dev2.stars / 1000),
      ...(slotCount === 3 ? { [dev3.name]: Math.round(dev3.stars / 1000) } : {}),
    },
    {
      metric: "Followers (k)",
      [dev1.name]: Math.round(dev1.followers / 1000),
      [dev2.name]: Math.round(dev2.followers / 1000),
      ...(slotCount === 3 ? { [dev3.name]: Math.round(dev3.followers / 1000) } : {}),
    },
    {
      metric: "Commits (x100)",
      [dev1.name]: Math.round(dev1.contributions / 100),
      [dev2.name]: Math.round(dev2.contributions / 100),
      ...(slotCount === 3 ? { [dev3.name]: Math.round(dev3.contributions / 100) } : {}),
    },
  ]

  return (
    <div className="container mx-auto px-4 py-10 space-y-10">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
          <GitCompare className="w-3.5 h-3.5" /> Head-to-Head Developer Analytics
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          Compare Open Source Builders
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Analyze side-by-side ranking ratings, repository velocity, contribution volumes, and community footprints.
        </p>

        {/* Slot count toggle */}
        <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-muted text-xs font-semibold mt-2">
          <button
            onClick={() => setSlotCount(2)}
            className={`px-3 py-1.5 rounded-lg transition ${
              slotCount === 2 ? "bg-background text-foreground shadow" : "text-muted-foreground"
            }`}
          >
            2 Developers
          </button>
          <button
            onClick={() => setSlotCount(3)}
            className={`px-3 py-1.5 rounded-lg transition ${
              slotCount === 3 ? "bg-background text-foreground shadow" : "text-muted-foreground"
            }`}
          >
            3 Developers
          </button>
        </div>
      </div>

      {/* SELECTOR CARDS */}
      <div className={`grid grid-cols-1 md:grid-cols-${slotCount} gap-6`}>
        {/* Developer 1 */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4 relative">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Developer 1
          </label>
          <select
            value={dev1Username}
            onChange={(e) => setDev1Username(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-muted border border-border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {developers.map((d) => (
              <option key={d.id} value={d.username}>
                {d.name} (@{d.username})
              </option>
            ))}
          </select>

          <div className="flex items-center gap-3 pt-2">
            <img src={dev1.avatar} alt={dev1.name} className="w-14 h-14 rounded-xl object-cover border border-border" />
            <div>
              <h3 className="font-bold text-base">{dev1.name}</h3>
              <p className="text-xs text-muted-foreground">@{dev1.username} {dev1.flag}</p>
              <span className="text-[10px] font-bold text-primary">{getDeveloperArchetype(dev1)}</span>
            </div>
          </div>

          <button
            onClick={() => openShareCard(dev1)}
            className="w-full py-2 px-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Generate Share Card
          </button>
        </div>

        {/* Developer 2 */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4 relative">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Developer 2
          </label>
          <select
            value={dev2Username}
            onChange={(e) => setDev2Username(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-muted border border-border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {developers.map((d) => (
              <option key={d.id} value={d.username}>
                {d.name} (@{d.username})
              </option>
            ))}
          </select>

          <div className="flex items-center gap-3 pt-2">
            <img src={dev2.avatar} alt={dev2.name} className="w-14 h-14 rounded-xl object-cover border border-border" />
            <div>
              <h3 className="font-bold text-base">{dev2.name}</h3>
              <p className="text-xs text-muted-foreground">@{dev2.username} {dev2.flag}</p>
              <span className="text-[10px] font-bold text-primary">{getDeveloperArchetype(dev2)}</span>
            </div>
          </div>

          <button
            onClick={() => openShareCard(dev2)}
            className="w-full py-2 px-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Generate Share Card
          </button>
        </div>

        {/* Developer 3 (if 3 active) */}
        {slotCount === 3 && (
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4 relative">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              Developer 3
            </label>
            <select
              value={dev3Username}
              onChange={(e) => setDev3Username(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-muted border border-border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {developers.map((d) => (
                <option key={d.id} value={d.username}>
                  {d.name} (@{d.username})
                </option>
              ))}
            </select>

            <div className="flex items-center gap-3 pt-2">
              <img src={dev3.avatar} alt={dev3.name} className="w-14 h-14 rounded-xl object-cover border border-border" />
              <div>
                <h3 className="font-bold text-base">{dev3.name}</h3>
                <p className="text-xs text-muted-foreground">@{dev3.username} {dev3.flag}</p>
                <span className="text-[10px] font-bold text-primary">{getDeveloperArchetype(dev3)}</span>
              </div>
            </div>

            <button
              onClick={() => openShareCard(dev3)}
              className="w-full py-2 px-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Generate Share Card
            </button>
          </div>
        )}
      </div>

      {/* METRIC BREAKDOWN TABLE WITH WINNERS */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
        <div className="p-4 border-b border-border bg-muted/40 flex items-center justify-between">
          <h3 className="font-bold text-base">Key Metrics Comparison</h3>
          <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
            <Crown className="w-3.5 h-3.5" /> Best in Metric
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/30 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="p-4">Metric</th>
                {activeDevelopers.map((d) => (
                  <th key={d.id} className="p-4">
                    {d.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {/* GitRank Score */}
              <tr className="hover:bg-muted/20">
                <td className="p-4 font-semibold text-muted-foreground">GitRank Rating</td>
                {activeDevelopers.map((d) => (
                  <td key={d.id} className="p-4 font-black text-lg text-primary">
                    <div className="flex items-center gap-2">
                      <span>{d.gitRankScore}</span>
                      {d.id === scoreWinner && <Crown className="w-4 h-4 text-amber-400" />}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Global Rank */}
              <tr className="hover:bg-muted/20">
                <td className="p-4 font-semibold text-muted-foreground">Global Rank</td>
                {activeDevelopers.map((d) => (
                  <td key={d.id} className="p-4 font-bold">
                    #{d.rank}
                  </td>
                ))}
              </tr>

              {/* Total Stars */}
              <tr className="hover:bg-muted/20">
                <td className="p-4 font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400" /> Stars Earned
                </td>
                {activeDevelopers.map((d) => (
                  <td key={d.id} className="p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <span>{d.stars.toLocaleString()}</span>
                      {d.id === starsWinner && <Crown className="w-4 h-4 text-amber-400" />}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Followers */}
              <tr className="hover:bg-muted/20">
                <td className="p-4 font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-sky-400" /> Followers
                </td>
                {activeDevelopers.map((d) => (
                  <td key={d.id} className="p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <span>{d.followers.toLocaleString()}</span>
                      {d.id === followersWinner && <Crown className="w-4 h-4 text-amber-400" />}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Contributions */}
              <tr className="hover:bg-muted/20">
                <td className="p-4 font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-rose-400" /> Annual Commits
                </td>
                {activeDevelopers.map((d) => (
                  <td key={d.id} className="p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <span>{d.contributions.toLocaleString()}</span>
                      {d.id === commitsWinner && <Crown className="w-4 h-4 text-amber-400" />}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Repositories */}
              <tr className="hover:bg-muted/20">
                <td className="p-4 font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-emerald-400" /> Public Repositories
                </td>
                {activeDevelopers.map((d) => (
                  <td key={d.id} className="p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <span>{d.repositories}</span>
                      {d.id === reposWinner && <Crown className="w-4 h-4 text-amber-400" />}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Growth */}
              <tr className="hover:bg-muted/20">
                <td className="p-4 font-semibold text-muted-foreground flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-indigo-400" /> Velocity Growth
                </td>
                {activeDevelopers.map((d) => (
                  <td key={d.id} className="p-4 font-bold text-emerald-500">
                    <div className="flex items-center gap-2">
                      <span>+{d.growth}%</span>
                      {d.id === growthWinner && <Crown className="w-4 h-4 text-amber-400" />}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Primary Language */}
              <tr className="hover:bg-muted/20">
                <td className="p-4 font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-primary" /> Core Language
                </td>
                {activeDevelopers.map((d) => (
                  <td key={d.id} className="p-4 font-medium">
                    {d.primaryLanguage}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* RECHARTS COMPARISON CHART */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-4">
        <h3 className="font-bold text-base">Visual Footprint Comparison</h3>
        <p className="text-xs text-muted-foreground">Normalized metrics across compared builders</p>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="metric" fontSize={12} stroke="#888888" />
              <YAxis fontSize={12} stroke="#888888" />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", fontSize: "12px", color: "#fff" }}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
              <Bar dataKey={dev1.name} fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey={dev2.name} fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              {slotCount === 3 && <Bar dataKey={dev3.name} fill="#ec4899" radius={[4, 4, 0, 0]} />}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
