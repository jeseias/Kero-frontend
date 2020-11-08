import { ProductAPI, addProductToShoppingList } from '../models/Products'
import { ReviewAPI } from '../models/Reviews'
import { isUserLogged } from '../models/Auth'
import { alertUser } from '../models/Alert'

import { toPage } from '../routes/PageControllers'

import { mountProductPage, swicthProductCategory } from '../views/ProductsView'
import { setThisActive } from '../views/View'
import DOM, { afterDOM } from '../views/elements'

import { IProduct, IReview } from '../constants/interfaces'

const bookingProducts: (products: HTMLDivElement[], targetClass: string) => Promise<void> = 
  async (products, targetClass) => {
    products.forEach(item => {
      item.addEventListener('click', async (e: Event) => {
        const el = <HTMLDivElement>e.target!
        let parent: HTMLElement  

        if (el.classList.contains(`${targetClass}__cart`)) {
          if (!isUserLogged()) 
            return alertUser(false, 'Deves criar uma conta, ou fazer o login para adicionar produtos no seu carrinho', 7000)
          
          el?.parentElement?.id.startsWith('product-') 
            ? parent = el.parentElement!
            : parent = el.parentElement!.parentElement!

          const id = parent.id.replace('product-', '')
          const price = <HTMLParagraphElement>parent.querySelector(`.${targetClass}__price`) 

          await addProductToShoppingList(id, parseInt(price.textContent!))
        }
      })
    })
  }

export const productsPageCtrl: () => Promise<void> = 
  async () => {
    toPage('products')

    const products: IProduct[] = await ProductAPI.index()
    const reviews: IReview[] = await ReviewAPI.index()

    const { allProducts, allSubCategoryProducts } = afterDOM.pages.products

    const switchProductCategory: () => void = () => {
      const { categoryItems } = DOM.pages.products
    
      categoryItems.forEach(item =>
        item.addEventListener('click', () => {
          setThisActive(item, categoryItems, 'category-item--active') 
          swicthProductCategory(products, item.dataset.category!)

          bookingProducts(allSubCategoryProducts(), 'product-card')
          bookingProducts(allProducts(), 'product-item')
        })
      )
    }

    mountProductPage(products, reviews)
    switchProductCategory()

    // Add Item to cart
    bookingProducts(allSubCategoryProducts(), 'product-card')
    bookingProducts(allProducts(), 'product-item')
  }