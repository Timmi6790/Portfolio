import { type JSX, type ReactNode } from 'react'

import { LazyLoad } from '@/components/common/lazy-load'
import type { FCWithRequiredChildren, WithRequiredChildren } from '@/types/fc'

import { BlueprintFrame } from './blueprint-frame'
import { BlueprintSectionWrapper } from './blueprint-primitives'

interface BlueprintContainerProperties extends WithRequiredChildren {
  readonly className?: string
  readonly id?: string
  readonly isLazy?: boolean
  readonly lazyRootMargin?: string
  readonly overlay?: ReactNode
}

const BlueprintContainer: FCWithRequiredChildren<
  BlueprintContainerProperties
> = ({
  children,
  className,
  id: componentId,
  isLazy = false, // Default to eager loading
  lazyRootMargin,
  overlay,
}: BlueprintContainerProperties): JSX.Element => {
  const lazyLoadProperties: { rootMargin?: string } =
    lazyRootMargin === undefined ? {} : { rootMargin: lazyRootMargin }

  return (
    <BlueprintSectionWrapper
      className={className ?? ''}
      componentId={componentId}
      isLazy={isLazy}
    >
      {isLazy ? (
        <LazyLoad
          className="flex h-full w-full flex-1 flex-col items-center justify-center"
          {...lazyLoadProperties}
        >
          <BlueprintFrame className={className ?? ''} overlay={overlay}>
            {children}
          </BlueprintFrame>
        </LazyLoad>
      ) : (
        <BlueprintFrame className={className ?? ''} overlay={overlay}>
          {children}
        </BlueprintFrame>
      )}
    </BlueprintSectionWrapper>
  )
}

export { BlueprintContainer }
