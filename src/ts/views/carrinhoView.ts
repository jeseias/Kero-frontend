import { showModal } from '../models/Modal'
import DOM from './elements'

import { addChildren, textShorter, removeChildren } from './View'

import { IProduct, IBookedProduct } from '../constants/Interfaces'

export const shoppingListEmpty: () => void = () => {
  const { all } = DOM.pages.carrinho

  removeChildren(all)

  all.insertAdjacentHTML('afterbegin', `
    <div class="empty">O seu carrinho está vazio</div>
  `)
}

export const displayShoppingItem: (products: { product: IProduct, _id: string }[]) => void = (products) => {
  const { all } = DOM.pages.carrinho 
  const svgLocation = 'src/assets/SVGs/sprite.svg#icon-'

  const temp: (data: { product: IProduct, _id: string }) => string = data => `
    <div class="product-card" id="product-${data._id}">
      <div class="product-card__img" style="background-image: url(${data.product.img__url})"></div>
      <p class="product-card__name">${data.product.name}</p>
      <p class="product-card__summary">${textShorter(100, data.product.summary)}</p>
      <div class="product-card__footer">
        <span class="product-card__price">${data.product.price} AKZ</span>
        <span class="product-card__cart">Selecionar</span>
      </div>
      <svg class="product-card__settings">
        <use xlink:href="${svgLocation}bin"></use>
      </svg>  
    </div>  
  `

  addChildren(all, products, temp)
}

export const setUpShoppingHeader: (total: number, length: number) => void = (totalPrice, length) => {
  const { top: { items, total } } = DOM.pages.carrinho

  items.textContent = `${length} Producto`
  total.textContent = `Total: ${totalPrice} AKZ`
}

export const displayCheckoutModal: (products: IBookedProduct[]) => void = (products) => {
  const temp = `
    <div class="checkout-box">
      <div class="close">X</div>
      <div class="checkout-box__header">
        <h1>Todos produtos que seram comprados</h1>
        <p>Podes autmentar a quantidade de certos produtos</p>
      </div>
      <div class="checkout-box__checker">
        <span>Produto</span>
        <span>Nome</span>
        <span>Preco (AKZ)</span>
        <span>Qtd</span>
        <span>Total (AKZ)</span>
      </div>
      <div class="checkout-box__body">
        <div class="checkout-box__body__allproducts">
          ${products.map(item => `
            <div class="checkout-box__product" id="${item.product.id}">
              <img src="${item.product.img__url}" class="checkout-box__product__img"/>
              <p class="checkout-box__product__name">${item.product.name}</p>
              <p class="checkout-box__product__price">${item.product.price}</p>
              <input class="checkout-box__product__quantity" type="number" step="1" value="1" />
              <p class="checkout-box__product__total" data-price="${item.product.price}">${item.product.price}</p>
            </div>
          `)}
        </div>
      </div>
      <form id="location-form" class="checkout-box__location">
        <select id="block">
          <option value="1"> Bloco 1 </option>
          <option value="2"> Bloco 2 </option>
          <option value="3"> Bloco 3 </option>
          <option value="4"> Bloco 4 </option>
          <option value="5"> Bloco 5 </option>
          <option value="6"> Bloco 6 </option>
          <option value="7"> Bloco 7 </option>
          <option value="8"> Bloco 8 </option>
          <option value="9"> Bloco 9 </option>
          <option value="10"> Bloco 10 </option>
          <option value="11"> Bloco 11 </option>
          <option value="12"> Bloco 12 </option>
          <option value="13"> Bloco 13 (Rosas) </option>
        </select>
        <input type="number" step="1" placeholder="Predio" id="building"/>
        <select id="entrace">
          <option value="A"> Entrada A </option>
          <option value="B"> Entrada B </option>
          <option value="C"> Entrada C </option> 
        </select>
        <input type="number" placeholder="Apartamento" id="apartment"/>
        <span class="checkout-box__location__total" id="total-price">Total: AKZ</span>
        <input type="submit" value="Encomendar" id="checkout-btn"/>
      </form>
    </div>
  `
  showModal(temp)
}