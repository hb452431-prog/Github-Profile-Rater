export interface Developer {
  id: string
  username: string
  name: string
  avatar: string
  country: string
  primaryLanguage: string
  gitRankScore: number
  followers: number
  stars: number
  contributions: number
  repositories: number
  trend: "up" | "down" | "flat"
  growth: number
}

export const developers: Developer[] = [
  {
    id: "1",
    username: "torvalds",
    name: "Linus Torvalds",
    avatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
    country: "US",
    primaryLanguage: "C",
    gitRankScore: 99.8,
    followers: 185000,
    stars: 145000,
    contributions: 3400,
    repositories: 8,
    trend: "flat",
    growth: 1.2,
  },
  {
    id: "2",
    username: "gaearon",
    name: "Dan Abramov",
    avatar: "https://avatars.githubusercontent.com/u/810438?v=4",
    country: "UK",
    primaryLanguage: "JavaScript",
    gitRankScore: 98.5,
    followers: 85000,
    stars: 75000,
    contributions: 5200,
    repositories: 245,
    trend: "up",
    growth: 5.4,
  },
  {
    id: "3",
    username: "yyx990803",
    name: "Evan You",
    avatar: "https://avatars.githubusercontent.com/u/499550?v=4",
    country: "SG",
    primaryLanguage: "TypeScript",
    gitRankScore: 97.9,
    followers: 92000,
    stars: 215000,
    contributions: 4800,
    repositories: 180,
    trend: "up",
    growth: 4.1,
  }
]

export interface Repository {
  id: string
  name: string
  owner: string
  description: string
  language: string
  stars: number
  forks: number
  growth: number
  trendBadge: string
}

export const repositories: Repository[] = [
  {
    id: "r1",
    name: "react",
    owner: "facebook",
    description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    language: "JavaScript",
    stars: 218000,
    forks: 46000,
    growth: 2.5,
    trendBadge: "Hot",
  },
  {
    id: "r2",
    name: "vue",
    owner: "vuejs",
    description: "Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.",
    language: "TypeScript",
    stars: 206000,
    forks: 33000,
    growth: 3.1,
    trendBadge: "Rising",
  }
]
