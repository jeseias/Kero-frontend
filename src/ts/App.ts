import { showUserMenu } from './controllers/headerController'
import { loginHanlder } from './controllers/authController'

import { PageSwitcher } from './routes/index'
import { toPage } from './routes/PageControllers'

import HeaderView from './views/HeaderView'

import { ILoggedUser, IApp } from './constants/Interfaces'

class App {

  public AppData: IApp

  constructor() {
    const loggedUser: ILoggedUser = JSON.parse(localStorage.getItem('kero-client')!)

    this.AppData = {
      loggedUser  
    }
  }

  public AppSetup() {
    const headerSetup: (user?: ILoggedUser) => Promise<void> = async (user) => {
      if (user) {
        HeaderView.userLoggedHeader(user)
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