import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"
import type { Developer } from "../data/mockData"

interface ShareCardContextType {
  selectedDeveloper: Developer | null
  isOpen: boolean
  openShareCard: (developer: Developer) => void
  closeShareCard: () => void
}

const ShareCardContext = createContext<ShareCardContextType | undefined>(undefined)

export function ShareCardProvider({ children }: { children: ReactNode }) {
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openShareCard = (developer: Developer) => {
    setSelectedDeveloper(developer)
    setIsOpen(true)
  }

  const closeShareCard = () => {
    setIsOpen(false)
  }

  return (
    <ShareCardContext.Provider value={{ selectedDeveloper, isOpen, openShareCard, closeShareCard }}>
      {children}
    </ShareCardContext.Provider>
  )
}

export function useShareCard() {
  const context = useContext(ShareCardContext)
  if (!context) {
    throw new Error("useShareCard must be used within a ShareCardProvider")
  }
  return context
}
