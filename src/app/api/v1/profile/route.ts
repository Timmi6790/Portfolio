import { type NextRequest, NextResponse } from 'next/server'

import { siteConfig } from '@/data/config'
import {
  type ProfileApiResponse,
  profileApiSchema,
  type ProfileApiWithSchemaResponse,
  type SkillWithConfidenceResponse,
} from '@/models/api'
import { type Skill } from '@/types/skill'

export const dynamic: string = 'force-static'

function convertSkillToResponse(skill: Skill): SkillWithConfidenceResponse {
  return {
    confidence: skill.confidence,
    name: skill.name,
  }
}

export function GET(_request: NextRequest): NextResponse {
  const response: ProfileApiResponse = {
    email: siteConfig.email,
    fullName: siteConfig.fullName,
    location: siteConfig.location,
    name: siteConfig.name,
    skills: {
      frameworks: siteConfig.skills.frameworks.map(
        (skill: Skill): SkillWithConfidenceResponse =>
          convertSkillToResponse(skill)
      ),
      infrastructure: siteConfig.skills.infrastructure.map(
        (skill: Skill): SkillWithConfidenceResponse =>
          convertSkillToResponse(skill)
      ),
      languages: siteConfig.skills.languages.map(
        (skill: Skill): SkillWithConfidenceResponse =>
          convertSkillToResponse(skill)
      ),
    },
    socials: {
      github: siteConfig.socials.github,
      githubUsername: siteConfig.socials.githubUsername,
      linkedin: siteConfig.socials.linkedin,
    },
    title: siteConfig.jobTitle,
    website: siteConfig.url,
  }

  const validatedResponse: ProfileApiResponse = profileApiSchema.parse(response)
  const fullResponse: ProfileApiWithSchemaResponse = {
    ...validatedResponse,
    $schema: `${siteConfig.url}/api/v1/profile/schema`,
  }

  return NextResponse.json(fullResponse, {
    status: 200,
  })
}
