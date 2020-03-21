import React from 'react'
import SimpleVerticalList from '../simple-vertical-list'
import {render} from '@testing-library/react'
import {verticalDrag} from '../../src'

it('drags an item in front of another', () => {
  const {getAllByTestId} = render(<SimpleVerticalList />)

  let first = getAllByTestId(/item/i)[0]
  let second = getAllByTestId(/item/i)[1]

  verticalDrag(second).inFrontOf(first)
  first = getAllByTestId(/item/i)[0]
  expect(first.textContent).toBe(second.textContent)

  second = getAllByTestId(/item/i)[1]
  const fourth = getAllByTestId(/item/i)[3]

  verticalDrag(fourth).inFrontOf(second)
  second = getAllByTestId(/item/i)[1]
  expect(second.textContent).toBe(fourth.textContent)
})

it('drags an item behind another', () => {
  const {getAllByTestId} = render(<SimpleVerticalList />)

  let first = getAllByTestId(/item/i)[0]
  const second = getAllByTestId(/item/i)[1]

  verticalDrag(first).behind(second)
  first = getAllByTestId(/item/i)[0]
  expect(first.textContent).toBe(second.textContent)

  const sixth = getAllByTestId(/item/i)[5]
  let ninth = getAllByTestId(/item/i)[8]

  verticalDrag(sixth).behind(ninth)
  ninth = getAllByTestId(/item/i)[8]
  expect(ninth.textContent).toBe(sixth.textContent)
})
