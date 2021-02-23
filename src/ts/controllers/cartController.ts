import { getAllShoppingItems } from '../models/Cart'
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
} from '../views/cartView'
import { afterDOM } from '../views/elements'

import { IBookedProduct } from '../constants/interfaces'

const cartPageDetails: () => void = () => {
  const { AllUserBookedProducts } = App.AppData

  if (AllUserBookedProducts) {
    const prices = AllUserBookedProducts?.reduce((acc, cur) => acc + cur.product.price, 0)
    setUpShoppingHeader(prices, AllUserBookedProducts.length)
  } else {
    setUpShoppingHeader(0, 0)
  }
}

const showMyShoppingList: () => Promise<void> = async () => {
  if (!isUserLogged()) return shoppingListEmpty()
  
  const products: IBookedProduct[] = await getAllShoppingItems()
  App.AppData.AllUserBookedProducts = products
  
  if (!products[0]) return shoppingListEmpty()

  displayShoppingItem(products)
  cartPageDetails()
  checkoutProduct()
  await removeShoppingItem()
}

const removeShoppingItem: () => Promise<void> = async () => {
  const { deleteBtns } = afterDOM.pages.cart

  deleteBtns().forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.parentElement!.id.replace('product-', '')
      await BookingAPI.destroy(id, '')
      alertUser(true , 'Producto eliminado com successo')
      showMyShoppingList()
    })
  })
} 

const selectProduct: () => void = () => {
  const { selectBtn } = afterDOM.pages.cart

  selectBtn().forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement!.parentElement!

      parent.classList.toggle('product-card--selected')
      
      if (parent.classList.contains('product-card--selected')) {
        btn.textContent = 'Selecionado'
      } else {
        btn.textContent = 'Selecionar'
      }
    })
  })
}

export const cartController: () => Promise<void> = async () => {
  toPage('cart')

  await showMyShoppingList()
  selectProduct()
}