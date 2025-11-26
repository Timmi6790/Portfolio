'use client'

import React, {
  type Context,
  createContext,
  type JSX,
  useContext,
  useState,
} from 'react'

import type { Blip } from '@/types/tech-radar'

export interface HoverContextValue {
  hoveredBlip: string | null
  setHoveredBlip: (blipId: string | null) => void
}

const HoverContext: Context<HoverContextValue | null> =
  createContext<HoverContextValue | null>(null)

export const useHover: () => HoverContextValue = (): HoverContextValue => {
  const context: HoverContextValue | null = useContext(HoverContext)
  if (context === null) {
    throw new Error('useHover must be used within HoverProvider')
  }
  return context
}

interface HoverProviderProperties {
  readonly blips: readonly Blip[]
  readonly children: React.ReactNode
}

/**
 * Provider for managing shared hover state between blips and tooltip.
 */
export const HoverProvider: React.FC<HoverProviderProperties> = ({
  children,
}: HoverProviderProperties): JSX.Element => {
  const [hoveredBlip, setHoveredBlip]: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>,
  ] = useState<string | null>(null)

  return (
    <HoverContext.Provider value={{ hoveredBlip, setHoveredBlip }}>
      {children}
    </HoverContext.Provider>
  )
}
