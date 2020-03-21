import {BoundFunction, Queries} from '@testing-library/dom'
import React from 'react'
import * as customQueries from './queries'
import {
  render as rtlRender,
  queries as defaultQueries,
  RenderOptions as RTLRenderOptions,
  RenderResult as RTLRenderResult,
} from '@testing-library/react'
import * as actions from './actions'

export type Actions<Q = typeof actions> = {
  [P in keyof Q]: (target: HTMLElement) => void
}

export type CustomQueries<Q extends Queries = typeof customQueries> = {
  [P in keyof Q]: BoundFunction<Q[P]>
}

export type Drag = (source: HTMLElement) => Actions

export interface RenderResult extends RTLRenderResult, CustomQueries {
  drag: Drag
}

export interface RenderOptions extends RTLRenderOptions {
  dragDirection?: actions.DragDirection
}

export const render = (
  ui: React.ReactElement,
  {
    dragDirection = 'vertical',
    queries: userQueries,
    ...rtlOptions
  }: RenderOptions = {},
): RenderResult => {
  const queries = {
    ...defaultQueries,
    ...customQueries,
    ...userQueries,
  }

  const {container, ...renderResult} = rtlRender(ui, {
    ...rtlOptions,
    queries,
  })

  const drag = dragIn(dragDirection)

  return {
    drag,
    container,
    ...renderResult,
  }
}

function dragIn(direction: actions.DragDirection) {
  return (source: HTMLElement) => makeActions({source, direction})
}

const allActions = actions as any

function makeActions(context: actions.ActionContext): Actions {
  const all: any = {}
  return Object.keys(actions).reduce((acc, name) => {
    acc[name] = allActions[name](context)
    return acc
  }, all)
}
