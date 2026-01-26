import { z } from 'zod'

/* ---------------------------------- types --------------------------------- */

export type WithSchema<T> = T & {
  readonly $schema: string
}

export type ProfileApiWithSchemaResponse = WithSchema<ProfileApiResponse>

export type ProfileApiResponse = z.infer<typeof profileApiSchema>

export type SkillWithConfidenceResponse = z.infer<typeof SkillWithConfidence>

/* --------------------------------schemas ---------------------------------- */

// eslint-disable-next-line @typescript-eslint/typedef
export const SkillWithConfidence = z.object({
  confidence: z.number(),
  name: z.string(),
})

// eslint-disable-next-line @typescript-eslint/typedef
export const profileApiSchema = z.object({
  email: z.email(),
  fullName: z.string(),
  location: z.string(),
  name: z.string(),
  skills: z.object({
    frameworks: z.array(SkillWithConfidence),
    infrastructure: z.array(SkillWithConfidence),
    languages: z.array(SkillWithConfidence),
  }),
  socials: z.object({
    github: z.url(),
    githubUsername: z.string(),
    linkedin: z.url().optional(),
  }),
  title: z.string(),
  website: z.url(),
})
