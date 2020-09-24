import { APICommunicator } from '../Utils/API'
import App from '../App'

import { afterDOM } from '../views/elements'

import { ICheckoutProductSend, IProductToBeBooked } from '../constants/Interfaces'
import { TCheckout } from '../constants/types'

export const CheckoutAPI = new APICommunicator('checkouts')

export const setUpCheckoutInformation: () => ICheckoutProductSend = () => {
  const { 
    products, mainTotalPrice, blockInput, buildingInput, entraceInput, apartmentInput 
  } = afterDOM.pages.carrinho.checkoutModel

  const allBookedProducts: IProductToBeBooked[] = products().map<IProductToBeBooked>(item => {
    const price = parseInt(item.querySelector('.checkout-box__product__price')!.textContent!)
    const quantity = parseInt(item.querySelector<HTMLInputElement>('.checkout-box__product__quantity')!.value)

    return {
      productID: item.id,
      price,
      quantity 
    }
  })
  const total = parseInt(mainTotalPrice().dataset.totalPrice!)
  const block = parseInt(blockInput().value)
  const building = parseInt(buildingInput().value)
  const entrace = entraceInput().value
  const apartment = apartmentInput().value
  const user = App.AppData.loggedUser!._id

  return {
   location: {
     apartment,
     entrace,
     block,
     building
   },
   products: allBookedProducts,
   total,
   user
  }
}

export const addCheckout: (id: string) => void = (id) => {
  const checkoutStorage = 'kero-client-checkouts'
  const allCheckouts: TCheckout[] = JSON.parse(localStorage.getItem(checkoutStorage)!) 

  const saveCheckout = (data: TCheckout[]) => {
    localStorage.setItem(checkoutStorage, JSON.stringify(data))
  }

  if (allCheckouts) {
    allCheckouts.push(id)
    return saveCheckout(allCheckouts)
  }

  saveCheckout([id])
}