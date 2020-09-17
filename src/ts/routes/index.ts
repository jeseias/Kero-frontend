import * as PageCTRL from './PageControllers'
import { sliderFunction } from '../controllers/homeController'

export const goToPage: (page: string) => void = async (page) => {
  if (page === '' || page === 'home') {
    sliderFunction()
    await PageCTRL.homePageCtrl()
  } else if (page === 'products') {
    await PageCTRL.productsPageCtrl()
  } else if (page === 'about') {
    await PageCTRL.aboutPageCtrl()
  } else if (page === 'carrinho') {
    await PageCTRL.carrinhoController() 
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