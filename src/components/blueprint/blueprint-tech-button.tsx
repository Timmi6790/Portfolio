import React, { type JSX } from 'react'

import { BlueprintCorners } from '@/components/blueprint/blueprint-decoration'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utilities'
import type { FCWithRequiredChildren } from '@/types/fc'

import type { LinkProps } from 'next/link'

interface BlueprintTechButtonProperties {
  readonly className?: string
  readonly href?: LinkProps['href']
  readonly onClick?: () => void
}

export const BlueprintTechButton: FCWithRequiredChildren<
  BlueprintTechButtonProperties
> = ({
  children,
  className,
  href,
  onClick,
}: Readonly<
  BlueprintTechButtonProperties & { children: React.ReactNode }
>): JSX.Element => {
  const baseStyles: string =
    'clip-path-polygon group z-50 flex items-center gap-2 rounded-none border border-brand/30 bg-blueprint-bg/80 px-4 py-2 font-mono text-xs font-bold tracking-widest text-brand uppercase backdrop-blur-sm transition-all hover:border-brand hover:bg-brand/10 hover:text-blueprint-text'

  const content: JSX.Element = (
    <>
      <BlueprintCorners variant="bracket" />
      {children}
    </>
  )

  if (href !== undefined) {
    return (
      <Link className={cn(baseStyles, className)} href={href}>
        {content}
      </Link>
    )
  }

  return (
    <button
      className={cn(baseStyles, className)}
      type="button"
      onClick={onClick}
    >
      {content}
    </button>
  )
}
