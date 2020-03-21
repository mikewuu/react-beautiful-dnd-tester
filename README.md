# Beautiful Tests for Beautiful Drag and Drops

An extension for the `testing-library/react-testing-library` that adds a few
useful utility functions to simulate dragging.

```
Currently only tested with simple lists. Nested lists and dragging from one list to another is currently **not** supported. P/Rs welcome!
```

## Install

`npm install --save-dev react-beautiful-dnd-tester`

## Usage

`react-beautiful-dnd-tester` exports new queries, and actions on top of the
default queries from RTL's (`react-testing-library`) `render` so make sure
you're importing the correct `render`:

```javascript
import {render} from 'react-beautiful-dnd-tester`
```

All custom options are still forwarded to RTL's `render` so there should be no
other changes in your tests

### Drag

Render now returns a `drag` method to initiate a drag. Pass in the HTMLElement
you'd like to drag. _Make sure it's a drag handler!_

```javascript
const {drag, getAllByTestId} = render(<SimpleVerticalList />)

let first = getAllByTestId(/item/i)[0]
let second = getAllByTestId(/item/i)[1]
```

Once you've got your element, you're ready to drag!

#### `inFrontOf`

`drag(second).inFrontOf(first)`

#### `behind`

`drag(first).behind(second)`

### Vertical List

## Examples

Check out
