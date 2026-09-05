import { Link } from "react-router-dom"
import { Building2, CheckCircle, Globe } from "lucide-react"
import { organizations } from "../data/mockData"

export default function Organizations() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-10">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-500 border border-violet-500/20">
          <Building2 className="w-3.5 h-3.5" /> Open Source Entities
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          Top Open Source Organizations
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Rankings of foundations, corporate labs, and open source collectives driving global software infrastructure.
        </p>
      </div>

      {/* ORGANIZATIONS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <div
            key={org.id}
            className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={org.avatar}
                    alt={org.name}
                    className="w-14 h-14 rounded-2xl border border-border object-cover shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-lg">{org.name}</h3>
                      {org.verified && <CheckCircle className="w-4 h-4 text-sky-500" />}
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">@{org.login}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">Rating</span>
                  <div className="text-xl font-black text-primary">{org.gitRankScore}</div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                {org.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {org.topLanguages.map((lang) => (
                  <span
                    key={lang}
                    className="px-2 py-0.5 text-[10px] font-semibold rounded bg-muted text-muted-foreground"
                  >
                    {lang}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-border text-center text-xs">
                <div>
                  <span className="text-muted-foreground text-[10px] block">Stars</span>
                  <span className="font-bold">{(org.starsCount / 1000).toFixed(0)}k</span>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px] block">Repositories</span>
                  <span className="font-bold">{org.repositoriesCount}</span>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px] block">Members</span>
                  <span className="font-bold">{org.membersCount}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 text-xs">
              <a
                href={org.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition"
              >
                <Globe className="w-3.5 h-3.5" /> Official Site
              </a>
              <Link
                to={`/rankings?org=${org.login}`}
                className="font-bold text-primary hover:underline"
              >
                View Repositories →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
