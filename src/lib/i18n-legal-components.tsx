/**
 * Shared i18n component mappings for legal pages
 * Used with next-intl's .rich() method to render XML-like tags as React components
 */

import { type ReactElement, type ReactNode } from 'react'

import type { RichTagsFunction } from 'next-intl'

import { Heading } from '@/components/ui/heading'

export interface LegalRichTagsFunctionMappers {
  addressBlock: RichTagsFunction
  contactBlock: RichTagsFunction
  emailLink: RichTagsFunction
  heading: RichTagsFunction
  link: RichTagsFunction
  list: RichTagsFunction
  listItem: RichTagsFunction
  section: RichTagsFunction
  text: RichTagsFunction
}

/**
 * Component mappings for legal page rich text rendering
 */
export const legalPageComponentMappings: LegalRichTagsFunctionMappers = {
  /**
   * Address block - displays multi-line addresses
   */
  addressBlock: (chunks: ReactNode): ReactElement => (
    <div className="text-sm whitespace-pre-line text-muted-foreground">
      {chunks}
    </div>
  ),

  /**
   * Contact block - displays contact information
   */
  contactBlock: (chunks: ReactNode): ReactElement => (
    <div className="text-sm whitespace-pre-line text-muted-foreground">
      {chunks}
    </div>
  ),

  /**
   * Email link - clickable mailto link
   */
  emailLink: (chunks: ReactNode): ReactElement => (
    <a
      className="font-medium text-primary hover:underline"
      href={`mailto:${chunks as string}`}
    >
      {chunks}
    </a>
  ),

  /**
   * Section heading
   */
  heading: (chunks: ReactNode): ReactElement => (
    <Heading as="h2" className="mb-3 text-xl font-semibold">
      {chunks}
    </Heading>
  ),

  /**
   * External link with proper attributes
   */
  link: (chunks: ReactNode): ReactElement => (
    <a
      className="text-primary hover:underline"
      href={chunks as string}
      rel="noopener noreferrer"
      target="_blank"
    >
      {chunks}
    </a>
  ),

  /**
   * Unordered list
   */
  list: (chunks: ReactNode): ReactElement => (
    <ul className="my-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
      {chunks}
    </ul>
  ),

  /**
   * List item
   */
  listItem: (chunks: ReactNode): ReactElement => (
    <li className="pl-1">{chunks}</li>
  ),

  /**
   * Section wrapper
   */
  section: (chunks: ReactNode): ReactElement => <div>{chunks}</div>,

  /**
   * Text paragraph
   */
  text: (chunks: ReactNode): ReactElement => (
    <p className="text-sm leading-relaxed text-muted-foreground">{chunks}</p>
  ),
}
