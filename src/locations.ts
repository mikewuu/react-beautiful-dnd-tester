import {
  siblings as siblingsOf,
  findParent,
  indexInList,
  children,
} from './../components/utils/dom'
import {fireEvent} from '@testing-library/react'

const ATTRIBUTE = {
  DROPPABLE_ID: 'data-rbd-droppable-id',
  DRAGGABLE_ID: 'data-rbd-draggable-id',
}

export type DragDirection = 'vertical' | 'horizontal'

export interface LocationContext {
  source: HTMLElement
  direction: DragDirection
}

export type Location = (
  context: LocationContext,
) => (target: HTMLElement) => void

export const inFrontOf: Location = ({source, direction}) => (target) => {
  guardCanDropBetweenLists({source, target})
  moveToSameList({source, target})
  dragInList({source, target, direction})
}

export const behind = inFrontOf

function moveToSameList({
  source,
  target,
}: {
  source: HTMLElement
  target: HTMLElement
}) {
  const sourceDroppable = droppableFor(source)
  const targetDroppable = droppableFor(target)

  const sameList = idOf(sourceDroppable) === idOf(targetDroppable)
  if (sameList) {
    return
  }

  const [sourceIndex, targetIndex] = droppableIndexes({
    source: sourceDroppable,
    target: targetDroppable,
  })

  const positions = targetIndex - sourceIndex

  move({source, positions, direction: 'horizontal'})
}

function droppableIndexes({
  source,
  target,
}: {
  source: HTMLElement
  target: HTMLElement
}) {
  const sourceParent = source.parentElement
  const targetParent = target.parentElement

  const notSiblings = sourceParent !== targetParent
  if (notSiblings) {
    throw new Error(
      'Currently, only dragging between direct siblings is supported.',
    )
  }

  if (!sourceParent) {
    throw new Error('Droppable cannot be a root element')
  }

  const allDroppables = children({
    parent: sourceParent,
    query: `[${ATTRIBUTE.DROPPABLE_ID}]`,
  })

  const sourceIndex = indexInList({el: source, list: allDroppables})
  const targetIndex = indexInList({el: target, list: allDroppables})

  return [sourceIndex, targetIndex]
}

function dragInList({
  source,
  target,
  direction,
}: {
  source: HTMLElement
  target: HTMLElement
  direction: DragDirection
}) {
  const sourceIndex = dragIndexOf(source)
  const targetIndex = dragIndexOf(target)

  const positions = targetIndex - sourceIndex

  move({source, positions, direction})
}

function dragIndexOf(handle: HTMLElement) {
  const draggableEl = findParent({
    child: handle,
    query: `[${ATTRIBUTE.DRAGGABLE_ID}]`,
  })

  const siblings = siblingsOf(draggableEl, {attribute: ATTRIBUTE.DRAGGABLE_ID})
  return indexInList({el: draggableEl, list: siblings})
}

function toggleFocus(el: HTMLElement) {
  fireEvent.keyDown(el, {keyCode: 32})
}

export interface MoveContext extends LocationContext {
  positions: number
}

function move({source, positions, direction}: MoveContext) {
  const keyCode = keyCodeFor({positions, direction})

  toggleFocus(source)

  for (let i = 0; i < Math.abs(positions); i++) {
    fireEvent.keyDown(source, {keyCode})
  }

  toggleFocus(source)
}

function keyCodeFor({
  positions,
  direction,
}: {
  positions: number
  direction: DragDirection
}) {
  if (direction === 'vertical') {
    return verticalKeyCode(positions)
  }

  return horizontalKeyCode(positions)
}

function verticalKeyCode(positions: number) {
  const arrow = positions > 0 ? 'down' : 'up'
  return arrow === 'up' ? 38 : 40
}

function horizontalKeyCode(positions: number) {
  const arrow = positions > 0 ? 'right' : 'left'
  return arrow === 'left' ? 37 : 39
}

function guardCanDropBetweenLists({
  source,
  target,
}: {
  source: HTMLElement
  target: HTMLElement
}) {
  const sourceDroppable = droppableFor(source)
  const targetDroppable = droppableFor(target)

  const sameDroppable = idOf(sourceDroppable) === idOf(targetDroppable)

  if (sameDroppable) {
    return
  }

  const sourceNextDroppable = findParent({
    child: sourceDroppable,
    query: `[${ATTRIBUTE.DROPPABLE_ID}]`,
  })

  const targetNextDroppable = findParent({
    child: targetDroppable,
    query: `[${ATTRIBUTE.DROPPABLE_ID}]`,
  })

  const isNested =
    sourceNextDroppable !== sourceDroppable ||
    targetNextDroppable !== targetDroppable

  if (isNested) {
    throw new Error('Nested droppables are not supported.')
  }
}

function droppableFor(el: HTMLElement) {
  return findParent({
    child: el,
    query: `[${ATTRIBUTE.DROPPABLE_ID}]`,
  })
}

function idOf(droppable: HTMLElement) {
  const id = droppable.getAttribute(ATTRIBUTE.DROPPABLE_ID)

  if (id === null) {
    throw new Error(
      `Not a droppable; should have attribute '${ATTRIBUTE.DROPPABLE_ID}'.`,
    )
  }

  return id
}
