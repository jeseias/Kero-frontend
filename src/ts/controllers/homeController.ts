import { ProductAPI } from '../models/Products'

import { toPage } from '../routes/PageControllers'

import DOM, { afterDOM } from '../views/elements'
import { mountPopularProducts } from '../views/HomeView'
import { showDetailedProductModal, bookingProducts } from '../shared/products.shared'

import { IProduct } from '../constants/interfaces'

const { bannerItems } = DOM.pages.home 
let moveLength = 0

const openModalProducts: () => void = () => {
  const containers = afterDOM.pages.home.getAllProducts()
  showDetailedProductModal(containers);
}

const getAllPopularProducts: () => Promise<void> = async () => {
  const products: IProduct[] = await ProductAPI.index()
  const popularProducts = products.filter(item => item.top === true)

  mountPopularProducts(popularProducts)
}

const bookProducts: () => void = () => {
  const containers = afterDOM.pages.home.getAllProducts()
  bookingProducts(containers, 'product-card')
}

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

  await getAllPopularProducts()
  openModalProducts()
  bookProducts()
} 