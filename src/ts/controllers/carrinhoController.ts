import { getAllShopptinItems } from '../models/Carrinho'
import { BookingAPI } from '../models/Booking'
import { isUserLogged } from '../models/Auth'
import { alertUser } from '../models/Alert'

import { toPage } from '../routes/PageControllers'

import { displayShoppingItem, shoppingListEmpty } from '../views/carrinhoView'
import { afterDOM } from '../views/elements'

import { IProduct } from '../constants/Interfaces'

const showMyShoppingList: () => Promise<void> = async () => {

  if (!isUserLogged()) return shoppingListEmpty()

  const products: { product: IProduct, _id: string }[] = await getAllShopptinItems()
  displayShoppingItem(products)

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