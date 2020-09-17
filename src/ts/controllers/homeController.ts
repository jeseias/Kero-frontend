import { toPage } from '../routes/PageControllers'

import DOM from '../views/elements'

export const sliderFunction: () => void = () => {
  let moveLength = 0
  const { bannerItems } = DOM.pages.home  

  // setInterval(() => {
  //   if (moveLength > 200) moveLength = 0
  //   bannerItems.forEach(item => {
  //     item.style.left = `-${moveLength}%`
  //   })
  //   moveLength += 100
  //   console.log(moveLength)
  //   clearInterval(1)
  // }, 2000)
}

export const homePageCtrl: () => Promise<void> = async () => {
  toPage('home')

} 