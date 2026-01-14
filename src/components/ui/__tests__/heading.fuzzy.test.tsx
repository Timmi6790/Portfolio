import { test, fc } from '@fast-check/vitest'
import { render } from '@testing-library/react'
import { describe, expect } from 'vitest'

import { Heading } from '../heading'

describe('Heading fuzzy tests', () => {
  test.prop([
    fc.record(
      {
        as: fc.constantFrom('h1', 'h2', 'h3', 'h4', 'h5', 'h6'),
        className: fc.string(),
        children: fc.string(),
      },
      { requiredKeys: [] }
    ),
  ])('should render without crashing', (props) => {
    expect(() => render(<Heading {...props} />)).not.toThrow()
  })
})
