import * as locations from './locations'

const allLocations = locations as any

export type Locations<Q = typeof locations> = {
  [P in keyof Q]: (target: HTMLElement) => void
}

export type Drag = (source: HTMLElement) => Locations

export const horizontalDrag = dragIn('horizontal')
export const verticalDrag = dragIn('vertical')

function dragIn(direction: locations.DragDirection) {
  return (source: HTMLElement) => makeLocations({source, direction})
}

function makeLocations(context: locations.LocationContext): Locations {
  const all: any = {}
  return Object.keys(locations).reduce((acc, name) => {
    acc[name] = allLocations[name](context)
    return acc
  }, all)
}
