import { toPage } from '../routes/PageControllers'

import DOM from '../views/elements'

let moveLength = 0
const { bannerItems } = DOM.pages.home 

export const sliderFunction = setInterval(() => {
  if (moveLength > 200) moveLength = 0

  bannerItems.forEach(item => {
    item.style.left = `-${moveLength}%`
  })

  console.log(moveLength)

  moveLength += 100
}, 2000)

export const callSlider: () => void = () => {
  console.log('I was called')
  sliderFunction
}


export const homePageCtrl: () => Promise<void> = async () => {
  toPage('home')
} 