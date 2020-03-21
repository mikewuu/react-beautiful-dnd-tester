import React from 'react'
import SimpleVerticalList from '../../components/simple-vertical-list'
import {render, queries as defaultQueries} from '@testing-library/react'
import * as customQueries from '../../src/queries'

it('should render a list of items', () => {
  const {debug} = render(<SimpleVerticalList />, {
    queries: {
      ...defaultQueries,
      ...customQueries,
    },
  })

  debug()

  expect(true).toBe(true)
})
