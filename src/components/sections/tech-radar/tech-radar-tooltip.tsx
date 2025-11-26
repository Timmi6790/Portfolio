'use client'

import React, { type JSX } from 'react'

import { getSkillIcon } from '@/components/sections/skill-icons'
import type { Blip } from '@/types/tech-radar'

import { type HoverContextValue, useHover } from './hover-context'

import type { LucideIcon } from 'lucide-react'

interface TechRadarTooltipProperties {
  readonly blips: readonly Blip[]
}

export const TechRadarTooltip: React.FC<TechRadarTooltipProperties> = ({
  blips,
}: TechRadarTooltipProperties): JSX.Element | null => {
  const { hoveredBlip }: HoverContextValue = useHover()

  if (hoveredBlip === null) {
    return null
  }

  const hoveredBlipData: Blip | undefined = blips.find(
    (blip: Blip): boolean => blip.id === hoveredBlip
  )

  if (!hoveredBlipData) {
    return null
  }

  const Icon: LucideIcon = getSkillIcon(hoveredBlipData.iconName)
  const xPos: number = 50 + (hoveredBlipData.xCoordinate ?? 0) / 2
  const yPos: number = 50 + (hoveredBlipData.yCoordinate ?? 0) / 2

  return (
    <div
      className="pointer-events-none absolute z-50 flex flex-col items-center justify-center rounded-lg border border-border bg-popover px-3 py-2 text-sm shadow-md transition-opacity animate-in fade-in zoom-in-95"
      style={{
        left: `${String(xPos)}%`,
        top: `${String(yPos)}%`,
        transform: 'translate(-50%, -120%)',
      }}
    >
      <Icon className="mb-1 h-4 w-4 text-primary" />
      <span className="font-semibold text-popover-foreground">
        {hoveredBlipData.name}
      </span>
      <span className="text-xs text-muted-foreground capitalize">
        {hoveredBlipData.quadrant}
      </span>
    </div>
  )
}
