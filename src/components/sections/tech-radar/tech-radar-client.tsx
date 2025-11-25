'use client'

import React, { type JSX, useState } from 'react'

import { useTranslations } from 'next-intl'

import { getSkillIcon } from '@/components/sections/skill-icons'
import { cn } from '@/lib/utilities'
import type { Translations } from '@/types/i18n'
import type { Blip } from '@/types/tech-radar'

import styles from './tech-radar.module.css'

import type { LucideIcon } from 'lucide-react'

interface TechRadarClientProperties {
  readonly blips: readonly Blip[]
}

// noinspection JSUnusedLocalSymbols
export const TechRadarClient: React.FC<TechRadarClientProperties> = ({
  blips,
}: TechRadarClientProperties): JSX.Element => {
  const translations: Translations<'skills'> = useTranslations('skills')

  const [hoveredBlip, setHoveredBlip]: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>,
  ] = useState<string | null>(null)

  return (
    <div className="relative mx-auto aspect-square w-full max-w-2xl">
      <svg
        className="h-full w-full overflow-visible"
        viewBox="-100 -100 200 200"
      >
        {/* Clip path for axes */}
        <defs>
          <clipPath id="radarClip">
            <circle cx="0" cy="0" r="97.5" />
          </clipPath>
          {/* Curved text paths for quadrant labels - moved outside at 105px radius */}
          <path
            d="M -105,0 A 105,105 0 0,1 0,-105"
            fill="none"
            id="languagesPath"
          />
          <path
            d="M 0,-105 A 105,105 0 0,1 105,0"
            fill="none"
            id="frameworksPath"
          />
          {/* Bottom paths reversed to keep text upright - radius increased to 114 to match visual distance of top labels */}
          <path
            d="M -114,0 A 114,114 0 0,0 0,114"
            fill="none"
            id="buildToolsPath"
          />
          <path
            d="M 0,114 A 114,114 0 0,0 114,0"
            fill="none"
            id="infrastructurePath"
          />
        </defs>

        {/* Background circles */}
        <circle
          className="fill-muted/20 stroke-border stroke-1"
          cx="0"
          cy="0"
          r="32.5"
        />
        <circle
          className="fill-muted/10 stroke-border stroke-1"
          cx="0"
          cy="0"
          r="67.5"
        />
        <circle
          className="fill-transparent stroke-border stroke-1"
          cx="0"
          cy="0"
          r="97.5"
        />

        {/* Sonar sweep animation - increased opacity */}
        <g className={styles['radarSpin']}>
          <path
            className="fill-primary/20"
            d="M 0 0 L 100 0 A 100 100 0 0 1 70.7 70.7 Z"
          />
        </g>

        {/* Axes - clipped to circle */}
        <g clipPath="url(#radarClip)">
          <line
            className="stroke-border/50 stroke-1"
            x1="-100"
            x2="100"
            y1="0"
            y2="0"
          />
          <line
            className="stroke-border/50 stroke-1"
            x1="0"
            x2="0"
            y1="-100"
            y2="100"
          />
        </g>

        {/* Curved Quadrant Labels - Top quadrants */}
        <text className="fill-primary text-[8px] font-bold tracking-wider uppercase">
          <textPath href="#languagesPath" startOffset="50%" textAnchor="middle">
            {translations('languages')}
          </textPath>
        </text>
        <text className="fill-sky-500 text-[8px] font-bold tracking-wider uppercase">
          <textPath
            href="#frameworksPath"
            startOffset="50%"
            textAnchor="middle"
          >
            {translations('frameworks')}
          </textPath>
        </text>

        {/* Curved Quadrant Labels - Bottom quadrants with upright text */}
        <text className="fill-slate-500 text-[8px] font-bold tracking-wider uppercase">
          <textPath
            href="#buildToolsPath"
            startOffset="50%"
            textAnchor="middle"
          >
            {translations('buildTools')}
          </textPath>
        </text>
        <text className="fill-violet-500 text-[8px] font-bold tracking-wider uppercase">
          <textPath
            href="#infrastructurePath"
            startOffset="50%"
            textAnchor="middle"
          >
            {translations('infrastructure')}
          </textPath>
        </text>
        {/* Blips */}
        {blips.map((blipItem: Blip): JSX.Element => {
          const isHovered: boolean = hoveredBlip === blipItem.id
          let blipColorClass: string = ''
          switch (blipItem.quadrant) {
            case 'languages': {
              blipColorClass = 'fill-primary stroke-primary-foreground'
              break
            }
            case 'frameworks': {
              blipColorClass = 'fill-sky-500 stroke-sky-100'
              break
            }
            case 'buildTools': {
              blipColorClass = 'fill-slate-500 stroke-slate-100'
              break
            }
            case 'infrastructure': {
              blipColorClass = 'fill-violet-500 stroke-violet-100'
              break
            }
            default: {
              blipColorClass = 'fill-foreground stroke-background'
            }
          }

          return (
            <g
              className="cursor-pointer transition-all duration-300"
              key={blipItem.id}
              style={{
                transform: `translate(${String(blipItem.xCoordinate)}px, ${String(blipItem.yCoordinate)}px) scale(${isHovered ? '1.5' : '1'})`,
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
                className={cn('transition-colors duration-300', blipColorClass)}
                r="3"
                strokeWidth="0.5"
              />
            </g>
          )
        })}
      </svg>
      {/* Tooltip */}
      {hoveredBlip !== null && (
        <div
          className="pointer-events-none absolute z-50 flex flex-col items-center justify-center rounded-lg border border-border bg-popover px-3 py-2 text-sm shadow-md transition-opacity animate-in fade-in zoom-in-95"
          style={((): React.CSSProperties => {
            const hoveredBlipData: Blip | undefined = blips.find(
              (blip: Blip): boolean => blip.id === hoveredBlip
            )
            const xPos: number = 50 + (hoveredBlipData?.xCoordinate ?? 0) / 2
            const yPos: number = 50 + (hoveredBlipData?.yCoordinate ?? 0) / 2
            return {
              left: `${String(xPos)}%`,
              top: `${String(yPos)}%`,
              transform: 'translate(-50%, -120%)',
            }
          })()}
        >
          {((): JSX.Element | null => {
            const blip: Blip | undefined = blips.find(
              (item: Blip): boolean => item.id === hoveredBlip
            )
            if (!blip) {
              return null
            }
            const Icon: LucideIcon = getSkillIcon(blip.iconName)
            return (
              <>
                <Icon className="mb-1 h-4 w-4 text-primary" />
                <span className="font-semibold text-popover-foreground">
                  {blip.name}
                </span>
                <span className="text-xs text-muted-foreground capitalize">
                  {blip.quadrant}
                </span>
              </>
            )
          })()}
        </div>
      )}
      {/* Center hub */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
      </div>
    </div>
  )
}
