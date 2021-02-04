export const getAttribute = ({
  el,
  attribute,
}: {
  el: HTMLElement
  attribute: string
}) => {
  const val = el.getAttribute(attribute)

  if (val === null) {
    throw new Error(`Missing attribute '${attribute}'.`)
  }

  return val
}

export const findParent = ({
  child,
  query,
}: {
  child: HTMLElement
  query: string
}) => {
  const parent = child.closest(query)

  if (!parent) {
    throw new Error(`No parent element matches query '${query}'`)
  }

  return parent as HTMLElement
}

export const siblings = (
  el: HTMLElement,
  {attribute}: {attribute?: string} = {},
) => {
  const siblings = []
  let sibling = el.parentNode?.firstChild

  while (sibling) {
    if (isSibling(sibling as HTMLElement)) {
      siblings.push(sibling)
    }

    sibling = sibling.nextSibling
  }

  return siblings

  function isSibling(sibling: HTMLElement) {
    if (!attribute) {
      return true
    }
    return sibling.hasAttribute(attribute)
  }
}

export const children = ({
  parent,
  query,
}: {
  parent: HTMLElement
  query: string
}) => {
  return parent.querySelectorAll(query)
}

export const indexInList = ({
  el,
  list,
}: {
  el: HTMLElement
  list: NodeList | ChildNode[]
}) => {
  let index = null

  for (const [i, v] of list.entries()) {
    if (v === el) {
      index = i
    }
  }

  if (index === null) {
    throw new Error(`Could not find index of element in list.`)
  }

  return index
}
