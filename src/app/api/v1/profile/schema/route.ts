import { type NextRequest, NextResponse } from 'next/server'
import * as z from 'zod'

import { profileApiSchema } from '@/models/api'

export const dynamic: string = 'force-static'

export function GET(_request: NextRequest): NextResponse {
  // eslint-disable-next-line @typescript-eslint/typedef
  const schema = z.toJSONSchema(profileApiSchema)

  return NextResponse.json(schema, {
    status: 200,
  })
}
