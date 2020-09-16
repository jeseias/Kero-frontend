import { ProductAPI } from '../models/Products'
import { ReviewAPI } from '../models/Reviews'

import { toPage } from '../routes/PageControllers'

import { mountProductPage, swicthProductCategory } from '../views/ProductsView'
import { setThisActive } from '../views/View'
import DOM from '../views/elements'

import { IProduct, IReview } from '../constants/Interfaces'

export const productsPageCtrl: () => Promise<void> = 
  async () => {
    toPage('products')

    const products: IProduct[] = await ProductAPI.index()
    const reviews: IReview[] = await ReviewAPI.index()

    const switchProductCategory: () => void = () => {
      const { categoryItems } = DOM.pages.products
    
      categoryItems.forEach(item =>
        item.addEventListener('click', () => {
          setThisActive(item, categoryItems, 'category-item--active') 
          swicthProductCategory(products, item.dataset.category!)
        })
      )
    }

    mountProductPage(products, reviews)
    switchProductCategory()
  }