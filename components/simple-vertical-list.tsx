import React, {useState} from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'

export interface Item {
  id: string
  content: string
}

export default function SimpleVerticalList() {
  const makeItems = (count: number): Item[] =>
    Array.from({length: count}, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      content: `item ${k}`,
    }))

  const [items, setItems] = useState(makeItems(10))

  const reorder = (list: Item[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const updated = reorder(
      items,
      result.source.index,
      result.destination.index,
    )

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
