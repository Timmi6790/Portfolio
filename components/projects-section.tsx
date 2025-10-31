"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star, GitFork } from "lucide-react"
import Image from "next/image"
import { GitHubProject } from '@/lib/github'

interface Project {
  name: string
  description: string
  html_url: string
  homepage?: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
}

interface ProjectsSectionProps {
  dict: any
  projects: GitHubProject[]
  stats: {
    repositories: number
    stars: number
    forks: number
  }
  contributionGraph: string | null
}

export function ProjectsSection({ dict, projects, stats, contributionGraph }: ProjectsSectionProps) {
  return (
    <section id="projects" className="min-h-screen py-20 px-4 md:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {dict.projects.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{dict.projects.subtitle}</p>
        </div>

        {/* GitHub Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Github className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold">{stats.repositories}</p>
                <p className="text-sm text-muted-foreground">{dict.projects.stats.repositories}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold">{stats.stars}</p>
                <p className="text-sm text-muted-foreground">{dict.projects.stats.stars}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <GitFork className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold">{stats.forks}</p>
                <p className="text-sm text-muted-foreground">{dict.projects.stats.forks}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 flex flex-col"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Github className="h-20 w-20 text-primary/40 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.name}</h3>
                <p className="text-muted-foreground mb-4 flex-1">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.topics.map((topic) => (
                    <Badge key={topic} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {project.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-4 w-4" />
                      {project.forks_count}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" asChild>
                      <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    {project.homepage && (
                      <Button size="sm" variant="ghost" asChild>
                        <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* GitHub Contribution Graph */}
        <div className="mt-16">
          <Card className="p-6 overflow-hidden">
            <h3 className="text-2xl font-bold mb-6">{dict.projects.contributions}</h3>
            <div className="w-full overflow-x-auto">
              {contributionGraph ? (
                <Image
                  src={contributionGraph}
                  alt="GitHub Contribution Graph"
                  width={800}
                  height={150}
                  className="w-full h-auto dark:invert"
                  unoptimized
                />
              ) : (
                <div className="w-full h-32 flex items-center justify-center text-muted-foreground">
                  <p>Unable to load contribution graph</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Button size="lg" asChild className="group">
            <a href="https://github.com/Timmi6790" target="_blank" rel="noopener noreferrer">
              {dict.projects.viewAll}
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
