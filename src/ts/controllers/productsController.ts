import { ProductAPI } from '../models/Products'
import { toPage } from '../routes/PageControllers'
import { showAllProducts } from '../views/ProductsView'

export const productsPageCtrl: () => Promise<void> = 
  async () => {
    toPage('products')
    const products = await ProductAPI.index()

    showAllProducts(products)
  }