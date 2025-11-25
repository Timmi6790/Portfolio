import React, { type JSX } from 'react'

import { TechRadarClient } from '@/components/sections/tech-radar/tech-radar-client'
import { type Skill } from '@/lib/config'
import { calculateBlipPosition } from '@/lib/tech-radar-utilities'
import type {
  Blip,
  CalculateBlipPositionResult,
  TechRadarQuadrant,
} from '@/types/tech-radar'

interface TechRadarProperties {
  readonly buildTools: readonly Skill[]
  readonly frameworks: readonly Skill[]
  readonly infrastructure: readonly Skill[]
  readonly languages: readonly Skill[]
}

interface QuadrantConfig {
  readonly end: number
  readonly start: number
}

const generateBlipsForCategory: (
  items: readonly Skill[],
  quadrantKey: Blip['quadrant'],
  config: QuadrantConfig
) => Blip[] = (
  items: readonly Skill[],
  quadrantKey: Blip['quadrant'],
  config: QuadrantConfig
): Blip[] => {
    return items.map((skill: Skill, index: number): Blip => {
      const {
        angle,
        radius,
        xCoordinate,
        yCoordinate,
      }: CalculateBlipPositionResult = calculateBlipPosition({
        confidence: skill.confidence,
        endAngle: config.end,
        index,
        skillName: skill.name,
        startAngle: config.start,
        total: items.length,
      })
      return {
        angle,
        iconName: skill.name,
        id: `${quadrantKey}-${skill.name}`,
        name: skill.name,
        quadrant: quadrantKey,
        radius,
        xCoordinate,
        yCoordinate,
      }
    })
  }

export const TechRadar: React.FC<TechRadarProperties> = ({
  buildTools,
  frameworks,
  infrastructure,
  languages,
}: TechRadarProperties): JSX.Element => {
  const quadrants: Record<TechRadarQuadrant, QuadrantConfig> = {
    buildTools: { end: Math.PI, start: Math.PI / 2 }, // bottom-left
    frameworks: { end: 2 * Math.PI, start: (3 * Math.PI) / 2 }, // top-right
    infrastructure: { end: Math.PI / 2, start: 0 }, // bottom-right
    languages: { end: (3 * Math.PI) / 2, start: Math.PI }, // top-left
  }

  const allBlips: Blip[] = [
    ...generateBlipsForCategory(languages, 'languages', quadrants.languages),
    ...generateBlipsForCategory(frameworks, 'frameworks', quadrants.frameworks),
    ...generateBlipsForCategory(buildTools, 'buildTools', quadrants.buildTools),
    ...generateBlipsForCategory(
      infrastructure,
      'infrastructure',
      quadrants.infrastructure
    ),
  ]

  return <TechRadarClient blips={allBlips} />
}
