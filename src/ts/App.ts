import { showUserMenu } from './controllers/headerController'
import { loginHandler } from './controllers/authController'
import { showAsideFull } from './controllers/pageController'
import { 
  displayCheckoutMenu, 
  displayCheckoutOnHeaderCtrl, 
  displayOneCheckoutCtrl } from './controllers/checkoutController'

import { PageSwitcher } from './routes/index'
import { toPage } from './routes/PageControllers'

import HeaderView from './views/HeaderView'
import { afterDOM } from './views/elements'

import { ILoggedUser, IApp, IKeroClient } from './constants/interfaces'

class App {

  public AppData: IApp

  constructor() {
    const KeroClient: IKeroClient | null = JSON.parse(localStorage.getItem('kero-client')!)

    this.AppData = {  }

    if (KeroClient) {
      this.AppData = {
        loggedUser: KeroClient.loggedUser 
      }
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
      await loginHandler()
    }

    return {
      headerSetup
    }
  } 

  public toPage (page: 'products' | 'home' | 'about' | 'cart') {
    toPage(page)
  }

  public async init() {
    await this.AppSetup().headerSetup(this.AppData.loggedUser)

    PageSwitcher()
    showAsideFull()

  }
}

export default new App()