import {
  queryAllByAttribute,
  buildQueries,
  MatcherOptions,
  Matcher,
} from '@testing-library/dom'

export const define = (attribute: string) => {
  const queryAllBy = (
    container: HTMLElement,
    text: Matcher,
    options?: MatcherOptions,
  ): HTMLElement[] => queryAllByAttribute(attribute, container, text, options)

  const getMultipleError = (c: HTMLElement, text: Matcher) =>
    `Found multiple elements by: [${attribute}="${text}"]`
  const getMissingError = (c: HTMLElement, text: Matcher) =>
    `Unable to find an element by: [${attribute}="${text}"]`

  const [queryBy, getAllBy, getBy, findAllBy, findBy] = buildQueries(
    queryAllBy,
    getMultipleError,
    getMissingError,
  )

  return {queryAllBy, queryBy, getAllBy, getBy, findAllBy, findBy}
}
