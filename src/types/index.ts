export type Skill = {
  name: string
  icon: string
  category: 'language' | 'frontend' | 'backend' | 'database' | 'tool' | 'desktop'
  mastery: 'core' | 'strong' | 'learning'
}

export type SubProject = {
  name: string
  tech: string
  url: string
}

export type Project = {
  id: string
  name: string
  description: string
  longDescription: string
  image?: string
  tags: string[]
  tech: string[]
  githubUrl?: string
  demoUrl?: string
  backendUrl?: string
  status: 'production' | 'development'
  maintenance: 'active' | 'stable' | 'archived'
  category: 'fullstack' | 'backend' | 'frontend' | 'desktop' | 'cli'
  isMainTech: boolean
  year: number
  subProjects?: SubProject[]
}

export type Service = {
  title: string
  description: string
  icon: string
  features: string[]
}

export type Info = {
  name: string
  fullName: string
  title: string
  tagline: string
  bio: string
  philosophy: string
  mainTech: string
  learningMessage: string
  cvUrl: string
  whatsappUrl: string
  githubUrl: string
  email: string
  location: string
}
