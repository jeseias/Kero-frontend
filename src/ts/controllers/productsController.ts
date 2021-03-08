import { ProductAPI } from '../models/Products'
import { ReviewAPI } from '../models/Reviews' 
import { showDetailedProductModal, bookingProducts } from '../shared/products.shared'

import { toPage } from '../routes/PageControllers'

import { mountProductPage, switchProductCategory } from '../views/ProductsView'
import { setThisActive } from '../views/View'
import DOM, { afterDOM } from '../views/elements'

import { IProduct, IReview } from '../constants/interfaces'

export const productsPageCtrl: () => Promise<void> = 
  async () => {
    toPage('products')

    const products: IProduct[] = await ProductAPI.index()
    const reviews: IReview[] = await ReviewAPI.index()

    const { allProducts, allSubCategoryProducts } = afterDOM.pages.products

    const switchProductCategoryCtrl: () => void = () => {
      const { categoryItems } = DOM.pages.products
    
      categoryItems.forEach(item =>
        item.addEventListener('click', () => {
          setThisActive(item, categoryItems, 'category-item--active') 
          switchProductCategory(products, item.dataset.category!)

          // Book the products
          bookingProducts(allSubCategoryProducts(), 'product-card')
          bookingProducts(allProducts(), 'product-item')

          // Open the product models
          showDetailedProductModal(allProducts())
          showDetailedProductModal(allSubCategoryProducts())
        })
      )
    }

    mountProductPage(products, reviews)
    switchProductCategoryCtrl()

    // Add Item to cart
    bookingProducts(allSubCategoryProducts(), 'product-card')
    bookingProducts(allProducts(), 'product-item')

    // Listener to open product modal
    showDetailedProductModal(allProducts())
    showDetailedProductModal(allSubCategoryProducts())
  }