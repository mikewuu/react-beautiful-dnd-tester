import {make} from '../items'

it('should make given number of items', () => {
  const numItems = 7

  expect(make(numItems).length).toBe(numItems)
})
