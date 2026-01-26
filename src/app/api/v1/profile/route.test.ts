import { describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { GET } from './route'
import { profileApiSchema } from '@/models/api'

// Mock dependencies
vi.mock('@/data/config', () => ({
  siteConfig: {
    email: 'test@example.com',
    fullName: 'Test User',
    jobTitle: 'Developer',
    location: 'Test Location',
    name: 'Test',
    skills: {
      frameworks: [{ name: 'React', confidence: 1 }],
      infrastructure: [{ name: 'Docker', confidence: 1 }],
      languages: [{ name: 'TypeScript', confidence: 1 }],
    },
    socials: {
      github: 'https://github.com/test',
      githubUsername: 'test',
      linkedin: 'https://linkedin.com/in/test',
    },
    url: 'https://test.com',
  },
}))

vi.mock('@/lib/github/client', () => ({
  getGithubUser: vi.fn().mockResolvedValue({
    contributionData: {
      2024: [{ count: 5, date: '2024-01-01', level: 1 }],
    },
    projects: [
      {
        description: 'Test Project',
        forks_count: 0,
        html_url: 'https://github.com/test/project',
        language: 'TypeScript',
        name: 'project',
        stargazers_count: 10,
        topics: ['test'],
      },
    ],
    stats: {
      forks: 5,
      repositories: 10,
      stars: 100,
    },
  }),
}))

describe('Profile API', () => {
  it('should return valid profile data', async () => {
    const request = new NextRequest('http://localhost:3000/api/v1/profile')
    const response = GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)

    // Verify structure matches schema (this strips unknown keys like $schema by default)
    const result = profileApiSchema.safeParse(data)
    expect(result.success).toBe(true)

    // Verify specific values
    if (result.success) {
      expect(result.data.name).toBe('Test')
      expect(result.data.email).toBe('test@example.com')
    }

    // Verify metadata separately
    expect(data.$schema).toBe('https://test.com/api/v1/profile/schema')
  })
})
