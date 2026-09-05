import { useState } from "react"
import { Link } from "react-router-dom"
import { Globe, TrendingUp, ChevronRight, Search } from "lucide-react"
import { countries } from "../data/mockData"

export default function Countries() {
  const [selectedRegion, setSelectedRegion] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const regions = ["All", "North America", "Europe", "Asia", "South America"]

  const filteredCountries = countries.filter((c) => {
    const matchesRegion = selectedRegion === "All" || c.region === selectedRegion
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRegion && matchesSearch
  })

  return (
    <div className="container mx-auto px-4 py-10 space-y-10">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-500 border border-sky-500/20">
          <Globe className="w-3.5 h-3.5" /> Worldwide Developer Census
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          Global Developer Rankings
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Compare open source productivity, developer community density, and top ranked builders across nations.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border pb-4">
        {/* Region Pills */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto text-xs font-semibold">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition ${
                selectedRegion === r
                  ? "bg-primary text-primary-foreground font-bold shadow-xs"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-card border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* COUNTRIES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCountries.map((c) => (
          <div
            key={c.code}
            className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <h3 className="font-bold text-lg">{c.name}</h3>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{c.region}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +{c.growth}%
                </span>
              </div>

              <div className="space-y-2 py-3 border-y border-border text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Developers</span>
                  <span className="font-bold text-foreground">{(c.developerCount / 1000).toFixed(0)}k</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Avg Rating</span>
                  <span className="font-black text-primary">{c.avgScore}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Top Builder</span>
                  <span className="font-semibold text-foreground truncate max-w-[140px]">{c.topDeveloper}</span>
                </div>
              </div>
            </div>

            <Link
              to={`/rankings?country=${c.code}`}
              className="mt-4 inline-flex items-center justify-between w-full py-2 px-3 rounded-xl bg-muted hover:bg-accent text-xs font-bold transition text-primary"
            >
              <span>View {c.name} Builders</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
