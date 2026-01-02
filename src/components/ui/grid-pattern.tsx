import { type JSX, memo, type MemoExoticComponent } from 'react'

import { cn } from '@/lib/utilities'
import type { FCStrict } from '@/types/fc'

interface GridPatternProperties {
  readonly className?: string
  readonly offsetX?: number
  readonly offsetY?: number
  readonly size?: number
}

const GridPatternComponent: FCStrict<GridPatternProperties> = ({
  className,
  offsetX = 0,
  offsetY = 0,
  size = 32,
}: GridPatternProperties): JSX.Element => {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        'absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-[var(--pattern-grid)]/10',
        className
      )}
      style={{ contain: 'strict', willChange: 'transform' }}
      {...{
        height: '100%',
        width: '100%',
      }}
    >
      <defs>
        <pattern
          height={size}
          id="grid-pattern"
          patternUnits="userSpaceOnUse"
          width={size}
          x={offsetX}
          y={offsetY}
        >
          <path
            d={`M.5 ${String(size)}V.5H${String(size)}`}
            fill="none"
            strokeDasharray="0"
          />
        </pattern>
      </defs>
      <rect
        fill="url(#grid-pattern)"
        height="100%"
        strokeWidth="0"
        width="100%"
      />
    </svg>
  )
}

export const GridPattern: MemoExoticComponent<FCStrict<GridPatternProperties>> =
  memo(GridPatternComponent)
