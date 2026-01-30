'use client'

import React, { type JSX, memo, type NamedExoticComponent } from 'react'

import { cn } from '@/lib/utilities'
import type { Blip, QuadrantStyleType } from '@/types/tech-radar'

import { QUADRANT_STYLES, RADAR_CONFIG } from './config'
import { type HoverContextValue, useHover } from './hover-context'

interface TechRadarBlipItemProperties {
  readonly blip: Blip
  readonly isHovered: boolean
  readonly onMouseEnter: (id: string) => void
  readonly onMouseLeave: () => void
}

const TechRadarBlipItemComponent: React.FC<TechRadarBlipItemProperties> = ({
  blip,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: TechRadarBlipItemProperties): JSX.Element => {
  const quadrantStyle: QuadrantStyleType =
    QUADRANT_STYLES[blip.quadrant] ?? QUADRANT_STYLES.languages

  return (
    <g
      className="cursor-pointer transition-all duration-300"
      style={{
        transform: `translate(${String(blip.xCoordinate)}px, ${String(blip.yCoordinate)}px) scale(${isHovered ? String(RADAR_CONFIG.blips.hoverScale) : '1'})`,
        zIndex: isHovered ? 50 : 1,
      }}
      onMouseEnter={(): void => {
        onMouseEnter(blip.id)
      }}
      onMouseLeave={onMouseLeave}
    >
      <circle
        className={cn(
          'transition-colors duration-300',
          quadrantStyle.blipColor
        )}
        r={RADAR_CONFIG.blips.size}
        strokeWidth={RADAR_CONFIG.blips.strokeWidth}
      />
    </g>
  )
}

export const TechRadarBlipItem: NamedExoticComponent<TechRadarBlipItemProperties> =
  memo(TechRadarBlipItemComponent)

interface TechRadarBlipsProperties {
  readonly blips: readonly Blip[]
}

export const TechRadarBlips: React.FC<TechRadarBlipsProperties> = ({
  blips,
}: TechRadarBlipsProperties): JSX.Element => {
  const { hoveredBlip, setHoveredBlip }: HoverContextValue = useHover()

  // Stability for callbacks
  const handleMouseEnter: (identity: string) => void = (
    identity: string
  ): void => {
    setHoveredBlip(identity)
  }

  const handleMouseLeave: () => void = (): void => {
    setHoveredBlip(null)
  }

  return (
    <>
      {blips.map(
        (blipItem: Blip): JSX.Element => (
          <TechRadarBlipItem
            blip={blipItem}
            isHovered={hoveredBlip === blipItem.id}
            key={blipItem.id}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        )
      )}
    </>
  )
}
