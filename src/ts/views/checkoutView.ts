import { showModal } from '../models/Modal'
import { ProductAPI } from '../models/Products'
import App from '../App'

import { afterDOM } from './elements'
import { addChildren  } from './View'

import { ICheckoutProduct, IProduct } from '../constants/Interfaces'

export const displayMyCheckouts: (checkouts: ICheckoutProduct[]) => void = (checkouts) => {
  const { checkoutMenu } = afterDOM.header.user 
  
  if (checkouts[0]) {
    const temp: (data: ICheckoutProduct) => string = checkout => `
      <li class="checkout__item" id="${checkout._id}">
        <h3 class="checkout__item__title">Encomenda - ${checkouts.findIndex((el) => { return el.total === checkout.total })}</h3>
        <span class="checkout__item__date">${checkout.products.length} Itens</span>
        <span class="checkout__item__state">
          ${checkout.state === 'sent' 
            ? 'Enviado'   
            : checkout.state === 'active' ? 'Activo' : 'Concluído'  
          }
        </span>
      </li>
    `
  
    return addChildren(checkoutMenu(), checkouts, temp)
  }

  checkoutMenu().insertAdjacentHTML('afterbegin', `
    <div class="empty">Vazio</div>
  `)  

}

export const displayOneCheckout: (checkout: ICheckoutProduct) => Promise<void> = async (checkout) => {

  const items = checkout.products.map(async item => await ProductAPI.show(item.productID, App.AppData.loggedUser!._id))

  const products: IProduct[] = await Promise.all(items)

  const found = checkout.products.find(item => item.productID === products[2].id)

  console.log(found!.quantity)

  const temp = `
    <div class="checkoutone-box">
      <div class="close">X</div>
      <div class="checkoutone-box__header">
        <h1>Minha encomenda</h1>
        <p><span>Itens:</span><b> ${checkout.products.length}</b></p>
        <p><span>Total:</span><b> ${checkout.total}</b></p>
        <p><span>Estado:</span><b> ${checkout.state}</b></p>
      </div>
      <div class="checkoutone-box__all-products">
        ${products.map(product => `
          <div class="checkoutone-box__product">
            <img src="${product.img__url}" class="checkoutone-box__product__img" />
            <h2 class="class="checkoutone-box__product__title">${product.name}</h2>
            <p class="class="checkoutone-box__product__price">${product.price} AKZ</p>
            <p class="class="checkoutone-box__product__quantity">
              ${checkout.products.find(item => item.productID === products[2].id)!.quantity}
            </p>
            <p class="class="checkoutone-box__product__total">
              ${checkout.products.find(item => item.productID === products[2].id)!.quantity * product.price} AKZ
            </p>
          </div>
        `)}
      </div>
    </div>
  `

  showModal(temp)
}