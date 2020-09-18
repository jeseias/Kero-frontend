import App from '../App'
import { APICommunicator } from '../Utils/API'

import { ILogin, ILoggedUser, IAuthRes, IUser } from '../constants/Interfaces'
import { AxiosResponse } from 'axios'

const AuthAPI: (route: string) => APICommunicator = (route) => new APICommunicator(route)

export const getUserToken: () => string = 
  () => App.AppData.loggedUser!.token

export const login: (data: ILogin) => Promise<void> = async (loginData) => {
  const { data: { token, data: { user }  },  } = await AuthAPI('/users/login')
    .store<ILogin, AxiosResponse<IAuthRes<IUser>>>(loginData, 'login Feito com successo')

  const loggedUser: ILoggedUser = { ...user, token }
  localStorage.setItem('kero-client', JSON.stringify(loggedUser))
  App.AppData.loggedUser = loggedUser
}