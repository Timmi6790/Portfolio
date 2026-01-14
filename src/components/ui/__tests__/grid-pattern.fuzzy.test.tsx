import { test, fc } from '@fast-check/vitest'
import { render } from '@testing-library/react'
import { describe, expect } from 'vitest'

import { GridPattern } from '../grid-pattern'

describe('GridPattern fuzzy tests', () => {
  test.prop([
    fc.record(
      {
        offsetX: fc.integer(),
        offsetY: fc.integer(),
        size: fc.integer({ min: 1, max: 1000 }), // logical constraint: pattern size > 0
        className: fc.string(),
      },
      { requiredKeys: [] }
    ),
  ])('should render without crashing', (props) => {
    expect(() => render(<GridPattern {...props} />)).not.toThrow()
  })
})
