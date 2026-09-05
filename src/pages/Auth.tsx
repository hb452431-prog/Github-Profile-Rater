import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GitRankLogo, GithubIcon } from "../components/ui/Icons"
import { Lock, Mail, ArrowRight } from "lucide-react"

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate("/dashboard")
    }, 800)
  }

  const handleGithubLogin = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate("/dashboard")
    }, 600)
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-3xl border border-border bg-card shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-1">
            <GitRankLogo className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            {isSignUp ? "Create GitRank Account" : "Sign in to GitRank"}
          </h1>
          <p className="text-xs text-muted-foreground">
            Track your open-source ranking rating, customize your cards, and manage your watchlist.
          </p>
        </div>

        {/* Continue with GitHub button */}
        <button
          onClick={handleGithubLogin}
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl border border-border bg-foreground text-background font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition shadow-xs"
        >
          <GithubIcon className="w-4 h-4" />
          <span>Continue with GitHub</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-border" />
          <span className="absolute px-3 bg-card text-[11px] text-muted-foreground uppercase">
            Or with email
          </span>
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@gitrank.io"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition shadow-md flex items-center justify-center gap-1.5"
          >
            {loading ? "Authenticating..." : isSignUp ? "Create Free Account" : "Sign In to Dashboard"}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border">
          {isSignUp ? (
            <span>
              Already have an account?{" "}
              <button
                onClick={() => setIsSignUp(false)}
                className="text-primary font-bold hover:underline"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Don&apos;t have an account yet?{" "}
              <button
                onClick={() => setIsSignUp(true)}
                className="text-primary font-bold hover:underline"
              >
                Sign Up Free
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
