export interface Item {
  id: string
  content: string
}

export const make = (count: number): Item[] =>
  Array.from({length: count}, (_, index) => index).map((index) => ({
    id: `item-${index}`,
    content: `item ${index}`,
  }))
