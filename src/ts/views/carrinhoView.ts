import DOM from './elements'

import { addChildren, textShorter, removeChildren } from './View'

import { IProduct } from '../constants/Interfaces'

export const shoppingListEmpty: () => void = () => {
  const { all } = DOM.pages.carrinho

  removeChildren(all)

  all.insertAdjacentHTML('afterbegin', `
    <div class="empty">O seu carrinho está vazio</div>
  `)
}

export const displayShoppingItem: (products: { product: IProduct, _id: string }[]) => void = (products) => {
  const { all } = DOM.pages.carrinho 

  const temp: (data: { product: IProduct, _id: string }) => string = data => `
    <div class="product-card" id="product-${data._id}">
      <div class="product-card__img" style="background-image: url(${data.product.img__url})"></div>
      <p class="product-card__name">${data.product.name}</p>
      <p class="product-card__summary">${textShorter(100, data.product.summary)}</p>
      <div class="product-card__footer">
        <span class="product-card__price">${data.product.price} AKZ</span>
        <span class="product-card__cart">Adicionar</span>
      </div>
      <span class="product-card__settings">Remover</span>  
    </div>  
  `

  addChildren(all, products, temp)
}

export const setUpShoppingHeader: (total: number, length: number) => void = (totalPrice, length) => {
  const { top: { items, total } } = DOM.pages.carrinho

  items.textContent = `${length} Producto`
  total.textContent = `Total: ${totalPrice} AKZ`
}