import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTheme } from "../../hooks/useTheme"
import {
  Moon,
  Sun,
  Search,
  Menu,
  X,
  Trophy,
  Flame,
  GitCompare,
  Building2,
  Code2,
  Globe,
  LayoutDashboard
} from "lucide-react"
import { GitRankLogo } from "../ui/Icons"
import SearchModal from "../features/SearchModal"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)

  const navLinks = [
    { label: "Rankings", path: "/rankings", icon: Trophy },
    { label: "Trending", path: "/trending", icon: Flame },
    { label: "Compare", path: "/compare", icon: GitCompare },
    { label: "Languages", path: "/languages", icon: Code2 },
    { label: "Countries", path: "/countries", icon: Globe },
    { label: "Organizations", path: "/organizations", icon: Building2 },
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="p-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:scale-105 transition">
                <GitRankLogo className="h-5 w-5" />
              </div>
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                GitRank
              </span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1 text-xs font-semibold">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    isActive(item.path)
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2.5">
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="inline-flex items-center rounded-xl font-medium transition border border-border bg-muted/50 hover:bg-accent text-muted-foreground hover:text-foreground h-9 px-3 text-xs gap-3"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search builders, repos...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground bg-card border border-border rounded">
                ⌘K
              </kbd>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted/50 transition hover:bg-accent text-foreground"
              title="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </button>

            {/* Sign In / Profile */}
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center justify-center h-9 px-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition shadow-xs"
            >
              Sign In
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-border bg-muted/50 lg:hidden text-foreground"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-out Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-border bg-background px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
            {navLinks.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
            <div className="pt-2 border-t border-border">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs"
              >
                Sign In to Dashboard
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  )
}
