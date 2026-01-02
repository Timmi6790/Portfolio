import React, { type JSX } from 'react'

import { BlueprintCorners } from '@/components/blueprint/blueprint-decoration'
import { BlueprintText } from '@/components/blueprint/blueprint-text'
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
    'clip-path-polygon group z-50 flex items-center gap-2 rounded-none border border-brand/30 bg-blueprint-bg/80 px-4 py-2 font-bold backdrop-blur-sm transition-all hover:border-brand hover:bg-brand/10 hover:text-blueprint-text'

  const content: JSX.Element = (
    <>
      <BlueprintCorners variant="bracket" />
      {children}
    </>
  )

  if (href !== undefined) {
    return (
      <BlueprintText
        as={Link}
        className={cn(baseStyles, className)}
        href={href}
        uppercase={true}
        variant="brand"
      >
        {content}
      </BlueprintText>
    )
  }

  return (
    <BlueprintText
      as="button"
      className={cn(baseStyles, className)}
      type="button"
      uppercase={true}
      variant="brand"
      onClick={onClick}
    >
      {content}
    </BlueprintText>
  )
}
