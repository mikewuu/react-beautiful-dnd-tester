import React, {useState} from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import {make as makeItems} from './utils/items'
import {reorder} from './utils/array'

export default function SingleVerticalList() {
  const [items, setItems] = useState(makeItems(10))

  const onDragEnd = (result: DropResult) => {
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
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
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
    </DragDropContext>
  )
}
