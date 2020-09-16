import App from '../App'

export const getUserToken: () => string = 
  () => App.AppData.loggedUser!.token