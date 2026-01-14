import { test, fc } from '@fast-check/vitest'
import { render } from '@testing-library/react'
import { describe, expect } from 'vitest'

import { Label } from '../label'

describe('Label fuzzy tests', () => {
  test.prop([
    fc.record(
      {
        className: fc.string(),
        children: fc.string(),
      },
      { requiredKeys: [] }
    ),
  ])('should render without crashing', (props) => {
    expect(() => render(<Label {...props} />)).not.toThrow()
  })
})
