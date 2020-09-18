import { PageSwitcher } from './routes/index'
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
    const headerSetup = (user?: ILoggedUser) => {
      user ? HeaderView.userLoggedHeader(user) : HeaderView.normalHeader() 
    }

    return {
      headerSetup
    }
  } 

  public init() {
    this.AppSetup().headerSetup(this.AppData.loggedUser)

    PageSwitcher()
  }
}

export default new App()