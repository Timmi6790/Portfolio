import { type JSX, memo, type MemoExoticComponent } from 'react'

import type { FCStrict } from '@/types/fc'

const TRANSMISSION_END: string = ':: END_OF_TRANSMISSION ::'

const TransmissionEndComponent: FCStrict = (): JSX.Element => (
  <div className="mt-16 text-center opacity-60 select-none">
    <svg
      aria-hidden="true"
      className="inline-block h-10 w-64 overflow-visible"
      role="img"
      style={{ contain: 'strict' }}
      {...{
        height: 40,
        width: 256,
      }}
    >
      <rect
        className="fill-blueprint-bg stroke-brand/30"
        height="100%"
        rx="2"
        strokeWidth="1"
        width="100%"
        x="0"
        y="0"
      />
      <text
        className="fill-brand font-mono text-[10px] tracking-[0.2em] uppercase"
        dominantBaseline="middle"
        textAnchor="middle"
        x="50%"
        y="50%"
      >
        {TRANSMISSION_END}
      </text>
    </svg>
  </div>
)

export const TransmissionEnd: MemoExoticComponent<FCStrict> = memo(
  TransmissionEndComponent
)
