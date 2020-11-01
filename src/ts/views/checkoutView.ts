import { showModal } from '../models/Modal'
import { ProductAPI } from '../models/Products'
import App from '../App'

import { afterDOM } from './elements'
import { addChildren, svgLocation  } from './View'

import { ICheckoutProduct, IProduct } from '../constants/Interfaces'

export const displayMyCheckouts: (checkouts: ICheckoutProduct[]) => void = (checkouts) => {
  const { checkoutMenu } = afterDOM.header.user 
  
  if (checkouts[0]) {
    const temp: (data: ICheckoutProduct) => string = checkout => `
      <li class="checkout__menu__item" id="${checkout._id}">
        <h3 class="checkout__menu__item__title">Encomenda - ${checkouts.findIndex((el) => { return el.total === checkout.total })}</h3>
        <span class="checkout__menut__item__date">${checkout.products.length} Itens</span>
        <span class="checkout__menu__item__state">
          ${checkout.state === 'sent' 
            ? 'Enviado'   
            : checkout.state === 'active' ? 'Activo' : 'Concluído'  
          }
        </span>
      </li>
    `
  
    return addChildren(checkoutMenu(), checkouts, temp, 'afterbegin')
  }

  checkoutMenu().insertAdjacentHTML('afterbegin', `
    <div class="empty">Vazio</div>
  `)  

}

export const displayOneCheckout: (checkout: ICheckoutProduct) => Promise<void> = async (checkout) => {

  const items = checkout.products.map(async item => await ProductAPI.show<IProduct>(item.productID, App.AppData.loggedUser!._id))

  const products: IProduct[] = await Promise.all(items)

  const temp = `
    <div class="checkoutone-box" id="checkout-${checkout._id}">
      <svg class="close">
        <use xlink:href="${svgLocation}circle-with-cross"></use>
      </svg>
      <div class="checkoutone-box__header">
        <h1>Minha encomenda</h1>
        <p><span>Itens:</span><b> ${checkout.products.length}</b></p>
        <p><span>Total:</span><b> ${checkout.total} AKZ </b></p>
        <p><span>Estado:</span><b class="checkoutone-box__header__state"> 
          ${checkout.state === 'complete' 
                ? `
                  <span class="checkoutone-box__header__state checkoutone-box__header__state--complete">Completado</span>
                ` : checkout.state === 'active' 
                    ? `<span class="checkoutone-box__header__state checkoutone-box__header__state--active">A caminho</span>` 
                    : `<span class="checkoutone-box__header__state checkoutone-box__header__state--sent">Encomenda Feita</span>`
              }
        </b></p>
        ${checkout.state === 'complete' ? `
            <svg class="checkoutone-box__header__remover">
              <use xlink:href="${svgLocation}bin"></use>
            </svg>
        ` : ''}
      </div>
      <div class="checkoutone-box__divider">
        <span>Produto</span>
        <span>Nome</span>
        <span>Preço (AKZ)</span>
        <span>Qtd</span>
        <span>Total (AKZ)</span>
      </div>
      <div class="checkoutone-box__all-products">
        ${products.map((product, i) => `
          <div class=" checkoutone-box__product">
            <img src="${product.img__url}" class="checkoutone-box__product__img" />
            <h2 class="class="checkoutone-box__product__title">${product.name}</h2>
            <p class="class="checkoutone-box__product__price">${product.price}</p>
            <p class="class="checkoutone-box__product__quantity">
              ${checkout.products.find(item => item.productID === products[i].id)!.quantity}
            </p>
            <p class="class="checkoutone-box__product__total">
              ${checkout.products.find(item => item.productID === products[i].id)!.quantity * product.price}
            </p>  
          </div>
        `)}
      </div>
    </div>
  `

  showModal(temp)
}