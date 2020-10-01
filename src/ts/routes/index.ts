import App from '../App'

import * as PageCTRL from './PageControllers'
import { slider, sliderFunction } from '../controllers/homeController'
import { loginHanlder } from '../controllers/authController'

export const goToPage: (page: string) => void = async (page) => {
  if (!App.AppData.loggedUser) {
    await loginHanlder()
  } 

  if (page !== 'home') {
    (function(w) {
      w = w || window; 
      var i = w.setInterval(function(){},100000); 
      while(i>=0) { w.clearInterval(i--); }
    })(window);
  } 

  if (page === '' || page === 'home') {
    slider(true)
    await PageCTRL.homePageCtrl()
  } else if (page === 'products') {
    await PageCTRL.productsPageCtrl()
  } else if (page === 'about') {
    await PageCTRL.aboutPageCtrl()
  } else if (page === 'carrinho') {
    await PageCTRL.carrinhoController() 
  } else if (page === 'dashboard') {
    await PageCTRL.dashboardPageCtrl() 
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