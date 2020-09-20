import DOM from './elements'

import { addChildren } from './View'
import { tempTopProductsGenerator } from './ProductsView'

import { IProduct } from '../constants/Interfaces'

export const shoppingListEmpty: () => void = () => {
  const { self } = DOM.pages.carrinho

  self.insertAdjacentHTML('afterbegin', `
    <div class="">O seu carrinho está vazio</div>
  `)
}

export const displayShoppingItem: (products: { product: IProduct }[]) => void = (products) => {
  const { all } = DOM.pages.carrinho
  console.log(products.map(item => item.product))
  addChildren(all, products.map(item => item.product), tempTopProductsGenerator)
}