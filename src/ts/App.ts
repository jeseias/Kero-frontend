import { PageSwitcher } from './routes/index'
import HeaderView from './views/Header'

import { ILoggedUser, IApp } from './constants/Interfaces'

class App {

  public AppData: IApp

  constructor() {
    const allLoggedUsers: ILoggedUser[] | null = JSON.parse(localStorage.getItem('kero-client')!)
    const loggedUser = allLoggedUsers?.find(user => user.current === true); 

    this.AppData = {
      loggedUser  
    }
  }

  public PageSetup() {
    const headerSetup = (type: boolean) => {
      type ? HeaderView.userLoggedHeader() : HeaderView.normalHeader() 
    }

    return {
      headerSetup
    }
  } 

  public init() {
    PageSwitcher()

    this.PageSetup().headerSetup(false)
  }
}

export default new App()