import React from 'react'
import {render} from '../../src/index'

it('should throw an error if missing', () => {
  expect.assertions(1)
  const {getByDroppableId} = render(<div></div>)

  try {
    getByDroppableId(/foo/i)
  } catch (error) {
    expect(error).toMatchInlineSnapshot(`
      [TestingLibraryElementError: Unable to find an element by: [data-rbd-droppable-id="/foo/i"]

      [36m<body>[39m
        [36m<div>[39m
          [36m<div />[39m
        [36m</div>[39m
      [36m</body>[39m]
    `)
  }
})

it('should get the element', () => {
  const id = '1'
  const text = 'myDiv'
  const {getByDroppableId} = render(
    <div data-rbd-droppable-id={`${id}`}>{text}</div>,
  )

  expect(getByDroppableId(new RegExp(id, 'i')).textContent).toBe(text)
})

it('should get all elements', () => {
  const id = '1'
  const text = 'myDiv'
  const {getAllByDroppableId} = render(
    <div>
      <div data-rbd-droppable-id={`${id}`}>{text}</div>
      <div data-rbd-droppable-id={`${id}`}>{text}</div>
    </div>,
  )

  expect(getAllByDroppableId(new RegExp(id, 'i')).length).toBe(2)
})

it('should return null', () => {
  const id = '1'
  const {queryByDroppableId} = render(
    <div data-rbd-droppable-id="not-me"></div>,
  )

  expect(queryByDroppableId(new RegExp(id, 'i'))).toBeNull()
})

it('should return an empty array', () => {
  const id = '1'
  const {queryAllByDroppableId} = render(
    <div data-rbd-droppable-id="not-me"></div>,
  )

  expect(queryAllByDroppableId(new RegExp(id, 'i'))).toMatchObject([])
})

it('should find an element async', async () => {
  const id = '1'
  const text = 'myDiv'
  const {findByDroppableId} = render(
    <div data-rbd-droppable-id={`${id}`}>{text}</div>,
  )

  expect((await findByDroppableId(new RegExp(id, 'i'))).textContent).toBe(text)
})

it('should throw an error async', async () => {
  const id = '1'
  const text = 'myDiv'
  const {findByDroppableId} = render(
    <div data-rbd-droppable-id="not-me">{text}</div>,
  )

  const error = await findByDroppableId(new RegExp(id, 'i')).catch((e) => e)

  expect(error).toMatchInlineSnapshot(`
[TestingLibraryElementError: Unable to find an element by: [data-rbd-droppable-id="/1/i"]

[36m<body>[39m
  [36m<div>[39m
    [36m<div[39m
      [33mdata-rbd-droppable-id[39m=[32m"not-me"[39m
    [36m>[39m
      [0mmyDiv[0m
    [36m</div>[39m
  [36m</div>[39m
[36m</body>[39m]
`)
})

it('should error without finding elements async', async () => {
  const id = '1'
  const {findAllByDroppableId} = render(
    <div data-rbd-droppable-id="not-me"></div>,
  )

  const error = await findAllByDroppableId(new RegExp(id, 'i')).catch((e) => e)
  expect(error).toMatchInlineSnapshot(`
[TestingLibraryElementError: Unable to find an element by: [data-rbd-droppable-id="/1/i"]

[36m<body>[39m
  [36m<div>[39m
    [36m<div[39m
      [33mdata-rbd-droppable-id[39m=[32m"not-me"[39m
    [36m/>[39m
  [36m</div>[39m
[36m</body>[39m]
`)
})

it('should find all elements', async () => {
  const id = '1'
  const text = 'myDiv'
  const {findAllByDroppableId} = render(
    <div>
      <div data-rbd-droppable-id={`${id}`}>{text}</div>
      <div data-rbd-droppable-id={`${id}`}>{text}</div>
    </div>,
  )

  expect((await findAllByDroppableId(new RegExp(id, 'i'))).length).toBe(2)
})
