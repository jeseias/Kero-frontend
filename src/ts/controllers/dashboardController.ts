import App from '../App'
import { alertUser } from '../models/Alert'

import { toPage } from '../routes/PageControllers'

export const dashboardPageCtrl: () => Promise<void> = async () => {
  App.AppData.loggedUser 
    ? toPage('dashboard')
    : (
        alertUser(false, 'Faça login para acessar a sua conta!'), 
        toPage('products')
      )
}