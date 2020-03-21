# Beautiful Tests for Beautiful Drag and Drops

An expressive API for dragging objects in a test.

`verticalDrag(this).inFrontOf(that)`

This package uses `fireEvent` from `@testing-library/react`.

```
Currently only tested with simple lists.
Nested lists and dragging from one list to another is currently NOT supported.

P/Rs welcome!
```

## Install

`npm install --save-dev react-beautiful-dnd-tester`

## Usage

There are 2 drag methods:

- `verticalDrag`
- `horizontalDrag`

Use the one appropriate for your list, so if your `Droppable` looks like:

```javascript
<Droppable droppableId="droppable" direction="horizontal">
  ...
</Droppable>
```

Make sure you're importing `horizontalDrag`:

```javascript
import {horizontalDrag} from 'react-beautiful-dnd-tester`
```

There are also 2 location methods:

- `inFrontOf`
- `behind`

Feel free to use whichever reads better.

### Performing a Drag

Provide the target element to the drag function, and call a location function
with the reference elment. _Make sure both elements are drag handlers!_

**Example**

```jsx
import {horizontalDrag} from 'react-beautiful-dnd-tester`;

it('should drag', () => {
    const {getAllByTestId} = render(<SimpleHorizontalList />);
    let second = getAllByTestId(/item/i)[1];        // target
    let first = getAllByTestId(/item/i)[0];          // reference

    horizontalDrag(second).inFrontOf(first);

    /**
     * If you've updated the state correctly,
     * the elements will automatically be
     * updated to reflect the new order.
    **/
   const newFirst = getAllByTestId(/item/i)[0];
   expect(newFirst.textContent).toBe(second.textContent);
})
```

## Examples

For more examples, check out the components directory.
