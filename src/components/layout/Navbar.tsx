import { Link } from "react-router-dom"
import { useTheme } from "../../hooks/useTheme"
import { Moon, Sun, Search, Menu } from "lucide-react"
import { GitRankLogo } from "../ui/Icons"

export default function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <GitRankLogo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">GitRank</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/rankings" className="transition-colors hover:text-foreground/80 text-foreground/60">Rankings</Link>
            <Link to="/trending" className="transition-colors hover:text-foreground/80 text-foreground/60">Trending</Link>
            <Link to="/compare" className="transition-colors hover:text-foreground/80 text-foreground/60">Compare</Link>
          </nav>
        </div>
        
        {/* Mobile menu toggle would go here */}
        <button className="inline-flex items-center justify-center rounded-md p-2 md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </button>

        <div className="flex flex-1 items-center justify-end space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <button className="inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64">
              <span className="hidden lg:inline-flex">Search developers...</span>
              <span className="inline-flex lg:hidden">Search...</span>
              <Search className="ml-auto h-4 w-4" />
            </button>
          </div>
          <nav className="flex items-center">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-transparent transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
