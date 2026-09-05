import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Package, X, Zap, Sparkles } from "lucide-react"
import { developers, repositories, organizations } from "../../data/mockData"
import { extractGithubUsername } from "../../services/githubService"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        if (isOpen) onClose()
      }
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const trimmed = query.trim().toLowerCase()
  const cleanedHandle = query.trim() ? extractGithubUsername(query.trim()) : ""

  const matchedDevs = developers
    .filter((d) => d.name.toLowerCase().includes(trimmed) || d.username.toLowerCase().includes(trimmed))
    .slice(0, 4)

  const matchedRepos = repositories
    .filter((r) => r.name.toLowerCase().includes(trimmed) || r.owner.toLowerCase().includes(trimmed))
    .slice(0, 3)

  const matchedOrgs = organizations
    .filter((o) => o.name.toLowerCase().includes(trimmed) || o.login.toLowerCase().includes(trimmed))
    .slice(0, 2)

  const handleSelect = (url: string) => {
    navigate(url)
    onClose()
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (cleanedHandle) {
      handleSelect(`/analyze/${cleanedHandle}`)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl rounded-2xl bg-card border border-border shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <form onSubmit={handleFormSubmit} className="flex items-center px-4 py-3.5 border-b border-border gap-3">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            autoFocus
            type="text"
            placeholder="Search developers, repos, orgs, or enter GitHub handle..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold text-muted-foreground bg-muted border border-border rounded">
            ESC
          </kbd>
        </form>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Direct Profile Analysis Trigger */}
          {query.trim().length > 0 && (
            <div className="p-1">
              <button
                onClick={() => handleSelect(`/analyze/${cleanedHandle}`)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-primary/10 border border-primary/25 hover:bg-primary/20 transition text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground group-hover:text-primary transition flex items-center gap-1.5">
                      Analyze profile @{cleanedHandle}
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      Calculate live rating score, rank card & improvement tips
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-primary px-2.5 py-1 rounded-lg bg-primary/20">
                  Analyze →
                </span>
              </button>
            </div>
          )}

          {/* If no query, show quick suggestions */}
          {!query && (
            <div className="space-y-3 p-2">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {["Linus Torvalds", "Next.js", "Anthony Fu", "TypeScript", "Vercel", "Rust", "Evan You"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-lg bg-muted hover:bg-accent text-xs font-medium text-foreground transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Developers Match */}
          {matchedDevs.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-2 block mb-1.5">
                Developers
              </span>
              <div className="space-y-1">
                {matchedDevs.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleSelect(`/developer/${d.username}`)}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-muted/70 transition text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={d.avatar} alt={d.name} className="w-7 h-7 rounded-lg object-cover" />
                      <div>
                        <div className="text-xs font-bold text-foreground group-hover:text-primary transition flex items-center gap-1">
                          {d.name} <span className="text-muted-foreground font-normal">@{d.username}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">{d.primaryLanguage} • Rank #{d.rank}</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-primary">{d.gitRankScore}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Repositories Match */}
          {matchedRepos.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-2 block mb-1.5">
                Repositories
              </span>
              <div className="space-y-1">
                {matchedRepos.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleSelect(`/repository/${r.owner}/${r.name}`)}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-muted/70 transition text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Package className="w-4 h-4 text-primary" />
                      <div>
                        <span className="text-xs font-bold text-foreground group-hover:text-primary transition">
                          {r.owner}/{r.name}
                        </span>
                        <p className="text-[10px] text-muted-foreground line-clamp-1">{r.description}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-muted-foreground">⭐ {(r.stars / 1000).toFixed(0)}k</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Organizations Match */}
          {matchedOrgs.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-2 block mb-1.5">
                Organizations
              </span>
              <div className="space-y-1">
                {matchedOrgs.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => handleSelect(`/organizations`)}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-muted/70 transition text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={o.avatar} alt={o.name} className="w-6 h-6 rounded-md object-cover" />
                      <span className="text-xs font-bold text-foreground group-hover:text-primary transition">
                        {o.name}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-primary">{o.gitRankScore} score</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && matchedDevs.length === 0 && matchedRepos.length === 0 && matchedOrgs.length === 0 && (
            <div className="p-8 text-center text-xs text-muted-foreground">
              No direct matches found for &quot;{query}&quot;. Try searching for a developer or technology.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-2.5 bg-muted/40 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground px-4">
          <span>Navigate with mouse or keyboard</span>
          <span className="font-mono text-[10px]">GitRank Search v2</span>
        </div>
      </div>
    </div>
  )
}
