import { APICommunicator } from '../Utils/API'
import App from '../App'

import { afterDOM } from '../views/elements'

import { ICheckoutProductSend, IProductToBeBooked } from '../constants/interfaces'
import { formatMoney } from '../Utils/logic'

export const CheckoutAPI = new APICommunicator('checkouts')

export const setUpCheckoutInformation: () => ICheckoutProductSend = () => {
  const { 
    products, mainTotalPrice, blockInput, buildingInput, entraceInput, apartmentInput 
  } = afterDOM.pages.cart.checkoutModel

  const allBookedProducts: IProductToBeBooked[] = products().map<IProductToBeBooked>(item => {
    const price = parseInt(item.querySelector('.checkout-box__product__price')!.textContent!)
    const quantity = parseInt(item.querySelector<HTMLInputElement>('.checkout-box__product__quantity')!.value)

    return {  
      productID: item.id,
      price,
      quantity 
    }
  });

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
 
export const getTotalPrice: () => void = () => {
  const { totalProductPrice, mainTotalPrice, products } = afterDOM.pages.cart.checkoutModel
  let totalPrice = 0

  const productsQuantityPrice: number[] = products().map(item => {
    const quantity = <HTMLParagraphElement>item.querySelector('.checkout-box__product__total')

    return Number(quantity.dataset.totalPrice) || Number(quantity.dataset.price)
  })

  const totalAmount = productsQuantityPrice.reduce((acc, cur) => acc + cur, 0)

  for (let n of totalProductPrice()) {
    totalPrice += parseInt(n.dataset.price!)
  } 

  mainTotalPrice().textContent = `Total final: ${formatMoney(totalAmount)}`
  mainTotalPrice().dataset.totalPrice = `${totalAmount}`
  
}