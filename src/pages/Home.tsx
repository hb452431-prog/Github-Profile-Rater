import { Link } from "react-router-dom"
import { Card, CardContent } from "../components/ui/Card"
import { developers, repositories } from "../data/mockData"
import type { Developer, Repository } from "../data/mockData"
import { TrendingUp, BookOpen, Star } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-24">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Find the developers and projects <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">shaping open source.</span>
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          GitRank turns GitHub activity into meaningful rankings, trends, and developer insights.
        </p>
        <div className="flex gap-4 mt-8">
          <Link to="/rankings" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
            Explore Rankings
          </Link>
          <Link to="/trending" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-11 px-8">
            Discover Trending
          </Link>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Top Developers</h2>
            <Link to="/rankings" className="text-sm font-medium text-primary hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {developers.map((dev: Developer, index: number) => (
              <Card key={dev.id} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl font-bold text-muted-foreground w-6">{index + 1}</span>
                      <img src={dev.avatar} alt={dev.name} className="w-12 h-12 rounded-full border-2 border-background shadow-sm" />
                      <div>
                        <h3 className="font-semibold text-lg">{dev.name}</h3>
                        <p className="text-sm text-muted-foreground">@{dev.username}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{dev.gitRankScore}</div>
                      <div className="text-xs text-muted-foreground flex items-center justify-end">
                        <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                        {dev.growth}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Trending Repos</h2>
            <Link to="/trending" className="text-sm font-medium text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-4">
            {repositories.map((repo: Repository) => (
              <Card key={repo.id}>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/repository/${repo.owner}/${repo.name}`} className="font-semibold hover:underline flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        {repo.owner}/{repo.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{repo.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-sm">
                    <span className="flex items-center text-muted-foreground"><Star className="w-4 h-4 mr-1 text-yellow-500" /> {repo.stars.toLocaleString()}</span>
                    <span className="text-muted-foreground">{repo.language}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
