import App from '../App'
import { alertUser } from '../models/Alert'
import { APICommunicator } from '../Utils/API'

import { ILogin, ILoggedUser, IAuthRes, IUser } from '../constants/Interfaces'
import { AxiosResponse } from 'axios'

const AuthAPI: (route: string) => APICommunicator = (route) => new APICommunicator(route)

export const getUserToken: () => string = 
  () => App.AppData.loggedUser!.token

export const saveUser: (user: ILoggedUser) => void =  (user) => {
  const setUser = () => {
    localStorage.setItem('kero-client', JSON.stringify(user))
    App.AppData = { loggedUser: user, }
    App.init()
  }

  if (JSON.parse(localStorage.getItem('kero-client')!)) {
    localStorage.removeItem('kero-client')
    return setUser()
  }

  setUser()
}

export const login: (data: ILogin) => Promise<void> = async (loginData) => {
  const { data: { token, data: { user }  },  } = await AuthAPI('/users/login')
    .store<ILogin, IAuthRes<IUser>>(loginData, 'login Feito com successo')

  const loggedUser: ILoggedUser = { ...user, token }
  saveUser(loggedUser)
}

export const logout: () => Promise<void> = async () => {
  localStorage.removeItem('kero-client');
  App.AppData.loggedUser = undefined
  alertUser(true, 'Logout Feito com successo')
  await App.AppSetup().headerSetup()
  App.toPage('home')
}

export const isUserLogged: () => boolean = () => {
  return App.AppData.loggedUser ? true : false
}