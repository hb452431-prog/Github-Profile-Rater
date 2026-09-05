import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./hooks/useTheme"
import Layout from "./components/layout/Layout"
import Home from "./pages/Home"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="gitrank-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add other routes here later */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
