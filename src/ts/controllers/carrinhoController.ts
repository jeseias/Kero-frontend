import { getAllShopptinItems } from '../models/Carrinho'
import { isUserLogged } from '../models/Auth'

import { toPage } from '../routes/PageControllers'

import { displayShoppingItem, shoppingListEmpty } from '../views/carrinhoView'

const showMyShoppingList: () => Promise<void> = async () => {

  if (!isUserLogged()) return shoppingListEmpty()

  const products = await getAllShopptinItems()
  displayShoppingItem(products)
}

export const carrinhoController: () => Promise<void> = async () => {
  toPage('carrinho')

  showMyShoppingList()
}