import { useState } from "react"
import { useParams } from "react-router-dom"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"
import {
  Star,
  GitFork,
  Eye,
  AlertCircle,
  GitPullRequest,
  TrendingUp,
  ExternalLink
} from "lucide-react"
import { repositories } from "../data/mockData"

export default function RepositoryDetail() {
  const { owner, repo } = useParams<{ owner: string; repo: string }>()
  const [isStarred, setIsStarred] = useState(false)

  const repository =
    repositories.find(
      (r) =>
        r.owner.toLowerCase() === owner?.toLowerCase() &&
        r.name.toLowerCase() === repo?.toLowerCase()
    ) || repositories[0]

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      {/* REPO HERO */}
      <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={repository.ownerAvatar}
              alt={repository.owner}
              className="w-14 h-14 rounded-2xl border border-border object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {repository.owner}/{repository.name}
                </h1>
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/20">
                  {repository.trendBadge}
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                License: {repository.license} • Category: {repository.category}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsStarred(!isStarred)}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border text-xs font-bold transition ${
                isStarred
                  ? "bg-amber-500/20 text-amber-500 border-amber-500/30"
                  : "border-border bg-muted hover:bg-accent"
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${isStarred ? "fill-amber-400" : ""}`} />
              {isStarred ? "Starred" : "Star Project"}
            </button>
            <a
              href={`https://github.com/${repository.owner}/${repository.name}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View on GitHub
            </a>
          </div>
        </div>

        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          {repository.description}
        </p>

        {/* METRICS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-border">
          <div className="p-3 rounded-xl bg-muted/40 border border-border">
            <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> Stars
            </span>
            <div className="text-xl font-black mt-0.5">
              {repository.stars.toLocaleString()}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-muted/40 border border-border">
            <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
              <GitFork className="w-3 h-3 text-sky-400" /> Forks
            </span>
            <div className="text-xl font-bold mt-0.5">
              {repository.forks.toLocaleString()}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-muted/40 border border-border">
            <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
              <Eye className="w-3 h-3 text-indigo-400" /> Watchers
            </span>
            <div className="text-xl font-bold mt-0.5">
              {repository.watchers.toLocaleString()}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-muted/40 border border-border">
            <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-rose-400" /> Issues
            </span>
            <div className="text-xl font-bold mt-0.5">
              {repository.openIssues}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-muted/40 border border-border">
            <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
              <GitPullRequest className="w-3 h-3 text-emerald-400" /> Open PRs
            </span>
            <div className="text-xl font-bold mt-0.5">
              {repository.pullRequests}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-muted/40 border border-border">
            <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-indigo-400" /> GitRank Rating
            </span>
            <div className="text-xl font-black text-primary mt-0.5">
              {repository.rankScore}
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Star Growth Chart */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base">Star Velocity & Growth</h3>
            <span className="text-xs font-bold text-emerald-500">+{repository.growth}% this month</span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={repository.starGrowth}>
                <defs>
                  <linearGradient id="colorStars" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" fontSize={12} stroke="#888888" />
                <YAxis fontSize={12} stroke="#888888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", fontSize: "12px", color: "#fff" }}
                />
                <Area type="monotone" dataKey="stars" stroke="#f59e0b" fillOpacity={1} fill="url(#colorStars)" name="Total Stars" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Contributor Activity Chart */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base">Weekly Commit Distribution</h3>
            <span className="text-xs text-muted-foreground">Active branch activity</span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={repository.contributorActivity}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="week" fontSize={12} stroke="#888888" />
                <YAxis fontSize={12} stroke="#888888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", fontSize: "12px", color: "#fff" }}
                />
                <Bar dataKey="commits" fill="#6366f1" radius={[4, 4, 0, 0]} name="Weekly Commits" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
