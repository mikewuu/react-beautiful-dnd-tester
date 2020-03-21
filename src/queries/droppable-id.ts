import {define} from './custom-attribute'

const {
  queryAllBy: queryAllByDroppableId,
  getAllBy: getAllByDroppableId,
  queryBy: queryByDroppableId,
  getBy: getByDroppableId,
  findBy: findByDroppableId,
  findAllBy: findAllByDroppableId,
} = define('data-rbd-droppable-id')

export {
  queryAllByDroppableId,
  getAllByDroppableId,
  queryByDroppableId,
  getByDroppableId,
  findByDroppableId,
  findAllByDroppableId,
}
