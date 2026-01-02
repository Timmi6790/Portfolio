import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageSwitcher } from '../language-switcher'
import { useLocale } from 'next-intl'

// Mock next-intl
vi.mock('next-intl', () => ({
  useLocale: vi.fn(() => 'en'),
}))

// Mock routing
const mockReplace = vi.fn()
vi.mock('@/i18n/routing', () => ({
  usePathname: vi.fn(() => '/test'),
  useRouter: vi.fn(() => ({ replace: mockReplace })),
}))

// Mock lucide icons
vi.mock('lucide-react', () => ({
  Globe: () => <div data-testid="globe-icon">Globe</div>,
}))

// Mock BlueprintTechButton
vi.mock('@/components/blueprint/blueprint-tech-button', () => ({
  BlueprintTechButton: ({ children, onClick }: any) => (
    <button data-testid="blueprint-tech-button" onClick={onClick}>
      {children}
    </button>
  ),
}))

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with current locale', () => {
    render(<LanguageSwitcher />)
    expect(screen.getByText(/DE/)).toBeDefined()
  })

  it('renders globe icon', () => {
    render(<LanguageSwitcher />)
    expect(screen.getByTestId('globe-icon')).toBeDefined()
  })

  it('uses BlueprintTechButton', () => {
    render(<LanguageSwitcher />)
    expect(screen.getByTestId('blueprint-tech-button')).toBeInTheDocument()
  })

  it('switches language on click', () => {
    render(<LanguageSwitcher />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockReplace).toHaveBeenCalledWith('/test', { locale: 'de' })
  })

  it('switches from de to en', () => {
    vi.mocked(useLocale).mockReturnValue('de')
    render(<LanguageSwitcher />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockReplace).toHaveBeenCalledWith('/test', { locale: 'en' })
  })
})
