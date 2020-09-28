import { showUserMenu } from './controllers/headerController'
import { loginHanlder } from './controllers/authController'
import { 
  displayCheckoutMenu, 
  displayCheckoutOnHeaderCtrl, 
  displayOneCheckoutCtrl } from './controllers/checkoutController'

import { PageSwitcher } from './routes/index'
import { toPage } from './routes/PageControllers'

import HeaderView from './views/HeaderView'

import { ILoggedUser, IApp, IKeroClient } from './constants/Interfaces'

class App {

  public AppData: IApp

  constructor() {
    const KeroClient: IKeroClient = JSON.parse(localStorage.getItem('kero-client')!)

    this.AppData = {
      loggedUser: KeroClient.loggedUser 
    }
  }

  public AppSetup() {
    const headerSetup: (user?: ILoggedUser) => Promise<void> = async (user) => {
      if (user) {
        HeaderView.userLoggedHeader(user)
        displayCheckoutMenu()

        await displayCheckoutOnHeaderCtrl()
        await displayOneCheckoutCtrl()

        return showUserMenu()
      }
      
      HeaderView.normalHeader() 
      await loginHanlder()
    }

    return {
      headerSetup
    }
  } 

  public toPage (page: 'products' | 'home' | 'about' | 'carrinho') {
    toPage(page)
  }

  public async init() {
    await this.AppSetup().headerSetup(this.AppData.loggedUser)

    PageSwitcher()
  }
}

export default new App()