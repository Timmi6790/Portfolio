/* eslint-disable max-lines-per-function */
import { type JSX } from 'react'

import { Quote } from 'lucide-react'
import Image from 'next/image'

import { BlueprintText } from '@/components/blueprint/blueprint-text'
import {
  Card,
  CARD_DECORATIONS,
  CARD_HOVERS,
  CARD_VARIANTS,
} from '@/components/ui/card'
import type { FCStrict } from '@/types/fc'

export interface TestimonialItem {
  readonly company: string
  readonly image: string
  readonly name: string
  readonly quote: string
  readonly role: string
}

interface TestimonialCardProperties {
  readonly item: TestimonialItem
}

export const TestimonialCard: FCStrict<TestimonialCardProperties> = ({
  item,
}: TestimonialCardProperties): JSX.Element => {
  return (
    <Card
      className="p-8"
      decorative={CARD_DECORATIONS.OVERLAY}
      hover={CARD_HOVERS.MODERATE}
      variant={CARD_VARIANTS.INTERACTIVE}
    >
      <div
        aria-hidden="true"
        className="absolute top-4 right-4 opacity-10 transition-opacity group-hover:opacity-20"
      >
        <Quote className="h-16 w-16 text-primary" />
      </div>

      <figure className="relative z-10 flex h-full flex-col">
        <BlueprintText
          as="blockquote"
          className="mb-6 flex-1 font-sans leading-relaxed tracking-normal normal-case italic"
          variant="muted"
        >
          {`“${item.quote}”`}
        </BlueprintText>

        <figcaption className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-primary/20 transition-all group-hover:ring-primary/50">
            <Image
              alt={`${item.name} avatar`}
              className="object-cover"
              fill={true}
              sizes="64px"
              src={item.image || '/placeholder.svg'}
            />
          </div>
          <div>
            <BlueprintText
              as="h3"
              className="text-lg font-bold"
              uppercase={true}
              variant="brand"
            >
              {item.name}
            </BlueprintText>
            <BlueprintText
              as="p"
              className="text-sm"
              uppercase={true}
              variant="default"
            >
              {item.role}
            </BlueprintText>
            <BlueprintText as="p" className="text-sm" variant="muted">
              {item.company}
            </BlueprintText>
          </div>
        </figcaption>
      </figure>
    </Card>
  )
}
