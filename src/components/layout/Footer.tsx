import { Link } from "react-router-dom"
import { GithubIcon, TwitterIcon, LinkedinIcon, GitRankLogo } from "../ui/Icons"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-1 rounded-lg bg-primary/10 text-primary">
                <GitRankLogo className="h-5 w-5" />
              </div>
              <span className="font-black text-lg tracking-tight">GitRank</span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
              Discover. Compare. Rank the builders shaping open source. Continuous algorithmic intelligence analyzing signals across millions of GitHub developers.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground transition"
              >
                <GithubIcon className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground transition"
              >
                <TwitterIcon className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground transition"
              >
                <LinkedinIcon className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Product</h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-medium">
              <li>
                <Link to="/rankings" className="hover:text-foreground transition">Global Rankings</Link>
              </li>
              <li>
                <Link to="/trending" className="hover:text-foreground transition">Trending Projects</Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-foreground transition">Compare Developers</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-foreground transition">Developer Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Ecosystem</h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-medium">
              <li>
                <Link to="/languages" className="hover:text-foreground transition">Languages</Link>
              </li>
              <li>
                <Link to="/countries" className="hover:text-foreground transition">Countries & Census</Link>
              </li>
              <li>
                <Link to="/organizations" className="hover:text-foreground transition">Organizations</Link>
              </li>
              <li>
                <Link to="/card/torvalds" className="hover:text-foreground transition">Shareable Cards</Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Company</h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-medium">
              <li>
                <a href="#" className="hover:text-foreground transition">Methodology</a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">API Documentation</a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 GitRank. Built for the open-source community. Mock demo datasets clearly labeled.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Algorithmic v4.2</span>
            <span>•</span>
            <span className="text-emerald-500 font-semibold">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
