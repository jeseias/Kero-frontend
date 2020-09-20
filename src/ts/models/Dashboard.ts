import { APICommunicator } from '../Utils/API'
import { saveUser } from './Auth'
import { alertUser } from './Alert'
import api from '../services/api'
import App from '../App'

import { IUserData, IUserDataImg, IPasswords } from '../constants/Interfaces'

export const DashboardAPI: (route: string) => APICommunicator = (route) => new APICommunicator(route) 

export const updateUserLS: (user: any) => void = (updatedUser) => {
  const user = App.AppData.loggedUser!
  user.email = updatedUser.email
  user.name = updatedUser.name
  user.photo = updatedUser.photo
  user.phone = updatedUser.phone
  user.img__url = updatedUser.img__url
  saveUser(user!)
  App.init()
}

export const normalDataUpdate: (user: IUserData) => Promise<void> = 
  async (data) => {
    try {
      const res = await api.patch('/users/updateMe', data, {
        headers: {
          authorization: `Bearer ${App.AppData.loggedUser!.token}`
        }
      })

      const { data: { user: updatedUser } } = res.data
      updateUserLS(updatedUser)
      alertUser(true, 'Atualização feita com successo')

    } catch (err) {
      alertUser(false, err.response.message)
    }
}

export const imgDataUpdate: (user: IUserDataImg) => Promise<void> = 
  async (data) => { 
    const userData = new FormData()

    userData.append('photo', data.file)
    userData.append('name', data.name)
    userData.append('email', data.email)
    userData.append('phone', `${data.phone}`)

    try {
      const res = await api.patch('/users/updateMe', userData, {
        headers: {
          authorization: `Bearer ${App.AppData.loggedUser!.token}`
        }
      })

      const { status, data: { user: updatedUser } } = res.data
      updateUserLS(updatedUser)
      alertUser(true, 'Atualização feita com successo')

    } catch (err) {
      alertUser(false, err.response.message)
    }
}

export const passwordUpdate: (passwordData: IPasswords) => Promise<void> = 
  async (data) => { 

    try {
      await api.patch('/users/updateMyPassword', data, {
        headers: {
          authorization: `Bearer ${App.AppData.loggedUser!.token}`
        }
      })

      alertUser(true, 'Senha atualizada com successo')

    } catch (err) {
      alertUser(false, err.response.message)
    }
  }
