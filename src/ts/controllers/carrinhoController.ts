import { toPage } from '../routes/PageControllers'
import App from '../App'

export const carrinhoController: () => Promise<void> = async () => {
  toPage('carrinho')

  console.log(App.AppData.loggedUser)
}