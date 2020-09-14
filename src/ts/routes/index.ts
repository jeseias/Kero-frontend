import * as PageCTRL from './PageControllers'

export const goToPage: (page: string) => void = (page) => {
  if (page === '' || page === 'home') {
    PageCTRL.homepage()
  } else if (page === 'products') {
    PageCTRL.productspage()
  } else if (page === 'about') {
    PageCTRL.aboutpage()
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