import * as actions from './locations'

const allActions = actions as any

export type Actions<Q = typeof actions> = {
  [P in keyof Q]: (target: HTMLElement) => void
}

export type Drag = (source: HTMLElement) => Actions

export const horizontalDrag = dragIn('horizontal')
export const verticalDrag = dragIn('vertical')

function dragIn(direction: actions.DragDirection) {
  return (source: HTMLElement) => makeActions({source, direction})
}

function makeActions(context: actions.LocationContext): Actions {
  const all: any = {}
  return Object.keys(actions).reduce((acc, name) => {
    acc[name] = allActions[name](context)
    return acc
  }, all)
}
