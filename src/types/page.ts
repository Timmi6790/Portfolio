import type { Metadata } from 'next'

import type { FCAsync, FCAsyncWithChildren, WithChildren } from '@/types/fc'

export interface PageParams<P extends object> {
  readonly params: Promise<P>
}

export interface PageParamsWithChildren<P extends object>
  extends PageParams<P>,
    WithChildren {}

export type RoutePageFC<P extends object> = FCAsync<PageParams<P>>

export type RoutePageWithChildrenFC<P extends object> = FCAsyncWithChildren<
  PageParams<P>
>

export type GenerateMetadataFC<P extends object> = (
  args: PageParams<P>
) => Promise<Metadata>
