import DOM from '../views/elements'

export const showAsideFull: () => void = () => {
  const { 
    aside: { asideToggleBtn, self: aside },
    header: { self: header },
    pages: { self: pages }
  } = DOM
  const elements = [aside, header, pages]
  

  const closeAside: () => void = () => {
    aside.classList.remove('slide')
    header.classList.remove('slide')
    pages.classList.remove('slide') 
  }

  asideToggleBtn.addEventListener('click', () => {
    aside.classList.toggle('slide')
    header.classList.toggle('slide')
    pages.classList.toggle('slide') 

    header.addEventListener('click', closeAside)
    pages.addEventListener('click', closeAside)

    elements.forEach(el => el.addEventListener('touchmove', closeAside))
  });

}