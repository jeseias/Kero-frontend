import DOM, { $, GEBI } from '../views/elements'

import { productsPageCtrl } from '../controllers/productsController'
import { aboutPageCtrl } from '../controllers/aboutController'

const setHash: (hash: string) => void = 
  (hash) => window.location.hash = hash;

const setNavItemActive: (hash: string) => void = (hash) => {
  const { items, links } = DOM.header.nav
  const activeClass = 'nav__link--active'

  links.forEach(link => {
    link.hash.replace('#', '') !== hash
      ? link.classList.remove(activeClass) 
      : link.classList.add(activeClass)
  })
}

const toPage: (to: string) => void = (to) => {
  const currentPage = <HTMLDivElement | undefined>$('.page.visible')

  const setPage: () => void = () => {
    const page = <HTMLDivElement>GEBI(to)
    page.classList.add('visible') 
    setHash(to)
    setNavItemActive(to)
  }
  
  if (currentPage) {
    currentPage.classList.remove('visible');
    setPage();
  } else {
    setPage();
  }
}

const homepage: () => void = () => {
  toPage('home')
}

const aboutpage: () => void = () => {
  toPage('about')
} 

const carinhopage: () => void = () => {
  toPage('carinho')
}

const errorpage: () => void = () => {
  toPage('error')
}

export {
  homepage,
  aboutPageCtrl,
  productsPageCtrl,
  carinhopage,
  errorpage,
  toPage
}