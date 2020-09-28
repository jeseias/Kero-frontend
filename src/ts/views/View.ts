import { alertUser } from '../models/Alert'

export const removeChildren: (parent: HTMLElement) => void = 
  (parent) => {
    const children = Array.from(parent.children);
    children.forEach(child => {
      parent.removeChild(child)
    })
  } 
  
export const addChild: <T>(
  parent: HTMLDivElement, 
  data: T, 
  tempGenerator: (data: T) => string,
  where?: InsertPosition
) => void =
  (parent, data, tempGenerator, where) => {
    if (parent.children) {
      removeChildren(parent)
    }

    parent.insertAdjacentHTML(where || 'afterbegin', tempGenerator(data))
  }

export const userInputNotifacation: (args: [HTMLInputElement | HTMLSelectElement, string][]) => void = (input) => {
  input.forEach(element => {
    if (!element[0].value) return alertUser(false, element[1])
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

/**
 * Cleans up all form fields
 * @param inputs All the inputs that the property value to be clean up
 * @param files All inputs that take in files to be nullified
 * @param imgBox If the is an image box to clean
 */
export const formFieldsCleaner: (
  inputs: (HTMLInputElement | HTMLTextAreaElement)[], 
  files: HTMLInputElement[] | null, 
  imgBox?: HTMLDivElement
) => void =
  (inputs, files, imgBox) => {
    inputs.forEach(input => input.value = '')
    if (files) files.forEach(input => input.files = null) 

    if (imgBox) {
      imgBox.removeChild(imgBox.firstElementChild!)
      imgBox.classList.remove('hasimg')
      imgBox.classList.add('empty')
    }
  }