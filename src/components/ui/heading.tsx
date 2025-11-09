import { type ComponentPropsWithoutRef, type JSX } from 'react'

const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

type HeadingTag = (typeof HEADING_TAGS)[number]

type HeadingProperties<Tag extends HeadingTag = 'h2'> = {
  readonly as?: Tag
} & Omit<ComponentPropsWithoutRef<Tag>, 'as'>

export function Heading<Tag extends HeadingTag = 'h2'>(
  { as, ...properties }: HeadingProperties<Tag>,
): JSX.Element {
  const Tag = (as ?? 'h2') as HeadingTag
  const dataHeadingTag = Tag.toUpperCase() as Uppercase<HeadingTag>

  return (
    <Tag
      {...properties}
      data-heading-tag={dataHeadingTag}
    />
  )
}
