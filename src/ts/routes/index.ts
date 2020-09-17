import * as PageCTRL from './PageControllers'
import { sliderFunction } from '../controllers/homeController'

export const goToPage: (page: string) => void = (page) => {
  if (page === '' || page === 'home') {
    sliderFunction()
    PageCTRL.homePageCtrl()
  } else if (page === 'products') {
    PageCTRL.productsPageCtrl()
  } else if (page === 'about') {
    PageCTRL.aboutPageCtrl()
  } else if (page === 'carinho') {
    PageCTRL.carinhopage() 
  } else {
    PageCTRL.errorpage() 
  }
}

export const PageSwitcher: () => void = () => {
  ['hashchange', 'load'].forEach((event: string) => {
    window.addEventListener(event, () => {
      const hash = window.location.hash.slice(1)
      goToPage(hash)
    })
  })
}