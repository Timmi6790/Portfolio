/* eslint-disable security/detect-object-injection */
import {
  AppWindow,
  Atom,
  Box,
  Braces,
  Cloud,
  Code2,
  Coffee,
  Container,
  Cpu,
  Database,
  FileCode,
  FileJson,
  GitBranch,
  GitMerge,
  Globe,
  Layers,
  Layout,
  Library,
  type LucideIcon,
  Monitor,
  Server,
  Settings,
  Terminal,
  Workflow,
  Wrench,
} from 'lucide-react'

export const SkillIcons: Record<string, LucideIcon> = {
  ArgoCD: GitMerge,
  AWS: Cloud,
  Azure: Cloud,
  CSS: Layout,
  Database: Database,
  // Generic Fallbacks
  Default: Cpu,
  Docker: Container,
  GCP: Cloud,
  // Tools & Platforms
  Git: GitBranch,
  GitHub: GitBranch,
  Go: Box,

  Gradle: Workflow,
  HTML: Code2,
  // Languages
  Java: Coffee,
  JavaScript: FileJson,
  Kubernetes: Settings,

  Linux: Terminal,
  Lua: Braces,
  Maven: Library,
  MongoDB: Database,
  'Next.js': AppWindow,
  Node: Server,
  PostgreSQL: Database,
  Python: Braces,
  React: Atom,
  Redis: Database,
  Rust: Settings,
  // Frameworks & Libraries
  'Spring Boot': Layers,
  SQL: Database,
  System: Monitor,

  Tailwind: Layers,
  Tool: Wrench,
  TypeScript: FileCode,
  Web: Globe,
}

// Helper to get icon with fallback
export const getSkillIcon: (skill: string) => LucideIcon = (
  skill: string
  // eslint-disable-next-line complexity
): LucideIcon => {
  // Try exact match
  if (SkillIcons[skill]) {
    return SkillIcons[skill]
  }

  // Try case-insensitive match
  const lowerSkill: string = skill.toLowerCase()
  const found: string | undefined = Object.keys(SkillIcons).find(
    (key: string): boolean => key.toLowerCase() === lowerSkill
  )

  // eslint-disable-next-line eqeqeq
  if (found != null && SkillIcons[found]) {
    return SkillIcons[found]
  }

  // Heuristics map
  const heuristics: Record<string, LucideIcon> = {
    aws: SkillIcons['AWS'] ?? Cpu,
    cloud: SkillIcons['AWS'] ?? Cpu,
    data: SkillIcons['Database'] ?? Cpu,
    db: SkillIcons['Database'] ?? Cpu,
    git: SkillIcons['Git'] ?? Cpu,
    react: SkillIcons['React'] ?? Cpu,
    script: SkillIcons['TypeScript'] ?? Cpu,
    sql: SkillIcons['Database'] ?? Cpu,
  }

  for (const [key, icon] of Object.entries(heuristics)) {
    if (lowerSkill.includes(key)) {
      return icon
    }
  }

  return SkillIcons['Default'] ?? Cpu
}
