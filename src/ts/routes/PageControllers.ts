import { productsPageCtrl } from '../controllers/productsController'
import { aboutPageCtrl } from '../controllers/aboutController'
import { homePageCtrl } from '../controllers/homeController'
import { cartController } from '../controllers/cartController'
import { dashboardPageCtrl } from '../controllers/dashboardController'

import DOM, { $, GEBI } from '../views/elements'

const setHash: (hash: string) => void = 
  (hash) => window.location.hash = hash;

const setNavItemActive: (hash: string) => void = (hash) => {
  const { links } = DOM.aside.nav
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

const errorpage: () => void = () => {
  toPage('error')
}

export {
  homePageCtrl,
  aboutPageCtrl,
  productsPageCtrl,
  cartController,
  dashboardPageCtrl,
  errorpage,
  toPage
}