import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Star,
  Search,
  BarChart3,
  Cpu,
  Layers,
  Flame,
  Award,
  Code2
} from "lucide-react"
import { developers, repositories, platformStats } from "../data/mockData"
import type { Developer, Repository } from "../data/mockData"
import { useShareCard } from "../context/ShareCardContext"

export default function Home() {
  const { openShareCard } = useShareCard()
  const [heroSearch, setHeroSearch] = useState("")
  const navigate = useNavigate()

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (heroSearch.trim()) {
      navigate(`/rankings?q=${encodeURIComponent(heroSearch.trim())}`)
    } else {
      navigate("/rankings")
    }
  }

  const topDevs = developers.slice(0, 6)
  const topRepos = repositories.slice(0, 4)

  return (
    <div className="space-y-20 py-8 sm:py-16">
      {/* 1. HERO SECTION */}
      <section className="container mx-auto px-4 text-center space-y-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Open Source Intelligence Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
          Find the developers and projects{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500 animate-gradient">
            shaping open source.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
          GitRank turns GitHub activity into meaningful rankings, trends and developer insights. Discover the top builders, compare ecosystems, and celebrate code impact.
        </p>

        {/* Hero Interactive Search Box */}
        <form
          onSubmit={handleHeroSearch}
          className="relative max-w-xl mx-auto pt-2"
        >
          <div className="relative flex items-center shadow-lg shadow-primary/5 rounded-2xl bg-card border border-border overflow-hidden focus-within:ring-2 focus-within:ring-primary">
            <Search className="w-5 h-5 text-muted-foreground ml-4 shrink-0" />
            <input
              type="text"
              placeholder="Search developers, repositories or organizations..."
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              className="w-full py-4 pl-3 pr-24 bg-transparent text-sm focus:outline-none text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="absolute right-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition shadow-xs"
            >
              Explore
            </button>
          </div>
        </form>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/rankings"
            className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:bg-primary/90 transition"
          >
            Explore Rankings <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/trending"
            className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-border bg-card hover:bg-accent text-foreground font-bold text-sm transition"
          >
            <Flame className="w-4 h-4 text-rose-500" /> Discover Trending
          </Link>
        </div>
      </section>

      {/* 2. PLATFORM STATISTICS */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-xs">
          <div className="text-center p-4">
            <div className="text-3xl sm:text-4xl font-black text-primary">{platformStats.totalDevelopers}</div>
            <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">Developers Indexed</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl sm:text-4xl font-black text-foreground">{platformStats.totalRepositories}</div>
            <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">Repositories Tracked</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl sm:text-4xl font-black text-sky-500">{platformStats.totalCountries}</div>
            <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">Countries Represented</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl sm:text-4xl font-black text-indigo-400">{platformStats.totalLanguages}+</div>
            <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">Programming Languages</div>
          </div>
        </div>
      </section>

      {/* 3. LIVE RANKING PREVIEW */}
      <section className="container mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h2 className="text-2xl font-black tracking-tight">Live Ranking Preview</h2>
            </div>
            <p className="text-xs text-muted-foreground">Top global open source builders by overall GitRank rating</p>
          </div>
          <Link
            to="/rankings"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            View Complete Leaderboard ({developers.length}+) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topDevs.map((dev: Developer) => (
            <div
              key={dev.id}
              className="p-5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-200 shadow-xs flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-muted text-foreground flex items-center justify-center font-black text-xs">
                      #{dev.rank}
                    </span>
                    <img
                      src={dev.avatar}
                      alt={dev.name}
                      className="w-11 h-11 rounded-xl object-cover border border-border shadow-xs"
                    />
                    <div>
                      <Link
                        to={`/developer/${dev.username}`}
                        className="font-bold text-sm text-foreground hover:text-primary transition flex items-center gap-1"
                      >
                        {dev.name} {dev.flag}
                      </Link>
                      <span className="text-xs text-muted-foreground font-mono">@{dev.username}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold">Score</span>
                    <div className="text-lg font-black text-primary">{dev.gitRankScore}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-muted/40 border border-border/60 text-xs mb-3">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5 text-primary" /> {dev.primaryLanguage}
                  </span>
                  <span className="font-semibold text-muted-foreground">
                    ⭐ {(dev.stars / 1000).toFixed(0)}k stars
                  </span>
                  <span className="text-emerald-500 font-bold flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> +{dev.growth}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => openShareCard(dev)}
                  className="py-2 px-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Share Card
                </button>
                <Link
                  to={`/developer/${dev.username}`}
                  className="py-2 px-3 rounded-xl bg-muted hover:bg-accent text-foreground text-xs font-semibold transition text-center"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TRENDING PROJECTS SECTION */}
      <section className="container mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500" />
              <h2 className="text-2xl font-black tracking-tight">Trending Projects</h2>
            </div>
            <p className="text-xs text-muted-foreground">Highest star velocity and developer interest this week</p>
          </div>
          <Link
            to="/trending"
            className="text-xs font-bold text-primary hover:underline"
          >
            Explore All Trending →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topRepos.map((repo: Repository) => (
            <div
              key={repo.id}
              className="p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                    {repo.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-500">
                    +{repo.growth}%
                  </span>
                </div>

                <Link
                  to={`/repository/${repo.owner}/${repo.name}`}
                  className="font-bold text-base text-foreground hover:text-primary transition block mb-1"
                >
                  {repo.owner}/{repo.name}
                </Link>

                <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border text-xs text-muted-foreground font-medium">
                <span className="flex items-center gap-1 font-semibold text-foreground">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {(repo.stars / 1000).toFixed(0)}k
                </span>
                <span>{repo.language}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HOW GITRANK WORKS */}
      <section className="container mx-auto px-4 py-8">
        <div className="p-8 sm:p-12 rounded-3xl border border-border bg-muted/20 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">How GitRank Works</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              A transparent, multi-dimensional ranking algorithm designed for the modern open source era.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Analyze GitHub Signals",
                desc: "We ingest commits, PRs, issues solved, star velocity, and code reviews across millions of repositories.",
                icon: Cpu,
              },
              {
                step: "02",
                title: "Calculate Ranking Score",
                desc: "Our weighted algorithm calculates a normalized GitRank score from 0 to 100 reflecting true developer impact.",
                icon: BarChart3,
              },
              {
                step: "03",
                title: "Compare Performance",
                desc: "Side-by-side analytics allow team leads, recruiters, and enthusiasts to compare builder skillsets.",
                icon: Layers,
              },
              {
                step: "04",
                title: "Discover Rising Talent",
                desc: "Highlight breakthrough builders before they hit mainstream radars with collectible achievement cards.",
                icon: Sparkles,
              },
            ].map((st) => {
              const Icon = st.icon
              return (
                <div key={st.step} className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-muted-foreground">{st.step}</span>
                  </div>
                  <h3 className="font-bold text-base text-foreground">{st.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{st.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="container mx-auto px-4">
        <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-secondary/10 p-8 sm:p-12 text-center space-y-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to discover the next open-source leader?
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Join thousands of developers exploring GitHub rankings, comparing top open source contributors, and generating collectible profile cards.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/rankings"
              className="py-3 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:bg-primary/90 transition"
            >
              Explore Global Leaderboard
            </Link>
            <Link
              to="/compare"
              className="py-3 px-6 rounded-xl border border-border bg-card hover:bg-accent font-bold text-sm transition"
            >
              Compare Builders
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
