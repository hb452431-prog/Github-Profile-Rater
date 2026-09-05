import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"
import {
  Sparkles,
  Award,
  Star,
  Users,
  Flame,
  Package,
  MapPin,
  Building,
  Globe,
  GitBranch,
  ShieldCheck,
  TrendingUp,
  Share2,
  Bookmark,
  Check,
  Code2
} from "lucide-react"
import { developers } from "../data/mockData"
import { useShareCard } from "../context/ShareCardContext"
import { getDeveloperArchetype, getDeveloperRankBadge } from "../utils/archetype"

export default function DeveloperProfile() {
  const { username } = useParams<{ username: string }>()
  const { openShareCard } = useShareCard()

  const [isFollowing, setIsFollowing] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const developer =
    developers.find((d) => d.username.toLowerCase() === username?.toLowerCase()) ||
    developers[0]

  const archetype = getDeveloperArchetype(developer)
  const rankBadge = getDeveloperRankBadge(developer.rank)

  const handleShareProfile = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      {/* DEVELOPER HERO HEADER */}
      <div className="relative rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm overflow-hidden">
        {/* Background Ambient Gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative">
              <img
                src={developer.avatar}
                alt={developer.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-border object-cover shadow-md"
              />
              <span className="absolute -bottom-2 -right-1 text-base bg-card rounded-full px-1.5 py-0.5 border border-border shadow-xs">
                {developer.flag}
              </span>
            </div>

            {/* Info */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{developer.name}</h1>
                <ShieldCheck className="w-5 h-5 text-sky-500" />
                <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border bg-gradient-to-r ${rankBadge.bg} ${rankBadge.color}`}>
                  {rankBadge.label}
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground font-mono">
                <span>@{developer.username}</span>
                <span>•</span>
                <span className="text-primary font-semibold">{developer.level}</span>
              </div>

              <p className="text-sm text-muted-foreground max-w-xl">
                {developer.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                {developer.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" /> {developer.location}
                  </span>
                )}
                {developer.company && (
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" /> {developer.company}
                  </span>
                )}
                {developer.website && (
                  <a
                    href={developer.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 hover:text-primary transition"
                  >
                    <Globe className="w-3.5 h-3.5" /> {developer.website.replace("https://", "")}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap md:flex-col gap-2.5 w-full md:w-auto">
            <button
              onClick={() => openShareCard(developer)}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition"
            >
              <Sparkles className="w-4 h-4" /> Generate Share Card
            </button>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Link
                to={`/compare?dev1=${developer.username}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-border bg-muted hover:bg-accent text-xs font-semibold transition"
              >
                <GitBranch className="w-3.5 h-3.5" /> Compare
              </Link>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-semibold transition ${
                  isFollowing
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                    : "border-border bg-muted hover:bg-accent"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" /> {isFollowing ? "Tracked" : "Track"}
              </button>
              <button
                onClick={handleShareProfile}
                className="p-2 rounded-lg border border-border bg-muted hover:bg-accent transition"
                title="Copy Profile Link"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* KEY STATS BAR */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-8 pt-6 border-t border-border">
          <div className="p-3.5 rounded-xl bg-muted/50 border border-border/80">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">GitRank Score</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-primary">{developer.gitRankScore}</span>
              <span className="text-[11px] text-muted-foreground">/ 100</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-muted/50 border border-border/80">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400" /> Stars Earned
            </span>
            <div className="text-xl font-bold mt-0.5">
              {developer.stars.toLocaleString()}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-muted/50 border border-border/80">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block flex items-center gap-1">
              <Users className="w-3 h-3 text-sky-400" /> Followers
            </span>
            <div className="text-xl font-bold mt-0.5">
              {developer.followers.toLocaleString()}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-muted/50 border border-border/80">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block flex items-center gap-1">
              <Flame className="w-3 h-3 text-rose-400" /> Commits
            </span>
            <div className="text-xl font-bold mt-0.5">
              {developer.contributions.toLocaleString()}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-muted/50 border border-border/80">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block flex items-center gap-1">
              <Package className="w-3 h-3 text-emerald-400" /> Repositories
            </span>
            <div className="text-xl font-bold mt-0.5">
              {developer.repositories}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-muted/50 border border-border/80">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-indigo-400" /> Growth
            </span>
            <div className="text-xl font-bold text-emerald-500 mt-0.5">
              +{developer.growth}%
            </div>
          </div>
        </div>
      </div>

      {/* VISUAL ANALYTICS & CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Contribution Activity */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base">Monthly Activity Signals</h3>
              <p className="text-xs text-muted-foreground">Commits, PRs, and code review volumes</p>
            </div>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
              2026 Season
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={developer.contributionActivity}>
                <defs>
                  <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" fontSize={12} stroke="#888888" />
                <YAxis fontSize={12} stroke="#888888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", fontSize: "12px", color: "#fff" }}
                />
                <Area type="monotone" dataKey="commits" stroke="#6366f1" fillOpacity={1} fill="url(#colorCommits)" name="Commits" />
                <Area type="monotone" dataKey="prs" stroke="#38bdf8" fillOpacity={0.2} fill="#38bdf8" name="PRs Merged" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Ranking Score History */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base">GitRank Rating Progression</h3>
              <p className="text-xs text-muted-foreground">6-month score momentum</p>
            </div>
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Consistent Top 1%
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={developer.rankingHistory}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" fontSize={12} stroke="#888888" />
                <YAxis domain={['dataMin - 1', 'dataMax + 0.5']} fontSize={12} stroke="#888888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", fontSize: "12px", color: "#fff" }}
                />
                <Line type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: "#0ea5e9" }} name="GitRank Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TOP REPOSITORIES & ACHIEVEMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Repositories */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Featured Repositories</h3>
            <span className="text-xs text-muted-foreground">Most impactful projects</span>
          </div>

          <div className="space-y-3">
            {developer.topRepos.map((repo, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-base text-foreground flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary" />
                      {developer.username}/{repo.name}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                      <Star className="w-3 h-3 fill-amber-400" /> {repo.stars.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {repo.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/60">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Code2 className="w-3.5 h-3.5 text-primary" /> {repo.language}
                  </span>
                  <span>{repo.forks.toLocaleString()} forks</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges & Achievements */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Verified Achievements</h3>
          <div className="space-y-3">
            {developer.achievements.map((ach, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-border bg-card flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-foreground">{ach.title}</h4>
                    <span className="text-[10px] text-muted-foreground font-mono">{ach.date}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {ach.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Archetype Card Feature banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-indigo-950/60 border border-indigo-500/30 text-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Developer Archetype</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-sky-300">
                {archetype}
              </div>
              <p className="text-xs text-slate-400">
                Calculated dynamically from over 15 GitHub activity markers and code velocity.
              </p>
              <button
                onClick={() => openShareCard(developer)}
                className="w-full py-2 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Share {developer.name}&apos;s Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
