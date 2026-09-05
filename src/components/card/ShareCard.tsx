import React, { useRef, useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Star, Users, Flame, Package, TrendingUp, Code2, Award, Sparkles, ShieldCheck } from "lucide-react"
import { GitRankLogo } from "../ui/Icons"
import type { Developer } from "../../data/mockData"
import { getDeveloperArchetype } from "../../utils/archetype"

export interface CardCustomization {
  style: "neon" | "cyber" | "minimal" | "gold" | "cosmic"
  background: "abstract" | "grid" | "gradient" | "tech" | "dark"
  accentColor: "violet" | "cyan" | "blue" | "gold"
  aspectRatio: "portrait" | "story" | "landscape"
  showRank: boolean
  showScore: boolean
  showFollowers: boolean
  showStars: boolean
  showContributions: boolean
  showLanguages: boolean
  showQrCode: boolean
  showUsername: boolean
  showArchetype: boolean
}

export const defaultCustomization: CardCustomization = {
  style: "neon",
  background: "tech",
  accentColor: "violet",
  aspectRatio: "portrait",
  showRank: true,
  showScore: true,
  showFollowers: true,
  showStars: true,
  showContributions: true,
  showLanguages: true,
  showQrCode: true,
  showUsername: true,
  showArchetype: true,
}

interface ShareCardProps {
  developer: Developer
  customization?: Partial<CardCustomization>
  isInteractive?: boolean
  cardRef?: React.RefObject<HTMLDivElement | null>
}

export default function ShareCard({
  developer,
  customization: customOverrides = {},
  isInteractive = false,
  cardRef: externalRef,
}: ShareCardProps) {
  const config = { ...defaultCustomization, ...customOverrides }
  const localRef = useRef<HTMLDivElement>(null)
  const targetRef = externalRef || localRef

  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive || !localRef.current) return
    const rect = localRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    if (!isInteractive) return
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const archetype = getDeveloperArchetype(developer)

  // Style configs
  const getThemeStyles = () => {
    switch (config.style) {
      case "gold":
        return {
          border: "border-amber-500/60 shadow-[0_0_35px_rgba(245,158,11,0.35)]",
          glow: "from-amber-500/20 via-yellow-500/10 to-transparent",
          badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
          accentText: "text-amber-400",
          scoreRing: "border-amber-400",
        }
      case "cyber":
        return {
          border: "border-cyan-500/60 shadow-[0_0_35px_rgba(6,182,212,0.35)]",
          glow: "from-cyan-500/20 via-blue-500/10 to-transparent",
          badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
          accentText: "text-cyan-400",
          scoreRing: "border-cyan-400",
        }
      case "cosmic":
        return {
          border: "border-fuchsia-500/60 shadow-[0_0_35px_rgba(217,70,239,0.35)]",
          glow: "from-fuchsia-500/20 via-purple-500/10 to-transparent",
          badge: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40",
          accentText: "text-fuchsia-400",
          scoreRing: "border-fuchsia-400",
        }
      case "minimal":
        return {
          border: "border-slate-700 shadow-xl",
          glow: "from-slate-800/40 to-transparent",
          badge: "bg-slate-800 text-slate-300 border-slate-700",
          accentText: "text-slate-200",
          scoreRing: "border-slate-500",
        }
      case "neon":
      default:
        return {
          border: "border-indigo-500/60 shadow-[0_0_35px_rgba(99,102,241,0.35)]",
          glow: "from-indigo-500/25 via-sky-500/15 to-transparent",
          badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
          accentText: "text-indigo-400",
          scoreRing: "border-indigo-400",
        }
    }
  }

  const theme = getThemeStyles()

  const getBackgroundClass = () => {
    switch (config.background) {
      case "grid":
        return "bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] bg-[#070913]"
      case "gradient":
        return "bg-gradient-to-br from-[#090d1f] via-[#04060d] to-[#0a0f29]"
      case "tech":
        return "bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))] bg-[#030712]"
      case "dark":
        return "bg-[#050508]"
      case "abstract":
      default:
        return "bg-gradient-to-b from-[#0b0f19] via-[#06080e] to-[#020307]"
    }
  }

  const getAspectDimensions = () => {
    switch (config.aspectRatio) {
      case "story":
        return "w-[380px] min-h-[675px] aspect-[9/16]"
      case "landscape":
        return "w-[560px] min-h-[315px] aspect-[1200/630]"
      case "portrait":
      default:
        return "w-[380px] min-h-[475px] aspect-[4/5]"
    }
  }

  const shareUrl = `https://gitrank.io/developer/${developer.username}`

  return (
    <div
      style={{ perspective: 1000 }}
      className="inline-block transition-transform duration-200"
    >
      <div
        ref={targetRef as React.RefObject<HTMLDivElement>}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isInteractive && isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: "transform 0.15s ease-out",
        }}
        className={`relative overflow-hidden rounded-2xl border ${theme.border} ${getBackgroundClass()} ${getAspectDimensions()} text-white p-5 flex flex-col justify-between select-none shadow-2xl`}
      >
        {/* Ambient Top Glow */}
        <div className={`absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-br ${theme.glow} blur-3xl pointer-events-none opacity-80`} />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-tl from-cyan-500/15 to-transparent blur-3xl pointer-events-none opacity-60" />

        {/* Decorative Grid Lines / Holo Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* TOP HEADER */}
        <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 shadow-inner">
              <GitRankLogo className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold tracking-widest text-indigo-300 uppercase">GitRank Global</span>
                <span className="px-1.5 py-0.2 text-[9px] font-extrabold uppercase rounded bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">2026</span>
              </div>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider">Official Developer Card</p>
            </div>
          </div>

          {config.showRank && (
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${theme.badge} shadow-lg backdrop-blur-md`}>
              <Award className="w-3.5 h-3.5" />
              <span className="text-xs font-black tracking-tight">RANK #{developer.rank}</span>
            </div>
          )}
        </div>

        {/* MAIN PROFILE SECTION */}
        <div className="relative z-10 my-3">
          <div className="flex items-start gap-3.5">
            {/* Avatar with dynamic rarity border */}
            <div className="relative group shrink-0">
              <div className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r from-indigo-500 via-sky-400 to-fuchsia-500 opacity-75 blur-xs group-hover:opacity-100 transition duration-300`} />
              <img
                src={developer.avatar}
                alt={developer.name}
                crossOrigin="anonymous"
                className="relative w-16 h-16 rounded-xl object-cover border-2 border-slate-900 bg-slate-950 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 text-xs bg-slate-900/90 rounded-full px-1 border border-white/20 shadow">
                {developer.flag}
              </div>
            </div>

            {/* Developer Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-lg text-white truncate leading-tight">{developer.name}</h3>
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              </div>
              {config.showUsername && (
                <p className="text-xs text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                  @{developer.username}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-white/10 text-slate-200 border border-white/10 flex items-center gap-1">
                  <Code2 className="w-3 h-3 text-indigo-400" />
                  {developer.primaryLanguage}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">
                  {developer.level}
                </span>
              </div>
            </div>
          </div>

          {/* Archetype Banner */}
          {config.showArchetype && (
            <div className="mt-3.5 py-1.5 px-3 rounded-lg bg-gradient-to-r from-indigo-950/80 via-slate-900/90 to-indigo-950/80 border border-indigo-500/30 flex items-center justify-between shadow-inner">
              <span className="text-[10px] tracking-wider text-slate-400 font-semibold uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-yellow-400" /> ARCHETYPE
              </span>
              <span className="text-xs font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-sky-300 uppercase">
                {archetype}
              </span>
            </div>
          )}
        </div>

        {/* CENTER SCORE & PERCENTILE */}
        {config.showScore && (
          <div className="relative z-10 py-3 px-4 rounded-xl bg-slate-950/60 border border-white/10 backdrop-blur-md flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">GITRANK RATING</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className={`text-4xl font-black tracking-tight ${theme.accentText}`}>
                  {developer.gitRankScore.toFixed(1)}
                </span>
                <span className="text-xs text-slate-400 font-medium">/ 100</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium mt-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>Top {developer.percentile}</span>
              </div>
            </div>

            {/* Glowing Rank Ring */}
            <div className={`relative flex items-center justify-center w-16 h-16 rounded-full border-2 ${theme.scoreRing} bg-slate-900/80 shadow-[0_0_20px_rgba(99,102,241,0.25)]`}>
              <div className="text-center">
                <div className="text-[9px] uppercase tracking-tighter text-slate-400">GLOBAL</div>
                <div className="text-base font-black text-white">#{developer.rank}</div>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM STATS GRID */}
        <div className="relative z-10 grid grid-cols-3 gap-2 my-2">
          {config.showStars && (
            <div className="p-2 rounded-lg bg-white/5 border border-white/5 backdrop-blur-xs flex flex-col">
              <span className="text-[9px] text-slate-400 flex items-center gap-1 font-medium">
                <Star className="w-2.5 h-2.5 text-amber-400" /> Stars
              </span>
              <span className="text-xs font-bold text-white mt-0.5">
                {developer.stars >= 1000 ? `${(developer.stars / 1000).toFixed(1)}k` : developer.stars}
              </span>
            </div>
          )}

          {config.showFollowers && (
            <div className="p-2 rounded-lg bg-white/5 border border-white/5 backdrop-blur-xs flex flex-col">
              <span className="text-[9px] text-slate-400 flex items-center gap-1 font-medium">
                <Users className="w-2.5 h-2.5 text-sky-400" /> Followers
              </span>
              <span className="text-xs font-bold text-white mt-0.5">
                {developer.followers >= 1000 ? `${(developer.followers / 1000).toFixed(1)}k` : developer.followers}
              </span>
            </div>
          )}

          {config.showContributions && (
            <div className="p-2 rounded-lg bg-white/5 border border-white/5 backdrop-blur-xs flex flex-col">
              <span className="text-[9px] text-slate-400 flex items-center gap-1 font-medium">
                <Flame className="w-2.5 h-2.5 text-rose-400" /> Commits
              </span>
              <span className="text-xs font-bold text-white mt-0.5">
                {developer.contributions.toLocaleString()}
              </span>
            </div>
          )}

          <div className="p-2 rounded-lg bg-white/5 border border-white/5 backdrop-blur-xs flex flex-col">
            <span className="text-[9px] text-slate-400 flex items-center gap-1 font-medium">
              <Package className="w-2.5 h-2.5 text-emerald-400" /> Repos
            </span>
            <span className="text-xs font-bold text-white mt-0.5">
              {developer.repositories}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-white/5 border border-white/5 backdrop-blur-xs flex flex-col">
            <span className="text-[9px] text-slate-400 flex items-center gap-1 font-medium">
              <TrendingUp className="w-2.5 h-2.5 text-indigo-400" /> Growth
            </span>
            <span className="text-xs font-bold text-emerald-400 mt-0.5">
              +{developer.growth}%
            </span>
          </div>

          <div className="p-2 rounded-lg bg-white/5 border border-white/5 backdrop-blur-xs flex flex-col">
            <span className="text-[9px] text-slate-400 flex items-center gap-1 font-medium">
              <Flame className="w-2.5 h-2.5 text-orange-400" /> Streak
            </span>
            <span className="text-xs font-bold text-white mt-0.5">
              {developer.streak}d
            </span>
          </div>
        </div>

        {/* CARD FOOTER WITH CARD ID & QR CODE */}
        <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-slate-400">
          <div>
            <div className="font-mono text-[9px] tracking-wider text-slate-300 font-semibold">{developer.cardId}</div>
            <div className="text-[8px] text-slate-500">VERIFIED OPEN-SOURCE ID</div>
          </div>

          {config.showQrCode && (
            <div className="flex items-center gap-2 bg-white/10 p-1 rounded-md border border-white/10 shadow-xs">
              <QRCodeSVG
                value={shareUrl}
                size={28}
                bgColor="transparent"
                fgColor="#ffffff"
                level="L"
              />
              <span className="text-[8px] font-mono text-slate-400 hidden sm:inline">SCAN PROFILE</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
