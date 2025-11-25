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

// Using simple-icons for GitHub as recommended, or just GitBranch if not available.
// Since I cannot add new dependencies without permission, I will use GitBranch as a fallback or keep it if it was just a deprecation warning but still works.
// The warning said: "Brand icons have been deprecated... We recommend using https://simpleicons.org/?q=github instead."
// I will use GitBranch for GitHub to avoid the deprecation warning if I can't import simple-icons.
// However, the user might want the actual GitHub icon.
// Let's check if I can use a different icon or just suppress if I must.
// But the goal is to fix lint issues.
// I will use `GitBranch` for now as a safe replacement or `Code2`?
// Actually, `lucide-react` might still have `Github` but it's deprecated.
// I'll use `GitBranch` for GitHub to be safe and avoid the lint error.

export const SkillIcons: Record<string, LucideIcon> = {
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
  GitHub: GitBranch, // Replaced deprecated Github icon
  Go: Box,

  Gradle: Workflow,
  HTML: Code2,
  // Languages
  Java: Coffee,
  JavaScript: FileJson,
  Kubernetes: Settings,

  Linux: Terminal,
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
// eslint-disable-next-line complexity
export const getSkillIcon = (skill: string): LucideIcon => {
  // Try exact match
  if (SkillIcons[skill]) {
    return SkillIcons[skill]
  }

  // Try case-insensitive match
  const lowerSkill: string = skill.toLowerCase()
  const found: string | undefined = Object.keys(SkillIcons).find(
    (key: string): boolean => key.toLowerCase() === lowerSkill
  )
  if (found && SkillIcons[found]) {
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
