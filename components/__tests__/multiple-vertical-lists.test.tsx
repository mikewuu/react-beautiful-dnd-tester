import React from 'react'
import {render, wait} from '@testing-library/react'
import MultipleVerticalLists from '../multiple-vertical-lists'
import {verticalDrag} from '../../src'
import {act} from 'react-dom/test-utils'
import {findParent} from '../utils/dom'

it('drags an item within the same list', () => {
  const itemsPerList = 4

  const {debug, getAllByTestId} = render(
    <MultipleVerticalLists numLists={2} itemsPerList={itemsPerList} />,
  )

  let first = findItemUsing(getAllByTestId)({
    itemsPerList,
    list: 1,
    position: 1,
  })

  const second = findItemUsing(getAllByTestId)({
    itemsPerList,
    list: 1,
    position: 2,
  })

  verticalDrag(second).inFrontOf(first)

  first = findItemUsing(getAllByTestId)({
    itemsPerList,
    list: 1,
    position: 1,
  })

  expect(first.textContent).toBe(second.textContent)

  // debug()
})

it('drags an item between list', async () => {
  const itemsPerList = 1

  const {debug, getAllByTestId} = render(
    <MultipleVerticalLists numLists={2} itemsPerList={itemsPerList} />,
  )

  const first = findItemUsing(getAllByTestId)({
    itemsPerList,
    list: 1,
    position: 1,
  })

  const parent = findParent({child: first, query: '[data-rbd-droppable-id]'})

  parent.getBoundingClientRect = () => ({
    x: 0,
    y: 0,
    width: 10,
    height: 5,
    top: 0,
    right: 100,
    bottom: 0,
    left: 8,
    toJSON() {
      return {
        x: 0,
        y: 0,
        width: 10,
        height: 5,
        top: 0,
        right: 100,
        bottom: 0,
        left: 8,
      }
    },
  })

  const second = findItemUsing(getAllByTestId)({
    itemsPerList,
    list: 2,
    position: 1,
  })

  findParent({
    child: second,
    query: '[data-rbd-droppable-id]',
  }).getBoundingClientRect = () => ({
    x: 20,
    y: 0,
    width: 10,
    height: 5,
    top: 0,
    right: 100,
    bottom: 0,
    left: 8,
    toJSON() {
      return {
        x: 20,
        y: 0,
        width: 10,
        height: 5,
        top: 0,
        right: 100,
        bottom: 0,
        left: 8,
      }
    },
  })

  verticalDrag(first).inFrontOf(second)

  const newSecond = findItemUsing(getAllByTestId)({
    itemsPerList,
    list: 2,
    position: 1,
  })

  expect(newSecond.textContent).toBe(first.textContent)
})

function findItemUsing(query: any) {
  return ({
    itemsPerList,
    list,
    position,
  }: {
    itemsPerList: number
    list: number
    position: number
  }) => {
    const listIndex = list - 1
    const positionIndex = position - 1
    const index = listIndex * itemsPerList + positionIndex
    return query(/item/i)[index]
  }
}
