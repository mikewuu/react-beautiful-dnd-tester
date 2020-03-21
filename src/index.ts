import React from 'react'
import * as customQueries from './queries'
import {
  render as rtlRender,
  queries as defaultQueries,
  RenderOptions,
  RenderResult as RTLRenderResult,
} from '@testing-library/react'
import {Queries, BoundFunction} from '@testing-library/dom'

export type CustomQueries<Q extends Queries = typeof customQueries> = {
  [P in keyof Q]: BoundFunction<Q[P]>
}

export interface RenderResult extends RTLRenderResult, CustomQueries {
  drag: () => void
}

export const render = (
  ui: React.ReactElement,
  options?: RenderOptions,
): RenderResult => {
  const queries = {
    ...defaultQueries,
    ...customQueries,
    ...options?.queries,
  }

  const renderResult = rtlRender(ui, {
    ...options,
    queries,
  })

  return {
    drag: () => {},
    ...renderResult,
  }
}
