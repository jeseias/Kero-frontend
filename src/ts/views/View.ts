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

export const setThisActive: (
  el: HTMLDivElement, 
  list: HTMLDivElement[],
  classStr: string
) => void =
  (el, list, classStr) => {
    const activeEl = list.filter(el => el.classList.contains(classStr))[0]

    if (activeEl) activeEl.classList.remove(classStr)
    el.classList.add(classStr);
  }

export const textShorter: (no: number, text: string) => string = 
  (no, text) => {
    let finalText = text
    
    if(finalText.length > no) {
      finalText = `${finalText.slice(0, no)} ...` 
    }

    return finalText
  }