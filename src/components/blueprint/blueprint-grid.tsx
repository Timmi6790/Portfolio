import { type JSX, memo, type MemoExoticComponent } from 'react'

import type { FCStrict } from '@/types/fc'

interface BlueprintDecorationProperties {
  readonly className?: string
}

// eslint-disable-next-line max-lines-per-function
const BlueprintGridComponent: FCStrict<BlueprintDecorationProperties> = ({
  className,
}: BlueprintDecorationProperties): JSX.Element => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className ?? ''}`}
    // strict containment isolates layout/style/paint.
    // will-change: transform -> Promotes to compositor layer to minimize repaint on external reflows.
    style={{ contain: 'strict', willChange: 'transform' }}
  >
    {/* Deep Background Base */}
    <div className="absolute inset-0 bg-blueprint-bg" />

    <svg
      className="absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Major Grid Pattern (100px) */}
        <pattern
          height="100"
          id="grid-major"
          patternUnits="userSpaceOnUse"
          width="100"
        >
          <path
            d="M 100 0 L 0 0 0 100"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="1"
          />
        </pattern>

        {/* Minor Grid Pattern (20px) */}
        <pattern
          height="20"
          id="grid-minor"
          patternUnits="userSpaceOnUse"
          width="20"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>

      {/* Minor Grid Layer (Opacity 0.08) - No Mask */}
      <rect fill="url(#grid-minor)" height="100%" opacity="0.08" width="100%" />

      {/* Major Grid Layer (Opacity 0.15) - With Radial Mask */}
      <rect
        fill="url(#grid-major)"
        height="100%"
        opacity="0.15"
        style={{
          maskImage:
            'radial-gradient(circle at center, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle at center, black 40%, transparent 100%)',
        }}
        width="100%"
      />
    </svg>
  </div>
)

export const BlueprintGrid: MemoExoticComponent<
  FCStrict<BlueprintDecorationProperties>
> = memo(BlueprintGridComponent)
