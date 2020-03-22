import {Item} from './items'

export type Reorder = (params: {
  items: Item[]
  fromIndex: number
  toIndex: number
}) => Item[]

export const reorder: Reorder = ({items, fromIndex, toIndex}) => {
  const copy = Array.from(items)
  const [removed] = copy.splice(fromIndex, 1)
  copy.splice(toIndex, 0, removed)

  return copy
}
