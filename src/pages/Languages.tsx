import { Link } from "react-router-dom"
import { Code2, TrendingUp, ChevronRight } from "lucide-react"
import { languages } from "../data/mockData"

export default function Languages() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-10">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
          <Code2 className="w-3.5 h-3.5" /> Language Ecosystem Analytics
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          Developer Rankings by Language
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Explore language popularity indexes, developer density, average algorithmic scores, and ecosystem pioneers.
        </p>
      </div>

      {/* LANGUAGES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-200 shadow-xs flex flex-col justify-between group relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 w-1.5 h-full"
              style={{ backgroundColor: lang.color }}
            />

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <h3 className="font-bold text-xl">{lang.name}</h3>
                </div>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +{lang.growth}%
                </span>
              </div>

              <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                {lang.description}
              </p>

              <div className="space-y-2 py-3 border-y border-border text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Developers</span>
                  <span className="font-bold text-foreground">{(lang.developerCount / 1000).toFixed(0)}k</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Repositories</span>
                  <span className="font-bold text-foreground">{(lang.repositoryCount / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Avg GitRank Rating</span>
                  <span className="font-black text-primary">{lang.avgScore}</span>
                </div>
              </div>

              <div className="mt-3 text-[11px] text-muted-foreground">
                <span className="font-semibold block text-slate-400">Pioneer:</span>
                <span className="text-foreground font-medium truncate block">{lang.topDeveloper}</span>
              </div>
            </div>

            <Link
              to={`/rankings?lang=${lang.name}`}
              className="mt-5 inline-flex items-center justify-between w-full py-2 px-3 rounded-xl bg-muted hover:bg-accent text-xs font-bold transition text-primary"
            >
              <span>Explore {lang.name} Rankings</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
