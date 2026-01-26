// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'
import { GET } from './route'

describe('Profile Schema API', () => {
  it('should return valid JSON schema', async () => {
    const request = new NextRequest(
      'http://localhost:3000/api/v1/profile/schema'
    )
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.$schema).toBeDefined()

    // Check for structure
    let schema = data
    if (data.definitions && data.definitions.profileApiSchema) {
      schema = data.definitions.profileApiSchema
    }

    // Attempt to verify properties
    if (schema.properties) {
      expect(schema.properties.name).toBeDefined()
      expect(schema.properties.skills).toBeDefined()
    } else {
      // If properties are missing, fail but hopefully with the log visible
      console.error(
        'Missing properties in schema:',
        JSON.stringify(schema, null, 2)
      )
      expect(schema.properties).toBeDefined()
    }
  })
})
