import { ProductAPI, addProductToShoppingList } from '../models/Products'
import { ReviewAPI } from '../models/Reviews'
import { isUserLogged } from '../models/Auth'
import { alertUser } from '../models/Alert'

import { toPage } from '../routes/PageControllers'

import { displayProductModal, mountProductPage, switchProductCategory } from '../views/ProductsView'
import { setThisActive } from '../views/View'
import DOM, { afterDOM } from '../views/elements'

import { IProduct, IReview } from '../constants/interfaces'
import { TShowDetailedProductModal } from './@types/product-controller.types'

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

const showDetailedProductModal: TShowDetailedProductModal = containers => {
  const products = containers.map(container => {
    container.addEventListener('click', async () => {
      const productID = container.id.replace('product-', '');
      const data: IProduct = await ProductAPI.show(productID);
      displayProductModal(data)
    });

    return container;
  });

  bookingProducts(products, 'solo-product');
}

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