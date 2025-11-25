'use client'

import React, { type JSX } from 'react'

import { QUADRANT_STYLES, RADAR_CONFIG } from '@/lib/radar-config'
import { cn } from '@/lib/utilities'
import type { Blip, QuadrantStyleType } from '@/types/tech-radar'

import { type HoverContextValue, useHover } from './hover-context'

interface TechRadarBlipsProperties {
  readonly blips: readonly Blip[]
}

export const TechRadarBlips: React.FC<TechRadarBlipsProperties> = ({
  blips,
}: TechRadarBlipsProperties): JSX.Element => {
  const { hoveredBlip, setHoveredBlip }: HoverContextValue = useHover()

  return (
    <>
      {blips.map((blipItem: Blip): JSX.Element => {
        const isHovered: boolean = hoveredBlip === blipItem.id
        const quadrantStyle: QuadrantStyleType =
          QUADRANT_STYLES[blipItem.quadrant] ?? QUADRANT_STYLES.languages

        return (
          <g
            className="cursor-pointer transition-all duration-300"
            key={blipItem.id}
            style={{
              transform: `translate(${String(blipItem.xCoordinate)}px, ${String(blipItem.yCoordinate)}px) scale(${isHovered ? String(RADAR_CONFIG.blips.hoverScale) : '1'})`,
              zIndex: isHovered ? 50 : 1,
            }}
            onMouseEnter={(): void => {
              setHoveredBlip(blipItem.id)
            }}
            onMouseLeave={(): void => {
              setHoveredBlip(null)
            }}
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
      })}
    </>
  )
}
