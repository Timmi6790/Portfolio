import { test, fc } from '@fast-check/vitest'
import { render } from '@testing-library/react'
import { describe, expect } from 'vitest'

import { Card, CardContent, CardHeader, CardTitle } from '../card'

describe('Card fuzzy tests', () => {
  test.prop([
    fc.record(
      {
        decorative: fc.constantFrom(
          'none',
          'overlay',
          'pattern',
          'premium',
          'topBar'
        ),
        hover: fc.constantFrom('intense', 'moderate', 'none', 'subtle'),
        variant: fc.constantFrom('default', 'interactive', 'premium', 'stats'),
        className: fc.string(),
        children: fc.string(),
      },
      { requiredKeys: [] }
    ),
  ])('Card should render without crashing', (props) => {
    expect(() => render(<Card {...props} />)).not.toThrow()
  })

  test.prop([
    fc.record(
      {
        className: fc.string(),
        children: fc.string(),
      },
      { requiredKeys: [] }
    ),
  ])('CardHeader should render without crashing', (props) => {
    expect(() => render(<CardHeader {...props} />)).not.toThrow()
  })

  test.prop([
    fc.record(
      {
        className: fc.string(),
        children: fc.string(),
      },
      { requiredKeys: [] }
    ),
  ])('CardTitle should render without crashing', (props) => {
    expect(() => render(<CardTitle {...props} />)).not.toThrow()
  })

  test.prop([
    fc.record(
      {
        className: fc.string(),
        children: fc.string(),
      },
      { requiredKeys: [] }
    ),
  ])('CardContent should render without crashing', (props) => {
    expect(() => render(<CardContent {...props} />)).not.toThrow()
  })
})
