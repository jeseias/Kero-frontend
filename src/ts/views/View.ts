export const removeChildren: (parent: HTMLElement) => void = 
  (parent) => {
    const children = Array.from(parent.children);
    children.forEach(child => {
      parent.removeChild(child)
    })
  } 

export const addChildren: (
    parent: HTMLElement, 
    data: any, 
    tempGenerator: (data: any) => string,
    where?: InsertPosition
  ) => void =
    (parent, data, tempGenerator, where) => {
      if (parent.children) {
        removeChildren(parent)
      }
  
      data.forEach((item: any) => parent.insertAdjacentHTML(where || 'beforeend', tempGenerator(item)))
    }