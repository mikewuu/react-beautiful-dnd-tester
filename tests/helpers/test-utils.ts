//@ts-nocheck

import {CustomQueries} from './../../src/index'
import * as customQueries from '../../src/queries'

export interface TestRenderResult extends CustomQueries {
  container: HTMLElement
}

export function render(
  html: string,
  {container = document.createElement('div')} = {},
): TestRenderResult {
  container.innerHTML = html
  const containerQueries = getQueriesForElement<CustomQueries>(
    container,
    customQueries,
  )

  return {container, ...containerQueries}
}

export function cleanup() {
  document.body.innerHTML = ''
}

afterEach(cleanup)

function getQueriesForElement<T>(
  element: HTMLElement,
  queries: CustomQueries,
  initialValue = {},
): {
  [P in keyof T]: T[P]
} {
  return Object.keys(queries).reduce((helpers, key) => {
    const fn = queries[key]
    helpers[key] = fn.bind(null, element)
    return helpers
  }, initialValue)
}
