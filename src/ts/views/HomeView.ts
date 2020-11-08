import { IProduct } from '../constants/Interfaces'

import DOM from '../views/elements'
import { addChildren } from '../views/View'
import { tempTopProductsGenerator } from './ProductsView'

export const mountPopularProducts: (products: IProduct[]) => void = products => {
  const { popularProducts } = DOM.pages.home

  addChildren(popularProducts, products, tempTopProductsGenerator, 'afterbegin')
}