import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BlueprintGrid } from '../blueprint-grid'

describe('BlueprintGrid', () => {
  it('renders correctly', () => {
    const { container } = render(<BlueprintGrid />)
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.firstChild).toHaveClass('pointer-events-none')
  })

  it('applies custom className', () => {
    const { container } = render(<BlueprintGrid className="custom-class" />)
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
