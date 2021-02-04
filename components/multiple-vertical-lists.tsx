import React, {useState} from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import {make as makeItems, Item} from './utils/items'
import {reorder} from './utils/array'

export default function MultipleVerticalLists(props: {
  numLists: number
  itemsPerList: number
}) {
  const numItems = props.numLists * props.itemsPerList
  const [items, setItems] = useState(makeItems(numItems))

  const onDragEnd = (result: DropResult) => {
    console.log(result)
    if (!result.destination) {
      return
    }

    const updated = reorder({
      items,
      fromIndex: result.source.index,
      toIndex: result.destination.index,
    })

    setItems(updated)
  }

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        {Array.from({length: props.numLists}, (_, index) => index).map(
          (index) => (
            <DroppableWithItems
              key={index}
              id={`droppable-${index}`}
              items={items}
              fromIndex={index * props.itemsPerList}
              toIndex={index * props.itemsPerList + props.itemsPerList - 1}
            />
          ),
        )}
      </DragDropContext>
    </div>
  )
}

function DroppableWithItems(props: {
  id: string
  items: Item[]
  fromIndex: number
  toIndex: number
}) {
  const betweenIndexes = (_, index: number) =>
    props.fromIndex <= index && index <= props.toIndex

  return (
    <Droppable droppableId={props.id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {props.items.filter(betweenIndexes).map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  aria-label={`${index}`}
                  data-testid="item"
                >
                  {item.content}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
