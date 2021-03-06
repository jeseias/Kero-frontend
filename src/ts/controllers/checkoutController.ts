import App from '../App'
import { alertUser } from '../models/Alert'
import { hideModal } from '../models/Modal'
import { BookingAPI } from '../models/Booking'
import { 
  setUpCheckoutInformation, 
  CheckoutAPI, 
  getTotalPrice } from '../models/Checkout'

import { displayCheckoutModal } from '../views/cartView'
import DOM, { afterDOM } from '../views/elements'
import { userInputNotification, menuToggler } from '../views/View'
import { displayMyCheckouts, displayOneCheckout } from '../views/checkoutView'

import { IKeroClient, ICheckoutProduct, IBookedProduct } from '../constants/interfaces'
import { formatMoney } from '../Utils/logic'

const changeProductQuantity: () => void = () => {
  const { quantityInputs } = afterDOM.pages.cart.checkoutModel

  quantityInputs().forEach(item => {
    item.addEventListener('change', () => {
      const value = parseInt(item.value)
      const totalPrice = <HTMLParagraphElement>item.parentElement!.querySelector(`.checkout-box__product__total`)
      const price = totalPrice.dataset.price!

      // Make sure value isNOT < 1      
      if (value < 1) {
        item.value = `${1}`
        return alertUser(false, 'A quantidade não pode ser menor que 0')
      }

      const totalAmount = parseInt(price) * value

      totalPrice.textContent = `${formatMoney(totalAmount)}`
      totalPrice.dataset.totalPrice = `${totalAmount}`;

      getTotalPrice()
    })
  })
}

const setUserLocationInfoIS: () => void = () => {
  const { location }: IKeroClient = JSON.parse(localStorage.getItem('kero-client')!)
  const { blockInput, buildingInput, entraceInput, apartmentInput } = afterDOM.pages.cart.checkoutModel

  if (location) {
    location.apartment && (apartmentInput().value = `${location!.apartment}`);
    location.block && (blockInput().value = `${location!.block}`);
    location.building && (buildingInput().value = `${location!.building}`);
    location.entrace && (entraceInput().value = `${location!.entrace}`);
  } 
}  

const checkoutBookedProducts: (products: IBookedProduct[]) => void = (products) => {
  const { form, buildingInput, apartmentInput } = afterDOM.pages.cart.checkoutModel 

  displayCheckoutModal(products)

  changeProductQuantity()
  getTotalPrice()

  setUserLocationInfoIS()

  form().addEventListener('submit', async (e: Event) => {
    e.preventDefault()

    const validated = userInputNotification([
      [buildingInput(), 'O Predio'],
      [apartmentInput(), 'O apartamento']
    ]) 

    if (validated) {
      const checkoutDetails = setUpCheckoutInformation()
      await CheckoutAPI.store(checkoutDetails, 'Encomenda feita com successo', App.AppData.loggedUser!.token)
  
      hideModal()
      App.init()
    }
  })
}

const checkoutAllProducts: () => void = () => {
  checkoutBookedProducts(App.AppData.AllUserBookedProducts!)  
}

const checkoutSelectedProducts: () => Promise<void> = async () => {
  const { allProducts } = afterDOM.pages.cart

  const products = allProducts().filter(product => product.classList.contains('product-card--selected'))

  const selectedProducts = await Promise.all(products.map(async item => {
    return await BookingAPI.show<IBookedProduct>(item.dataset.bookingid!, App.AppData.loggedUser!.token)
  }))

  if (!selectedProducts[0]) {
    return alertUser(false, 'Não há produtos selecionados')
  }

  checkoutBookedProducts(selectedProducts)

}

export const checkoutProduct: () => void = () => {
  const { top: { select, checkoutBtn } } = DOM.pages.cart

  checkoutBtn.addEventListener('click', async () => {
    if (select.selectedIndex === 1) return checkoutAllProducts()
    if (select.selectedIndex === 0) return await checkoutSelectedProducts()
  })
}

export const displayCheckoutMenu: () => void = () => {
  const { checkoutBtn, checkoutMenu } = afterDOM.header.user

  menuToggler(checkoutBtn(), checkoutMenu(), 'checkout')  
}

export const displayCheckoutOnHeaderCtrl: () => Promise<void> = async () => {
  const allMyCheckouts: ICheckoutProduct[] = await CheckoutAPI.index(App.AppData.loggedUser!.token)
  displayMyCheckouts(allMyCheckouts)
}

export const displayOneCheckoutCtrl: () => Promise<void> = async () => {
  const { 
    header: { user: { allCheckoutItems } },
    checkoutItems: { checkoutDeleteBtn }
   } = afterDOM

  allCheckoutItems().forEach(item => {
    item.addEventListener('click', async () => {
      const checkout: ICheckoutProduct = await CheckoutAPI.show(item.id, App.AppData.loggedUser!.token)
      await displayOneCheckout(checkout)
      const deleteBtn = checkoutDeleteBtn() 


      deleteBtn.addEventListener('click', async () => {
        const id = deleteBtn.parentElement!.parentElement!.id.replace('checkout-', '')

        await CheckoutAPI.destroy(id, '')
        alertUser(true, 'Elminado com successo')
        hideModal()
        App.init()
      })
    })
  })
}