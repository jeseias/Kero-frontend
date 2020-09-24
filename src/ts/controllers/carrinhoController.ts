import { getAllShopptinItems } from '../models/Carrinho'
import { BookingAPI } from '../models/Booking'
import { isUserLogged } from '../models/Auth'
import { alertUser } from '../models/Alert'
import App from '../App'

import { toPage } from '../routes/PageControllers'
import { checkoutProduct } from './checkoutController'

import { 
  displayShoppingItem, 
  shoppingListEmpty, 
  setUpShoppingHeader,
} from '../views/carrinhoView'
import { afterDOM } from '../views/elements'

import { IBookedProduct } from '../constants/Interfaces'

const carrinhoPageDetails: () => void = () => {
  const { allProducts } = afterDOM.pages.carrinho
  let sum = 0

  const info = allProducts().map(item => {
    return parseInt(item.querySelector('.product-card__price')!.textContent!)
  })

  for (let n of info) {
    sum += n
  } 

  setUpShoppingHeader(sum ,info.length)
}

const showMyShoppingList: () => Promise<void> = async () => {

  if (!isUserLogged()) return shoppingListEmpty()

  const products: IBookedProduct[] = await getAllShopptinItems()
  App.AppData.AllUserBookedProducts = products

  if (products.length === 0 ) return shoppingListEmpty()

  displayShoppingItem(products)
  carrinhoPageDetails()
  checkoutProduct()
  await removeShoppingItem()
}

const removeShoppingItem: () => Promise<void> = async () => {
  const { deleteBtns } = afterDOM.pages.carrinho

  deleteBtns().forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.parentElement!.id.replace('product-', '')
      await BookingAPI.destroy(id, '')
      alertUser(true , 'Producto eliminado com successo')
      showMyShoppingList()
    })
  })
} 

export const carrinhoController: () => Promise<void> = async () => {
  toPage('carrinho')

  showMyShoppingList()
}