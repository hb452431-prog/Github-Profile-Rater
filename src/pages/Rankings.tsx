import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import {
  Search,
  Sparkles,
  TrendingUp,
  Star,
  Award,
  Filter,
  Share2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Globe,
  Package
} from "lucide-react"
import { developers, repositories, organizations } from "../data/mockData"
import { useShareCard } from "../context/ShareCardContext"
import { getDeveloperArchetype } from "../utils/archetype"

export default function Rankings() {
  const { openShareCard } = useShareCard()

  const [activeTab, setActiveTab] = useState<"developers" | "repositories" | "organizations">("developers")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("All")
  const [selectedCountry, setSelectedCountry] = useState("All")
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("All Time")
  const [sortBy, setSortBy] = useState<"score" | "stars" | "followers" | "contributions" | "growth">("score")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filtered & Sorted developers
  const filteredDevelopers = useMemo(() => {
    return developers
      .filter((dev) => {
        const matchesSearch =
          dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dev.username.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesLanguage =
          selectedLanguage === "All" || dev.primaryLanguage === selectedLanguage
        const matchesCountry =
          selectedCountry === "All" || dev.country === selectedCountry
        return matchesSearch && matchesLanguage && matchesCountry
      })
      .sort((a, b) => {
        if (sortBy === "score") return b.gitRankScore - a.gitRankScore
        if (sortBy === "stars") return b.stars - a.stars
        if (sortBy === "followers") return b.followers - a.followers
        if (sortBy === "contributions") return b.contributions - a.contributions
        if (sortBy === "growth") return b.growth - a.growth
        return 0
      })
  }, [searchQuery, selectedLanguage, selectedCountry, sortBy])

  const top3 = developers.slice(0, 3)
  const paginatedDevelopers = filteredDevelopers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  const totalPages = Math.ceil(filteredDevelopers.length / itemsPerPage)

  const languages = ["All", "TypeScript", "JavaScript", "C", "Go", "Rust", "Zig", "Ruby"]
  const countriesList = ["All", "US", "JP", "SG", "GB", "NO", "DK", "IT", "FR", "CA", "AR"]

  return (
    <div className="container mx-auto px-4 py-10 space-y-12">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
          <Award className="w-3.5 h-3.5" /> 2026 Global Power Rankings
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Global Open Source Rankings
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Real-time algorithmic scoring of developers, repositories, and organizations based on contributions, community impact, code growth, and ecosystem influence.
        </p>
      </div>

      {/* PODIUM SHOWCASE: THIS WEEK'S TOP 3 BUILDERS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold tracking-tight">This Week&apos;s Top Builders</h2>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:inline">Updated hourly based on global commit signals</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4">
          {/* #2 Silver (Dan or Anthony) */}
          {top3[1] && (
            <div className="order-2 md:order-1 rounded-2xl p-6 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-700/80 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-xl bg-slate-700/60 text-slate-200 text-xs font-black">
                🥈 #2 SILVER
              </div>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={top3[1].avatar}
                  alt={top3[1].name}
                  className="w-16 h-16 rounded-xl border-2 border-slate-500 object-cover shadow"
                />
                <div>
                  <h3 className="font-bold text-lg text-white">{top3[1].name}</h3>
                  <p className="text-xs text-slate-400 font-mono">@{top3[1].username} {top3[1].flag}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-800 text-slate-300">
                    {getDeveloperArchetype(top3[1])}
                  </span>
                </div>
              </div>
              <div className="py-3 px-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">GitRank Score</span>
                  <div className="text-2xl font-black text-cyan-400">{top3[1].gitRankScore}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Stars</span>
                  <div className="text-sm font-bold text-slate-200">{(top3[1].stars / 1000).toFixed(0)}k</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => openShareCard(top3[1])}
                  className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 border border-primary/40 text-xs font-bold transition"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share Card
                </button>
                <Link
                  to={`/developer/${top3[1].username}`}
                  className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                >
                  Profile
                </Link>
              </div>
            </div>
          )}

          {/* #1 Gold (Linus Torvalds) - Centerpiece */}
          {top3[0] && (
            <div className="order-1 md:order-2 rounded-2xl p-7 bg-gradient-to-b from-[#1c1809] via-slate-950 to-slate-950 border-2 border-amber-500/80 shadow-[0_0_40px_rgba(245,158,11,0.25)] relative overflow-hidden flex flex-col justify-between -mt-4 md:-mt-8">
              <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs font-black tracking-wider shadow">
                👑 #1 GOLD CHAMPION
              </div>
              <div className="flex items-center gap-4 mb-5 mt-2">
                <div className="relative">
                  <img
                    src={top3[0].avatar}
                    alt={top3[0].name}
                    className="w-20 h-20 rounded-2xl border-2 border-amber-400 object-cover shadow-xl"
                  />
                  <span className="absolute -bottom-2 -right-1 text-sm bg-slate-900 rounded-full px-1 border border-amber-500/50">
                    {top3[0].flag}
                  </span>
                </div>
                <div>
                  <h3 className="font-black text-xl text-white">{top3[0].name}</h3>
                  <p className="text-xs text-amber-300 font-mono">@{top3[0].username}</p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 text-[10px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {getDeveloperArchetype(top3[0])}
                  </span>
                </div>
              </div>
              <div className="py-3.5 px-4 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between mb-5">
                <div>
                  <span className="text-[10px] text-amber-300/80 uppercase font-bold tracking-wider">GitRank Rating</span>
                  <div className="text-3xl font-black text-amber-400">{top3[0].gitRankScore}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-amber-300/80 uppercase font-bold tracking-wider">Total Commits</span>
                  <div className="text-sm font-bold text-white">{top3[0].contributions.toLocaleString()}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => openShareCard(top3[0])}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-slate-950 text-xs font-black shadow-lg transition"
                >
                  <Sparkles className="w-4 h-4" /> Share Card
                </button>
                <Link
                  to={`/developer/${top3[0].username}`}
                  className="flex items-center justify-center gap-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
                >
                  Full Profile
                </Link>
              </div>
            </div>
          )}

          {/* #3 Bronze (Evan You) */}
          {top3[2] && (
            <div className="order-3 rounded-2xl p-6 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-amber-800/60 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-xl bg-amber-800/60 text-amber-200 text-xs font-black">
                🥉 #3 BRONZE
              </div>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={top3[2].avatar}
                  alt={top3[2].name}
                  className="w-16 h-16 rounded-xl border-2 border-amber-700 object-cover shadow"
                />
                <div>
                  <h3 className="font-bold text-lg text-white">{top3[2].name}</h3>
                  <p className="text-xs text-slate-400 font-mono">@{top3[2].username} {top3[2].flag}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-800 text-slate-300">
                    {getDeveloperArchetype(top3[2])}
                  </span>
                </div>
              </div>
              <div className="py-3 px-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">GitRank Score</span>
                  <div className="text-2xl font-black text-amber-500">{top3[2].gitRankScore}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Stars</span>
                  <div className="text-sm font-bold text-slate-200">{(top3[2].stars / 1000).toFixed(0)}k</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => openShareCard(top3[2])}
                  className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 border border-primary/40 text-xs font-bold transition"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share Card
                </button>
                <Link
                  to={`/developer/${top3[2].username}`}
                  className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                >
                  Profile
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DASHBOARD TABS & CONTROLS */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border pb-4">
          {/* Main Category Tabs */}
          <div className="flex items-center p-1 bg-muted rounded-xl text-sm font-semibold w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("developers")}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-lg transition ${
                activeTab === "developers"
                  ? "bg-background text-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Developers ({developers.length})
            </button>
            <button
              onClick={() => setActiveTab("repositories")}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-lg transition ${
                activeTab === "repositories"
                  ? "bg-background text-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Repositories ({repositories.length})
            </button>
            <button
              onClick={() => setActiveTab("organizations")}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-lg transition ${
                activeTab === "organizations"
                  ? "bg-background text-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Organizations ({organizations.length})
            </button>
          </div>

          {/* Time Filter */}
          <div className="flex items-center gap-1 text-xs bg-muted p-1 rounded-lg">
            {["Today", "This Week", "This Month", "This Year", "All Time"].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTimePeriod(t)}
                className={`px-3 py-1.5 rounded-md font-medium transition ${
                  selectedTimePeriod === t
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search developer by name or handle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2 text-xs">
            <Code2 className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent text-foreground w-full focus:outline-none"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang} className="bg-card text-foreground">
                  Language: {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Country Selector */}
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2 text-xs">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-transparent text-foreground w-full focus:outline-none"
            >
              {countriesList.map((c) => (
                <option key={c} value={c} className="bg-card text-foreground">
                  Region: {c === "All" ? "Global (All)" : c}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2 text-xs">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-foreground w-full focus:outline-none"
            >
              <option value="score" className="bg-card text-foreground">Sort: GitRank Score</option>
              <option value="stars" className="bg-card text-foreground">Sort: Most Starred</option>
              <option value="followers" className="bg-card text-foreground">Sort: Most Followers</option>
              <option value="contributions" className="bg-card text-foreground">Sort: Most Active</option>
              <option value="growth" className="bg-card text-foreground">Sort: Fastest Growth</option>
            </select>
          </div>
        </div>

        {/* DEVELOPERS TABLE */}
        {activeTab === "developers" && (
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="bg-muted/60 text-muted-foreground text-xs uppercase font-semibold border-b border-border">
                  <tr>
                    <th className="py-3.5 px-4 w-16">Rank</th>
                    <th className="py-3.5 px-4">Developer</th>
                    <th className="py-3.5 px-4">Score</th>
                    <th className="py-3.5 px-4 hidden md:table-cell">Followers</th>
                    <th className="py-3.5 px-4 hidden sm:table-cell">Stars</th>
                    <th className="py-3.5 px-4 hidden lg:table-cell">Contributions</th>
                    <th className="py-3.5 px-4 hidden lg:table-cell">Repositories</th>
                    <th className="py-3.5 px-4">Growth</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginatedDevelopers.map((dev) => (
                    <tr
                      key={dev.id}
                      className="hover:bg-muted/40 transition group"
                    >
                      {/* Rank */}
                      <td className="py-4 px-4 font-bold text-base">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-black text-xs ${
                            dev.rank === 1
                              ? "bg-amber-500/20 text-amber-500 border border-amber-500/40"
                              : dev.rank === 2
                              ? "bg-slate-400/20 text-slate-300 border border-slate-400/40"
                              : dev.rank === 3
                              ? "bg-amber-700/20 text-amber-600 border border-amber-700/40"
                              : "text-muted-foreground"
                          }`}
                        >
                          #{dev.rank}
                        </span>
                      </td>

                      {/* Developer Details */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={dev.avatar}
                            alt={dev.name}
                            className="w-10 h-10 rounded-full border border-border object-cover"
                          />
                          <div>
                            <div className="flex items-center gap-1.5 font-bold text-foreground">
                              <Link
                                to={`/developer/${dev.username}`}
                                className="hover:text-primary transition"
                              >
                                {dev.name}
                              </Link>
                              <span className="text-xs">{dev.flag}</span>
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2">
                              <span>@{dev.username}</span>
                              <span>•</span>
                              <span className="text-primary font-medium">{dev.primaryLanguage}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Score */}
                      <td className="py-4 px-4 font-black text-primary text-base">
                        {dev.gitRankScore.toFixed(1)}
                      </td>

                      {/* Followers */}
                      <td className="py-4 px-4 hidden md:table-cell text-muted-foreground text-xs font-medium">
                        {(dev.followers / 1000).toFixed(1)}k
                      </td>

                      {/* Stars */}
                      <td className="py-4 px-4 hidden sm:table-cell text-muted-foreground text-xs font-medium">
                        {(dev.stars / 1000).toFixed(0)}k
                      </td>

                      {/* Contributions */}
                      <td className="py-4 px-4 hidden lg:table-cell text-muted-foreground text-xs font-medium">
                        {dev.contributions.toLocaleString()}
                      </td>

                      {/* Repositories */}
                      <td className="py-4 px-4 hidden lg:table-cell text-muted-foreground text-xs font-medium">
                        {dev.repositories}
                      </td>

                      {/* Growth */}
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500">
                          <TrendingUp className="w-3.5 h-3.5" /> +{dev.growth}%
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openShareCard(dev)}
                            className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 transition text-xs font-bold flex items-center gap-1"
                            title="Generate Share Card"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Share Card</span>
                          </button>
                          <Link
                            to={`/developer/${dev.username}`}
                            className="p-1.5 rounded-lg bg-muted hover:bg-accent text-foreground text-xs font-medium transition"
                          >
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="p-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Showing <strong>{paginatedDevelopers.length}</strong> of <strong>{filteredDevelopers.length}</strong> developers
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="p-1.5 rounded-lg border border-border bg-card disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-semibold">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <button
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="p-1.5 rounded-lg border border-border bg-card disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* REPOSITORIES TAB */}
        {activeTab === "repositories" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repositories.map((repo) => (
              <div key={repo.id} className="p-5 rounded-2xl border border-border bg-card shadow-xs flex flex-col justify-between hover:border-primary/40 transition">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Link
                      to={`/repository/${repo.owner}/${repo.name}`}
                      className="font-bold text-lg hover:text-primary transition flex items-center gap-2"
                    >
                      <Package className="w-5 h-5 text-primary" />
                      {repo.owner}/{repo.name}
                    </Link>
                    <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-primary/10 text-primary border border-primary/20">
                      {repo.trendBadge}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                    {repo.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 font-semibold text-foreground">
                      <Star className="w-3.5 h-3.5 text-amber-400" /> {(repo.stars / 1000).toFixed(0)}k
                    </span>
                    <span>{repo.language}</span>
                  </div>
                  <Link
                    to={`/repository/${repo.owner}/${repo.name}`}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    View Metrics →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ORGANIZATIONS TAB */}
        {activeTab === "organizations" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {organizations.map((org) => (
              <div key={org.id} className="p-5 rounded-2xl border border-border bg-card shadow-xs hover:border-primary/40 transition">
                <div className="flex items-center gap-3 mb-3">
                  <img src={org.avatar} alt={org.name} className="w-12 h-12 rounded-xl border border-border object-cover" />
                  <div>
                    <h3 className="font-bold text-base text-foreground">{org.name}</h3>
                    <p className="text-xs text-muted-foreground font-mono">@{org.login}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                  {org.description}
                </p>
                <div className="flex items-center justify-between text-xs pt-3 border-t border-border text-muted-foreground font-medium">
                  <span>⭐ {(org.starsCount / 1000).toFixed(0)}k stars</span>
                  <span>📦 {org.repositoriesCount} repos</span>
                  <span className="text-primary font-bold">{org.gitRankScore} score</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
