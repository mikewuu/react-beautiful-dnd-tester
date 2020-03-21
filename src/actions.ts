import {fireEvent} from '@testing-library/react'

const draggableAttribute = 'data-rbd-draggable-id'

export type DragDirection = 'vertical' | 'horizontal'

export interface ActionContext {
  source: HTMLElement
  direction: DragDirection
}

export type Action = (context: ActionContext) => (target: HTMLElement) => void

export const inFrontOf: Action = ({source, direction}) => (target) => {
  const sourceIndex = dragIndexOf(source)
  const targetIndex = dragIndexOf(target)

  const positions = targetIndex - sourceIndex

  toggleFocus(source)
  move({source, positions, direction})
  toggleFocus(source)
}

export const behind = inFrontOf

function dragIndexOf(el: HTMLElement) {
  let index = null
  const siblings = siblingsOf(el)

  for (const [i, v] of siblings.entries()) {
    if (v === el) {
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

export interface MoveContext extends ActionContext {
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
