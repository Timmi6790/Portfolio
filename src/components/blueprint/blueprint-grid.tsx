import { type JSX } from 'react'

import type { FCStrict } from '@/types/fc'

interface BlueprintDecorationProperties {
  readonly className?: string
}

// Advanced Blueprint Grid
export const BlueprintGrid: FCStrict<BlueprintDecorationProperties> = ({
  className,
}: BlueprintDecorationProperties): JSX.Element => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className ?? ''}`}
    style={{ transform: 'translateZ(0)', willChange: 'transform' }}
  >
    {/* Deep Background Base */}
    <div className="absolute inset-0 bg-blueprint-bg dark:bg-blueprint-bg" />

    {/* Major Grid Lines (100px) */}
    <div
      className="absolute inset-0 z-0 opacity-[0.15]"
      style={{
        backgroundImage: `linear-gradient(to right, #60A5FA 1px, transparent 1px),
                          linear-gradient(to bottom, #60A5FA 1px, transparent 1px)`,
        backgroundSize: '100px 100px',
        maskImage:
          'radial-gradient(circle at center, black 40%, transparent 100%)', // Fade out edges
      }}
    />

    {/* Minor Grid Lines (20px) */}
    <div
      className="absolute inset-0 z-0 opacity-[0.08]"
      style={{
        backgroundImage: `linear-gradient(to right, #60A5FA 0.5px, transparent 0.5px),
                          linear-gradient(to bottom, #60A5FA 0.5px, transparent 0.5px)`,
        backgroundSize: '20px 20px',
      }}
    />
  </div>
)
