import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./hooks/useTheme"
import { ShareCardProvider, useShareCard } from "./context/ShareCardContext"
import Layout from "./components/layout/Layout"
import ShareCardModal from "./components/card/ShareCardModal"

// Pages
import Home from "./pages/Home"
import Rankings from "./pages/Rankings"
import Trending from "./pages/Trending"
import Compare from "./pages/Compare"
import DeveloperProfile from "./pages/DeveloperProfile"
import RepositoryDetail from "./pages/RepositoryDetail"
import Languages from "./pages/Languages"
import Countries from "./pages/Countries"
import Organizations from "./pages/Organizations"
import Dashboard from "./pages/Dashboard"
import CardView from "./pages/CardView"
import Auth from "./pages/Auth"

function GlobalModalHost() {
  const { selectedDeveloper, isOpen, closeShareCard } = useShareCard()
  return (
    <ShareCardModal
      developer={selectedDeveloper}
      isOpen={isOpen}
      onClose={closeShareCard}
    />
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="gitrank-theme">
      <ShareCardProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rankings" element={<Rankings />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/developer/:username" element={<DeveloperProfile />} />
              <Route path="/repository/:owner/:repo" element={<RepositoryDetail />} />
              <Route path="/languages" element={<Languages />} />
              <Route path="/countries" element={<Countries />} />
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/card/:username" element={<CardView />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/signup" element={<Auth />} />
              {/* Fallback route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Layout>
          <GlobalModalHost />
        </Router>
      </ShareCardProvider>
    </ThemeProvider>
  )
}

export default App
