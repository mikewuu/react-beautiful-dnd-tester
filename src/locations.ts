import {fireEvent} from '@testing-library/react'

const draggableAttribute = 'data-rbd-draggable-id'

export type DragDirection = 'vertical' | 'horizontal'

export interface LocationContext {
  source: HTMLElement
  direction: DragDirection
}

export type Location = (
  context: LocationContext,
) => (target: HTMLElement) => void

export const inFrontOf: Location = ({source, direction}) => (target) => {
  const sourceIndex = dragIndexOf(source)
  const targetIndex = dragIndexOf(target)

  const positions = targetIndex - sourceIndex

  toggleFocus(source)
  move({source, positions, direction})
  toggleFocus(source)
}

export const behind = inFrontOf

function dragIndexOf(handle: HTMLElement) {
  const draggableEl = handle.closest(
    `[${draggableAttribute}]`,
  ) as HTMLElement | null

  if (!draggableEl) {
    throw new Error(
      `Could not find draggable element. Are you sure you provided a drag handler?`,
    )
  }

  let index = null

  const siblings = siblingsOf(draggableEl)

  for (const [i, v] of siblings.entries()) {
    if (v === draggableEl) {
      index = i
    }
  }

  if (index === null) {
    throw new Error(
      `Not a draggable element; missing attribute '${draggableAttribute}'.`,
    )
  }

  return index
}

function siblingsOf(el: HTMLElement) {
  const siblings = []
  let sibling = el.parentNode?.firstChild

  while (sibling) {
    if ((sibling as HTMLElement).hasAttribute(draggableAttribute)) {
      siblings.push(sibling)
    }

    sibling = sibling.nextSibling
  }

  return siblings
}

function toggleFocus(el: HTMLElement) {
  fireEvent.keyDown(el, {keyCode: 32})
}

export interface MoveContext extends LocationContext {
  positions: number
}

function move({source, positions, direction}: MoveContext) {
  const keyCode = keyCodeFor({positions, direction})

  for (let i = 0; i < Math.abs(positions); i++) {
    fireEvent.keyDown(source, {keyCode})
  }
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
