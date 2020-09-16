import DOM from './elements'

import { IProduct } from '../constants/Interfaces'
import { TAppObjectData } from '../constants/types'

import { addChildren } from './View'

export const showAllProducts: (products: TAppObjectData) => void = (products) => {
  const { allProducts } = DOM.pages.products

  const tempGenerator: (data: IProduct) => string = data => `
    <div class="product-item">
      <img class="product-item__img" src="${data.img__url}" />
      <p class="product-item__name">${data.name}</p>
      <p class="product-item__price">${data.price}</p>
      <p class="product-item__cart">Adicionar ao carinho</p>
    </div> 
  ` 

  addChildren(allProducts, products, tempGenerator, 'afterbegin')
}