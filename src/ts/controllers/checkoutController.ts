import App from '../App'
import { setUpCheckoutInformation, CheckoutAPI, getTotalPrice } from '../models/Checkout'
import { alertUser } from '../models/Alert'
import { hideModal } from '../models/Modal'

import { displayCheckoutModal } from '../views/carrinhoView'
import DOM, { afterDOM } from '../views/elements'
import { userInputNotifacation } from '../views/View'
import { displayMyCheckouts, displayOneCheckout } from '../views/checkoutView'

import { IKeroClient, ICheckoutProduct } from '../constants/Interfaces'

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

const setUserLocationInfoIS: () => void = () => {
  const { location }: IKeroClient = JSON.parse(localStorage.getItem('kero-client')!)
  const { blockInput, buildingInput, entraceInput, apartmentInput } = afterDOM.pages.carrinho.checkoutModel

  blockInput().value = `${location!.block}`
  buildingInput().value = `${location!.building}`
  entraceInput().value = `${location!.entrace}`
  apartmentInput().value = `${location!.apartment}`
}

const checkoutAllProducts: () => void = () => {
  const { form, blockInput, buildingInput, entraceInput, apartmentInput } = afterDOM.pages.carrinho.checkoutModel 

  const allBookedProducts = App.AppData.AllUserBookedProducts
  displayCheckoutModal(allBookedProducts!)

  changeProductQuantity()
  getTotalPrice()

  setUserLocationInfoIS()

  form().addEventListener('submit', async (e: Event) => {
    e.preventDefault()

    userInputNotifacation([
      [blockInput(), 'O bloco'],
      [buildingInput(), 'O Predio'],
      [entraceInput(), 'A entrada'],
      [apartmentInput(), 'O apartamento']
    ])

    const checkoutDetails = setUpCheckoutInformation()
    await CheckoutAPI.store(checkoutDetails, 'Encomenda feita com successo', App.AppData.loggedUser!.token)

    hideModal()
    App.init()
  })
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

export const displayCheckoutMenu: () => void = () => {
  const { checkoutBtn, checkoutMenu } = afterDOM.header.user

  checkoutBtn().addEventListener('click', () => {
    checkoutMenu().classList.toggle('visible')
  })

  checkoutMenu().addEventListener('mouseleave', () => {
    checkoutMenu().classList.remove('visible')
  })
}

export const displayCheckoutOnHeaderCtrl: () => Promise<void> = async () => {
  const allMyCheckouts: ICheckoutProduct[] = await CheckoutAPI.index(App.AppData.loggedUser!.token)
  displayMyCheckouts(allMyCheckouts)
}

export const displayOneCheckoutCtrl: () => Promise<void> = async () => {
  const { allCheckoutItems } = afterDOM.header.user

  if (allCheckoutItems()) {
    allCheckoutItems().forEach(item => {
      item.addEventListener('click', async () => {
        const checkout: ICheckoutProduct = await CheckoutAPI.show(item.id, App.AppData.loggedUser!.token)
        await displayOneCheckout(checkout)
      })
    })
  }
}