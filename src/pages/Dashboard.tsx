import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Sparkles,
  TrendingUp,
  Bookmark,
  Star,
  Trash2,
  Plus
} from "lucide-react"
import { developers, repositories } from "../data/mockData"
import type { Developer } from "../data/mockData"
import { useShareCard } from "../context/ShareCardContext"
import { getDeveloperArchetype } from "../utils/archetype"

export default function Dashboard() {
  const { openShareCard } = useShareCard()

  const [watchlist, setWatchlist] = useState<Developer[]>([])
  const [currentUser] = useState<Developer>(developers[1]) // Dan Abramov or demo user

  useEffect(() => {
    const saved = localStorage.getItem("gitrank_watchlist")
    if (saved) {
      try {
        const ids = JSON.parse(saved)
        const found = developers.filter((d) => ids.includes(d.id))
        setWatchlist(found)
      } catch {
        setWatchlist(developers.slice(0, 4))
      }
    } else {
      // Default sample watchlist
      setWatchlist(developers.slice(0, 4))
    }
  }, [])

  const removeFromWatchlist = (id: string) => {
    const next = watchlist.filter((d) => d.id !== id)
    setWatchlist(next)
    localStorage.setItem("gitrank_watchlist", JSON.stringify(next.map((d) => d.id)))
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      {/* WELCOME BANNER */}
      <div className="rounded-3xl border border-border bg-gradient-to-r from-card via-card to-primary/5 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-primary object-cover shadow"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Welcome back, {currentUser.name}!
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground font-mono mt-0.5">
              Ranked <strong className="text-primary font-bold">#{currentUser.rank}</strong> Worldwide • Top {currentUser.percentile}
            </p>
            <span className="inline-block mt-1 px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-primary/10 text-primary border border-primary/20">
              {getDeveloperArchetype(currentUser)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => openShareCard(currentUser)}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white font-bold text-xs shadow-md transition"
          >
            <Sparkles className="w-3.5 h-3.5" /> Share My Ranking Card
          </button>
          <Link
            to={`/developer/${currentUser.username}`}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-border bg-muted hover:bg-accent text-xs font-semibold transition"
          >
            Public Profile
          </Link>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-border bg-card shadow-xs">
          <span className="text-xs text-muted-foreground font-semibold">Your Score</span>
          <div className="text-3xl font-black text-primary mt-1">{currentUser.gitRankScore}</div>
          <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +{currentUser.growth}% this month
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card shadow-xs">
          <span className="text-xs text-muted-foreground font-semibold">Global Rank</span>
          <div className="text-3xl font-black text-foreground mt-1">#{currentUser.rank}</div>
          <span className="text-[11px] text-muted-foreground mt-1 block">
            Previous: #{currentUser.previousRank}
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card shadow-xs">
          <span className="text-xs text-muted-foreground font-semibold">Tracked Builders</span>
          <div className="text-3xl font-black text-foreground mt-1">{watchlist.length}</div>
          <span className="text-[11px] text-muted-foreground mt-1 block">
            In your active watchlist
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card shadow-xs">
          <span className="text-xs text-muted-foreground font-semibold">Active Streak</span>
          <div className="text-3xl font-black text-amber-500 mt-1">{currentUser.streak} days</div>
          <span className="text-[11px] text-muted-foreground mt-1 block">
            Consistent contributions
          </span>
        </div>
      </div>

      {/* WATCHLIST SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold tracking-tight">Your Developer Watchlist</h2>
          </div>
          <Link to="/rankings" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Track More Builders
          </Link>
        </div>

        {watchlist.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-border bg-muted/20 space-y-3">
            <Bookmark className="w-8 h-8 text-muted-foreground mx-auto" />
            <h3 className="font-bold text-base">Your Watchlist is Empty</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Follow open source developers from rankings and profile pages to monitor their ranking momentum here.
            </p>
            <Link
              to="/rankings"
              className="inline-flex items-center gap-1 py-2 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs"
            >
              Explore Rankings
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {watchlist.map((dev) => (
              <div
                key={dev.id}
                className="p-5 rounded-2xl border border-border bg-card shadow-xs flex flex-col justify-between hover:border-primary/40 transition group"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <img
                      src={dev.avatar}
                      alt={dev.name}
                      className="w-12 h-12 rounded-xl object-cover border border-border"
                    />
                    <button
                      onClick={() => removeFromWatchlist(dev.id)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition"
                      title="Remove from watchlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <Link
                    to={`/developer/${dev.username}`}
                    className="font-bold text-base hover:text-primary transition block"
                  >
                    {dev.name}
                  </Link>
                  <p className="text-xs text-muted-foreground font-mono">@{dev.username} {dev.flag}</p>

                  <div className="flex items-center justify-between py-3 my-3 border-y border-border text-xs">
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Rating</span>
                      <span className="font-black text-primary">{dev.gitRankScore}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Rank</span>
                      <span className="font-bold">#{dev.rank}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Stars</span>
                      <span className="font-semibold">{(dev.stars / 1000).toFixed(0)}k</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openShareCard(dev)}
                  className="w-full py-2 px-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Share Card
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RECOMMENDED TRENDING PROJECTS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">Recommended for You</h2>
          <Link to="/trending" className="text-xs font-bold text-primary hover:underline">
            View All Trending →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repositories.slice(0, 2).map((repo) => (
            <div key={repo.id} className="p-5 rounded-2xl border border-border bg-card shadow-xs flex items-center justify-between">
              <div>
                <Link to={`/repository/${repo.owner}/${repo.name}`} className="font-bold text-base hover:text-primary transition">
                  {repo.owner}/{repo.name}
                </Link>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{repo.description}</p>
              </div>
              <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-lg shrink-0 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> {(repo.stars / 1000).toFixed(0)}k
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
