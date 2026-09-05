import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import confetti from "canvas-confetti"
import {
  Search,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Download,
  ShieldCheck,
  Check,
  RefreshCw,
} from "lucide-react"
import ShareCard from "../components/card/ShareCard"
import { useShareCard } from "../context/ShareCardContext"
import { fetchAndAnalyzeGithubProfile, extractGithubUsername } from "../services/githubService"
import { analyzeDeveloperProfile } from "../utils/analysisTips"
import type { ProfileAnalysisResult } from "../utils/analysisTips"

export default function AnalyzeProfile() {
  const { username: paramUsername } = useParams<{ username: string }>()
  const navigate = useNavigate()
  const { openShareCard } = useShareCard()

  const [inputHandle, setInputHandle] = useState(paramUsername || "")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [analysisResult, setAnalysisResult] = useState<ProfileAnalysisResult | null>(null)
  const [completedTipIds, setCompletedTipIds] = useState<string[]>([])
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const analysisSteps = [
    "Querying GitHub Public API & Profile Metadata...",
    "Scanning Repositories, Star Footprint & Top Languages...",
    "Evaluating Commit Cadence, PR Velocity & Consistency...",
    "Calculating GitRank Algorithmic Score & Archetype...",
    "Generating Personalized Profile Optimization Strategy...",
  ]

  const runAnalysis = async (targetHandle: string) => {
    const handle = extractGithubUsername(targetHandle)
    if (!handle) return

    setIsAnalyzing(true)
    setErrorMsg(null)
    setAnalysisStep(0)
    setProgress(15)

    const timer1 = setTimeout(() => { setAnalysisStep(1); setProgress(35); }, 350)
    const timer2 = setTimeout(() => { setAnalysisStep(2); setProgress(60); }, 750)
    const timer3 = setTimeout(() => { setAnalysisStep(3); setProgress(85); }, 1150)
    const timer4 = setTimeout(() => { setAnalysisStep(4); setProgress(98); }, 1500)

    try {
      const dev = await fetchAndAnalyzeGithubProfile(handle)
      const analyzed = analyzeDeveloperProfile(dev)

      setTimeout(() => {
        setAnalysisResult(analyzed)
        setIsAnalyzing(false)
        setProgress(100)
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#6366f1", "#38bdf8", "#ec4899", "#f59e0b"]
        })
      }, 1750)
    } catch {
      setErrorMsg("Unable to complete live analysis. Please verify the GitHub username.")
      setIsAnalyzing(false)
    }

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }

  useEffect(() => {
    if (paramUsername) {
      setInputHandle(paramUsername)
      runAnalysis(paramUsername)
    }
  }, [paramUsername])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputHandle.trim()) return
    const handle = extractGithubUsername(inputHandle)
    navigate(`/analyze/${handle}`)
    runAnalysis(handle)
  }

  const toggleTip = (tipId: string) => {
    if (completedTipIds.includes(tipId)) {
      setCompletedTipIds(completedTipIds.filter((id) => id !== tipId))
    } else {
      setCompletedTipIds([...completedTipIds, tipId])
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.7 },
        colors: ["#10b981", "#38bdf8"]
      })
    }
  }

  // Calculate potential projected score based on checked improvement tips
  const currentBaseScore = analysisResult ? analysisResult.developer.gitRankScore : 85
  const addedPoints = analysisResult
    ? analysisResult.tips
        .filter((t) => completedTipIds.includes(t.id))
        .reduce((sum, t) => sum + t.pointsBoost, 0)
    : 0
  const projectedScore = Number(Math.min(99.8, currentBaseScore + addedPoints).toFixed(1))

  return (
    <div className="container mx-auto px-4 py-10 space-y-12 max-w-6xl">
      {/* 1. TOP HEADER & SEARCH INPUT */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-bold shadow-xs">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Algorithmic Profile Analysis & Rank Card Generator</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          Analyze Any GitHub Profile
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Enter any GitHub handle or profile link to measure its algorithmic rating, generate a collectible rank card, and get an actionable plan to improve your open-source standing.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="pt-2 max-w-xl mx-auto">
          <div className="relative flex items-center shadow-lg shadow-primary/5 rounded-2xl bg-card border border-border overflow-hidden focus-within:ring-2 focus-within:ring-primary">
            <Search className="w-5 h-5 text-muted-foreground ml-4 shrink-0" />
            <input
              type="text"
              placeholder="Enter GitHub handle (e.g. torvalds, antfu, your-handle)..."
              value={inputHandle}
              onChange={(e) => setInputHandle(e.target.value)}
              className="w-full py-4 pl-3 pr-28 bg-transparent text-sm focus:outline-none text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={isAnalyzing || !inputHandle.trim()}
              className="absolute right-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition shadow-xs disabled:opacity-50 flex items-center gap-1.5"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Analyzing
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" /> Analyze
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick handles */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-muted-foreground">
          <span>Try popular builders:</span>
          {["torvalds", "antfu", "yyx990803", "shadcn", "rauchg", "mitchellh"].map((h) => (
            <button
              key={h}
              onClick={() => {
                setInputHandle(h)
                navigate(`/analyze/${h}`)
                runAnalysis(h)
              }}
              className="px-2.5 py-1 rounded-lg bg-muted hover:bg-accent text-foreground font-mono font-medium transition"
            >
              @{h}
            </button>
          ))}
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold max-w-md mx-auto flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* 2. LOADING / SCANNING STATE */}
      {isAnalyzing && (
        <div className="p-8 sm:p-12 rounded-3xl border border-border bg-card shadow-lg text-center max-w-xl mx-auto space-y-6 animate-in fade-in duration-200">
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <Zap className="w-6 h-6 text-amber-400" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">
              Analyzing @{extractGithubUsername(inputHandle)}
            </h3>
            <p className="text-xs text-primary font-mono font-semibold">
              {analysisSteps[analysisStep]}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-sky-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Checklist */}
          <div className="text-left space-y-2 text-xs bg-muted/40 p-4 rounded-xl border border-border">
            {analysisSteps.map((step, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 transition ${
                  idx < analysisStep
                    ? "text-emerald-500 font-medium"
                    : idx === analysisStep
                    ? "text-primary font-bold"
                    : "text-muted-foreground opacity-50"
                }`}
              >
                {idx < analysisStep ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-current shrink-0 flex items-center justify-center text-[9px]">
                    {idx + 1}
                  </div>
                )}
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. ANALYSIS RESULTS VIEW */}
      {!isAnalyzing && analysisResult && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Top Banner: Profile Overview */}
          <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={analysisResult.developer.avatar}
                alt={analysisResult.developer.name}
                className="w-20 h-20 rounded-2xl border-2 border-primary object-cover shadow-md"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                    {analysisResult.developer.name}
                  </h2>
                  <ShieldCheck className="w-5 h-5 text-sky-500" />
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/20">
                    Rank #{analysisResult.developer.rank}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  @{analysisResult.developer.username} • {analysisResult.developer.level}
                </p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1 max-w-lg">
                  {analysisResult.developer.bio}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => openShareCard(analysisResult.developer)}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white font-bold text-xs shadow-md transition"
              >
                <Sparkles className="w-4 h-4" /> Customize Share Card
              </button>
              <Link
                to={`/developer/${analysisResult.developer.username}`}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl border border-border bg-muted hover:bg-accent text-xs font-semibold transition"
              >
                Full Analytics
              </Link>
            </div>
          </div>

          {/* Grid: 3D Rank Card & Score Radar Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (5 Cols): The 3D Collectible Rank Card */}
            <div className="lg:col-span-5 flex flex-col items-center p-6 rounded-3xl border border-border bg-gradient-to-b from-card via-slate-900/10 to-card shadow-sm space-y-4">
              <div className="text-center">
                <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                  Generated Rank Card
                </span>
                <p className="text-[11px] text-muted-foreground">Hover & tilt card in 3D</p>
              </div>

              <div className="scale-95 sm:scale-100 transition-all origin-center">
                <ShareCard
                  developer={analysisResult.developer}
                  isInteractive={true}
                />
              </div>

              <div className="w-full pt-2 flex items-center justify-center gap-2">
                <button
                  onClick={() => openShareCard(analysisResult.developer)}
                  className="w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download & Share Card
                </button>
              </div>
            </div>

            {/* Right Column (7 Cols): Multi-dimensional Score Breakdown */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Overall Score Banner */}
              <div className="p-6 rounded-3xl border border-border bg-card shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                      Evaluated GitRank Score
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl sm:text-5xl font-black text-primary">
                        {analysisResult.developer.gitRankScore}
                      </span>
                      <span className="text-sm text-muted-foreground font-medium">/ 100 Rating</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 inline-flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> {analysisResult.developer.percentile}
                    </span>
                    <p className="text-[11px] text-muted-foreground mt-1">Global ranking placement</p>
                  </div>
                </div>

                {/* Score Breakdown Bars */}
                <div className="space-y-3 pt-3 border-t border-border">
                  {[
                    { label: "Code Impact & Star Footprint", value: analysisResult.scoreBreakdown.codeImpact, color: "bg-indigo-500" },
                    { label: "Contribution Velocity & Commit Streak", value: analysisResult.scoreBreakdown.activityVelocity, color: "bg-sky-400" },
                    { label: "Profile & Identity Completeness", value: analysisResult.scoreBreakdown.profileQuality, color: "bg-emerald-400" },
                    { label: "Ecosystem Breadth & Polyglot Stack", value: analysisResult.scoreBreakdown.ecosystemBreadth, color: "bg-fuchsia-400" },
                    { label: "Documentation & Repository Hygiene", value: analysisResult.scoreBreakdown.documentationHealth, color: "bg-amber-400" },
                  ].map((metric) => (
                    <div key={metric.label} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                        <span className="text-foreground">{metric.label}</span>
                        <span>{metric.value}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className={`${metric.color} h-full rounded-full transition-all duration-500`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                    <CheckCircle2 className="w-4 h-4" /> Profile Strengths
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    {analysisResult.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
                    <AlertTriangle className="w-4 h-4" /> Growth Opportunities
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    {analysisResult.weaknesses.map((w, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 4. TAILORED "TIPS TO IMPROVE" ACTION PLAN */}
          <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h3 className="text-2xl font-black tracking-tight">
                    Action Plan: Tips to Boost Your Rating
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Check off recommended optimizations to calculate your potential projected GitRank score.
                </p>
              </div>

              {/* Simulated Projected Score Tracker */}
              <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/30 flex items-center gap-3 shrink-0">
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                    Projected Rating
                  </span>
                  <div className="text-2xl font-black text-primary">
                    {projectedScore}
                    <span className="text-xs text-emerald-500 font-bold ml-1.5">
                      (+{(projectedScore - currentBaseScore).toFixed(1)} pts)
                    </span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  {completedTipIds.length} of {analysisResult.tips.length} checked
                </div>
              </div>
            </div>

            {/* Tips Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysisResult.tips.map((tip) => {
                const isDone = completedTipIds.includes(tip.id)

                return (
                  <div
                    key={tip.id}
                    onClick={() => toggleTip(tip.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                      isDone
                        ? "border-emerald-500/50 bg-emerald-500/5 shadow-xs"
                        : "border-border bg-muted/30 hover:border-primary/40 hover:bg-muted/50"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition shrink-0 ${
                              isDone
                                ? "bg-emerald-500 border-emerald-500 text-white"
                                : "border-muted-foreground bg-card"
                            }`}
                          >
                            {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-black text-foreground">
                            {tip.title}
                          </span>
                        </div>

                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-full border whitespace-nowrap ${
                            tip.impact === "High Impact"
                              ? "bg-rose-500/10 text-rose-500 border-rose-500/30"
                              : tip.impact === "Quick Win"
                              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                              : "bg-sky-500/10 text-sky-500 border-sky-500/30"
                          }`}
                        >
                          +{tip.pointsBoost} pts
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground pl-7 leading-relaxed mb-3">
                        {tip.description}
                      </p>
                    </div>

                    <div className="pl-7 pt-2 flex items-center justify-between text-xs border-t border-border/40">
                      <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                        {tip.category}
                      </span>
                      <span className="text-primary font-bold flex items-center gap-1 hover:underline">
                        {tip.actionText} →
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
