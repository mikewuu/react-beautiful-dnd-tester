import {make as makeItems} from './../items'
import {reorder} from './../array'

it('should reorder items', () => {
  const items = makeItems(10)

  const fromIndex = 3
  const toIndex = 7

  const updated = reorder({
    items,
    fromIndex,
    toIndex,
  })

  expect(updated[toIndex]).toMatchObject(items[fromIndex])
})
