import { PageSwitcher } from './routes/index'
import HeaderView from './views/Header'

// import { ILoggedUser, IApp, ISideBarIndexes } from './constants/interfaces'
// import { TAppDataGetSet, TAppObjectData, allInnerPages, TInnerPageTitles } from './constants/types'

class App {
  constructor() {

  } 

  public PageSetup() {
    const headerSetup = (type: boolean) => {
      type ? HeaderView.userLoggedHeader() : HeaderView.normalHeader() 
    }

    return {
      headerSetup
    }
  }

  // public async functionCaller(which: TAppDataGetSet, id?: string ): Promise<any> { 
  //   await this.getAppData(which, id)
  //   return which.endsWith('s') ? this.AppData.all[which] : this.AppData.one[which] 
  // } 

  // public async getAppData(type: TAppDataGetSet,id?: string) {
  //   const ModelAPI = new APICommunicator(!type.endsWith('s') ? `${type}s` : type)

  //   if (!id) { 
  //     await ModelAPI.index(type)
  //   } else {
  //     await ModelAPI.show(id, type)
  //   } 
  // }

  // public setAppData(type: TAppDataGetSet, data: TAppObjectData) {   
  //   type.endsWith('s') ? this.AppData.all[type] = data : this.AppData.one[type] = data
  // }

  public init() {
    PageSwitcher()

    this.PageSetup().headerSetup(false)
  }
}

export default new App()