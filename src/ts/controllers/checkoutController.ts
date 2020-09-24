import App from '../App'
import { alertUser } from '../models/Alert'

import { displayCheckoutModal } from '../views/carrinhoView'
import DOM, { afterDOM } from '../views/elements'

const getTotalPrice: () => void = () => {
  const { totalProductPrice, mainTotalPrice } = afterDOM.pages.carrinho.checkoutModel
  let totalPrice = 0

  for (let n of totalProductPrice()) {
    totalPrice += parseInt(n.textContent!)
  }

  mainTotalPrice().textContent = `Total final: ${totalPrice} AKZ`

}

const changeProductQuantity: () => void = () => {
  const { quantityInputs } = afterDOM.pages.carrinho.checkoutModel

  quantityInputs().forEach(item => {
    item.addEventListener('change', () => {
      const value = parseInt(item.value)
      const totalPrice = <HTMLParagraphElement>item.parentElement!.querySelector(`.checkout-box__product__total`)

      // Make sure value isNOT < 1      
      if (value < 1) {
        item.value = `${1}`
        return alertUser(false, 'A quantidade não pode ser menor que 0')
      }

      totalPrice.textContent = `${parseInt(totalPrice.dataset.price!) * value}`
      getTotalPrice()
    })
  })
}

const checkoutAllProducts: () => void = () => {
  const allBookedProducts = App.AppData.AllUserBookedProducts
  displayCheckoutModal(allBookedProducts!)

  changeProductQuantity()
  getTotalPrice()
}

const checkoutSelectedProducts: () => void = () => {

}

export const checkoutProduct: () => void = () => {
  const { top: { select, checkoutBtn } } = DOM.pages.carrinho

  checkoutBtn.addEventListener('click', () => {
    if (select.selectedIndex === 1) return checkoutAllProducts()
    if (select.selectedIndex === 0) return checkoutSelectedProducts()
  })
}