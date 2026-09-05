import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Flame,
  Star,
  GitFork,
  TrendingUp,
  Search
} from "lucide-react"
import { repositories } from "../data/mockData"

export default function Trending() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("This Week")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [starredRepos, setStarredRepos] = useState<Record<string, boolean>>({})

  const categories = ["All", "AI", "Web", "DevTools", "Cloud", "Mobile", "Data", "Security", "Blockchain"]

  const filteredRepos = repositories.filter((repo) => {
    const matchesCategory =
      selectedCategory === "All" || repo.category === selectedCategory
    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleStar = (id: string) => {
    setStarredRepos((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-10">
      {/* HERO HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20">
          <Flame className="w-3.5 h-3.5" /> Trending Velocity
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          Trending Open Source
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Discover the fastest-growing repositories, breakthrough AI models, and essential developer utilities gaining explosive stars today.
        </p>
      </div>

      {/* FILTER CONTROLS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border pb-4">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 text-xs font-semibold">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Timeframe selector */}
          <div className="flex items-center gap-1 bg-muted p-1 rounded-lg text-xs">
            {["Today", "This Week", "This Month"].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTimeframe(t)}
                className={`px-3 py-1.5 rounded-md font-medium transition ${
                  selectedTimeframe === t
                    ? "bg-background text-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search trending projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* REPOSITORIES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredRepos.map((repo, index) => {
          const isStarred = !!starredRepos[repo.id]

          return (
            <div
              key={repo.id}
              className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-200 shadow-xs flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Rank & Trend Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                      #{index + 1}
                    </span>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                      {repo.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      <TrendingUp className="w-3 h-3" /> +{repo.growth}%
                    </span>
                    <button
                      onClick={() => toggleStar(repo.id)}
                      className={`p-1.5 rounded-lg border text-xs font-medium transition ${
                        isStarred
                          ? "bg-amber-500/20 text-amber-500 border-amber-500/30"
                          : "border-border bg-muted hover:bg-accent text-muted-foreground"
                      }`}
                      title="Star repository"
                    >
                      <Star className={`w-3.5 h-3.5 ${isStarred ? "fill-amber-400" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Repo Title */}
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={repo.ownerAvatar}
                    alt={repo.owner}
                    className="w-6 h-6 rounded-md object-cover border border-border"
                  />
                  <Link
                    to={`/repository/${repo.owner}/${repo.name}`}
                    className="font-bold text-lg text-foreground hover:text-primary transition"
                  >
                    {repo.owner}/{repo.name}
                  </Link>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                  {repo.description}
                </p>
              </div>

              {/* Bottom Metadata */}
              <div className="flex items-center justify-between pt-3 border-t border-border text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 font-semibold text-foreground">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    {repo.stars.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" />
                    {repo.forks.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    {repo.language}
                  </span>
                </div>

                <Link
                  to={`/repository/${repo.owner}/${repo.name}`}
                  className="font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  Analytics →
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
