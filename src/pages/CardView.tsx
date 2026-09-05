import { useState, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { toPng } from "html-to-image"
import confetti from "canvas-confetti"
import {
  Download,
  Copy,
  Check,
  User,
  ArrowRight,
  Sparkles,
  Trophy,
  MessageCircle,
  RefreshCw
} from "lucide-react"
import { TwitterIcon, LinkedinIcon } from "../components/ui/Icons"
import ShareCard from "../components/card/ShareCard"
import { developers } from "../data/mockData"
import { useShareCard } from "../context/ShareCardContext"

export default function CardView() {
  const { username } = useParams<{ username: string }>()
  const { openShareCard } = useShareCard()
  const cardRef = useRef<HTMLDivElement>(null)

  const [isExporting, setIsExporting] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const developer = developers.find(
    (d) => d.username.toLowerCase() === username?.toLowerCase()
  ) || developers[0]

  const handleDownload = async () => {
    if (!cardRef.current) return
    try {
      setIsExporting(true)
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
        backgroundColor: "#030712",
      })

      const link = document.createElement("a")
      link.download = `gitrank-${developer.username}-card.png`
      link.href = dataUrl
      link.click()

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#38bdf8", "#ec4899", "#f59e0b"],
      })
    } catch (err) {
      console.error("Failed to generate card image:", err)
    } finally {
      setIsExporting(false)
    }
  }

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } })
    setTimeout(() => setCopiedLink(false), 2500)
  }

  const shareText = encodeURIComponent(
    `Check out ${developer.name}'s verified open-source ranking card on GitRank! 🚀 Rank #${developer.rank} worldwide:`
  )
  const currentUrl = encodeURIComponent(window.location.href)

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-background via-slate-900/30 to-background flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Top Notification Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6 animate-pulse">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Verified GitRank Collectible Card • Season 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
          {developer.name}
          <span className="text-muted-foreground text-2xl sm:text-3xl font-mono font-normal ml-2">
            (@{developer.username})
          </span>
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mb-8">
          Ranked <strong className="text-primary font-bold">#{developer.rank}</strong> among 2.4M+ developers worldwide with a GitRank rating of <strong className="text-foreground font-bold">{developer.gitRankScore}</strong>.
        </p>

        {/* The Card Container with 3D tilt */}
        <div className="mb-10 drop-shadow-2xl">
          <ShareCard
            developer={developer}
            isInteractive={true}
            cardRef={cardRef}
          />
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-lg mb-8">
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Exporting PNG...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" /> Download PNG Card
              </>
            )}
          </button>

          <button
            onClick={() => openShareCard(developer)}
            className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-secondary text-secondary-foreground font-bold text-sm shadow-md hover:bg-secondary/90 transition"
          >
            <Sparkles className="w-4 h-4" /> Customize Card
          </button>
        </div>

        {/* Secondary Actions & Social Sharing */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-card border border-border text-foreground hover:bg-accent text-xs font-semibold transition"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedLink ? "Link Copied!" : "Copy Link"}
          </button>

          <Link
            to={`/developer/${developer.username}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-card border border-border text-foreground hover:bg-accent text-xs font-semibold transition"
          >
            <User className="w-3.5 h-3.5 text-indigo-400" /> View Full Profile
          </Link>

          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${currentUrl}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-card border border-border text-[#1d9bf0] hover:bg-accent text-xs font-semibold transition"
          >
            <TwitterIcon className="w-3.5 h-3.5" /> Tweet
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-card border border-border text-[#0a66c2] hover:bg-accent text-xs font-semibold transition"
          >
            <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
          </a>

          <a
            href={`https://api.whatsapp.com/send?text=${shareText}%20${currentUrl}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-card border border-border text-[#25d366] hover:bg-accent text-xs font-semibold transition"
          >
            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
          </a>
        </div>

        {/* Bottom CTA to explore rankings */}
        <div className="pt-8 border-t border-border/60 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>Discover more top developers shaping the open source world.</span>
          <Link
            to="/rankings"
            className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
          >
            Explore Global Rankings <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
