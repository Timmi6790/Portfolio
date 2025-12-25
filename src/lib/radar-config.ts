import type {
  LabelPathsType,
  QuadrantAnglesType,
  QuadrantStylesType,
  RadarConfigType,
} from '@/types/tech-radar'

/**
 * Radar dimensions and layout
 */
export const RADAR_CONFIG: RadarConfigType = {
  /** Animation settings */
  animation: {
    sonarSweepAngle: 45,
    sonarSweepRadius: 180,
  },

  /** Blip positioning constraints */
  blips: {
    hoverScale: 1.5,
    maxRadius: 170,
    minRadius: 10,
    size: 5,
    strokeWidth: 0.5,
  },

  /** Background circle radii */
  circles: {
    inner: 80,
    middle: 130,
    outer: 180,
  },

  /** Jitter amounts for position randomization */
  jitter: {
    angle: 0.1,
    radius: 2,
  },

  /** Quadrant label positioning */
  labels: {
    bottomRadius: 205,
    fontSize: 14,
    topRadius: 205,
  },

  /** Physics engine settings for blip distribution */
  physics: {
    iterations: 200,
    maxSpeed: 4,
    noiseAmount: 0.5,
    repulsionStrength: 2.5,
    springStrength: 0.3,
    tangentForce: 0.05,
    wallRepulsionStrength: 2,
  },

  /** Size of the SVG viewBox */
  viewBox: {
    height: 440,
    max: 220,
    min: -220,
    width: 440,
  },
} as const

/**
 * Quadrant angle definitions (in radians)
 */
export const QUADRANT_ANGLES: QuadrantAnglesType = {
  buildTools: {
    end: Math.PI,
    start: Math.PI / 2,
  },
  frameworks: {
    end: 2 * Math.PI,
    start: (3 * Math.PI) / 2,
  },
  infrastructure: {
    end: Math.PI / 2,
    start: 0,
  },
  languages: {
    end: (3 * Math.PI) / 2,
    start: Math.PI,
  },
} as const

/**
 * Quadrant visual styling
 */
export const QUADRANT_STYLES: QuadrantStylesType = {
  buildTools: {
    blipColor: 'fill-slate-500 stroke-slate-100',
    labelColor: 'fill-slate-500',
  },
  frameworks: {
    blipColor: 'fill-sky-500 stroke-sky-100',
    labelColor: 'fill-sky-500',
  },
  infrastructure: {
    blipColor: 'fill-violet-500 stroke-violet-100',
    labelColor: 'fill-violet-500',
  },
  languages: {
    blipColor: 'fill-primary stroke-primary-foreground',
    labelColor: 'fill-primary',
  },
} as const

/**
 * SVG path definitions for curved text
 */
const numberToString: (number: number) => string = String

export const LABEL_PATHS: LabelPathsType = {
  buildTools: `M -${numberToString(RADAR_CONFIG.labels.bottomRadius)},0 A ${numberToString(RADAR_CONFIG.labels.bottomRadius)},${numberToString(RADAR_CONFIG.labels.bottomRadius)} 0 0,0 0,${numberToString(RADAR_CONFIG.labels.bottomRadius)}`,
  frameworks: `M 0,-${numberToString(RADAR_CONFIG.labels.topRadius)} A ${numberToString(RADAR_CONFIG.labels.topRadius)},${numberToString(RADAR_CONFIG.labels.topRadius)} 0 0,1 ${numberToString(RADAR_CONFIG.labels.topRadius)},0`,
  infrastructure: `M 0,${numberToString(RADAR_CONFIG.labels.bottomRadius)} A ${numberToString(RADAR_CONFIG.labels.bottomRadius)},${numberToString(RADAR_CONFIG.labels.bottomRadius)} 0 0,0 ${numberToString(RADAR_CONFIG.labels.bottomRadius)},0`,
  languages: `M -${numberToString(RADAR_CONFIG.labels.topRadius)},0 A ${numberToString(RADAR_CONFIG.labels.topRadius)},${numberToString(RADAR_CONFIG.labels.topRadius)} 0 0,1 0,-${numberToString(RADAR_CONFIG.labels.topRadius)}`,
} as const
