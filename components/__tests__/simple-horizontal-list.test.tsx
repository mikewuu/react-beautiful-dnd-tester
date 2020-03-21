import React from 'react'
import SimpleHorizontalList from '../simple-horizontal-list'
import {render} from '../../src'

it('drags an item in front of another', () => {
  const {drag, getAllByTestId} = render(<SimpleHorizontalList />, {
    dragDirection: 'horizontal',
  })

  let first = getAllByTestId(/item/i)[0]
  let second = getAllByTestId(/item/i)[1]

  drag(second).inFrontOf(first)
  first = getAllByTestId(/item/i)[0]
  expect(first.textContent).toBe(second.textContent)

  second = getAllByTestId(/item/i)[1]
  const fourth = getAllByTestId(/item/i)[3]

  drag(fourth).inFrontOf(second)
  second = getAllByTestId(/item/i)[1]
  expect(second.textContent).toBe(fourth.textContent)
})

it('drags an item behind another', () => {
  const {drag, getAllByTestId} = render(<SimpleHorizontalList />, {
    dragDirection: 'horizontal',
  })

  let first = getAllByTestId(/item/i)[0]
  const second = getAllByTestId(/item/i)[1]

  drag(first).behind(second)
  first = getAllByTestId(/item/i)[0]
  expect(first.textContent).toBe(second.textContent)

  const sixth = getAllByTestId(/item/i)[5]
  let ninth = getAllByTestId(/item/i)[8]

  drag(sixth).behind(ninth)
  ninth = getAllByTestId(/item/i)[8]
  expect(ninth.textContent).toBe(sixth.textContent)
})
