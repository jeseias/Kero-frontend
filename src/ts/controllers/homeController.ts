import { toPage } from '../routes/PageControllers'

import DOM from '../views/elements'

const { bannerItems } = DOM.pages.home 
let moveLength = 0

export const sliderFunction = () => () => {
  if (moveLength > 200) moveLength = 0

  bannerItems.forEach(item => {
    item.style.left = `-${moveLength}%`
  })

  moveLength += 100
} 

export const slider: (flag: boolean) => void = (flag) => {
  const intervalID = () => setInterval(sliderFunction(), 3000)
  
  if (flag) {
    intervalID()
  } else {
    clearInterval(intervalID())
  }
}


export const homePageCtrl: () => Promise<void> = async () => {
  toPage('home')
} 