import { type JSX, memo, type MemoExoticComponent, type ReactNode } from 'react'

import type {
  FCStrict,
  FCWithRequiredChildren,
  WithRequiredChildren,
} from '@/types/fc'

import { BlueprintGrid } from './blueprint-grid'

interface BlueprintFrameProperties extends WithRequiredChildren {
  readonly className?: string
  readonly overlay?: ReactNode
}

interface BlueprintRulerProperties {
  readonly className?: string
}

const RULER_PATH: string =
  'M0 0v8 M4 0v4 M8 0v4 M12 0v4 M16 0v4 M20 0v8 M24 0v4 M28 0v4 M32 0v4 M36 0v4 M40 0v8 M44 0v4 M48 0v4 M52 0v4 M56 0v4 M60 0v8 M64 0v4 M68 0v4 M72 0v4 M76 0v4 M80 0v8'

const BlueprintRulerComponent: FCStrict<BlueprintRulerProperties> = ({
  className,
}: BlueprintRulerProperties): JSX.Element => (
  <svg
    aria-hidden="true"
    className={`absolute h-2 w-24 overflow-visible ${className ?? ''}`}
    style={{ contain: 'strict' }}
    {...{ height: 8, width: 96 }}
  >
    <path
      className="stroke-brand/40"
      d={RULER_PATH}
      fill="none"
      strokeWidth="1"
    />
  </svg>
)

const BlueprintRuler: MemoExoticComponent<FCStrict<BlueprintRulerProperties>> =
  memo(BlueprintRulerComponent)

export const BlueprintFrame: FCWithRequiredChildren<
  BlueprintFrameProperties
  // eslint-disable-next-line max-lines-per-function
> = ({
  children,
  className,
  overlay,
}: BlueprintFrameProperties): JSX.Element => (
  <div
    className={`flex h-full w-full flex-1 flex-col items-center justify-center ${className ?? ''}`}
  >
    <BlueprintGrid />
    <div
      className="pointer-events-none absolute inset-[var(--app-padding)] border-[0.5px] border-brand/30 select-none"
      style={{ contain: 'layout style', willChange: 'transform' }}
    >
      {/* Optimized: Single SVG for all 4 corners */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        {/* Top-left */}
        <line
          className="stroke-brand"
          strokeWidth="1"
          x1="0"
          x2="8"
          y1="0"
          y2="0"
        />
        {/* Top-right */}
        <line
          className="stroke-brand"
          strokeWidth="1"
          x1="100%"
          x2="calc(100% - 8px)"
          y1="0"
          y2="0"
        />
        {/* Bottom-left */}
        <line
          className="stroke-brand"
          strokeWidth="1"
          x1="0"
          x2="8"
          y1="100%"
          y2="100%"
        />
        {/* Bottom-right */}
        <line
          className="stroke-brand"
          strokeWidth="1"
          x1="100%"
          x2="calc(100% - 8px)"
          y1="100%"
          y2="100%"
        />
      </svg>

      <BlueprintRuler className="top-0 left-10" />
      <BlueprintRuler className="right-10 bottom-0 rotate-180" />
    </div>
    <div className="relative z-10 container px-[var(--app-padding)]">
      {children}
    </div>
    {overlay}
  </div>
)
