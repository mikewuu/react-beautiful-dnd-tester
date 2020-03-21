import React from 'react'
import {render} from '../src'

it('should export drag', () => {
  function MyComponent() {
    return <div></div>
  }

  const {drag} = render(<MyComponent />)

  expect(drag).toBeDefined()
})
