import api from '../services/api'
import { alertUser } from '../models/Alert'
import { getUserToken } from '../models/Auth'
import App from '../App'
import { TAppDataGetSet, TDataObjects, TAppObjectData } from '../constants/types'

const fecthData: (route: string) => Promise<TAppObjectData> =
  async (route) => {
    try {

      const userToken = getUserToken()
      const res = await api.get(route, {
        headers: {
          authorization: `Bearer ${userToken}`
        }
      })

      const { status, data: { docs, doc } } = res.data

      if (status === 'success') { 
        return docs || doc
      } 
    } catch (err) {
      if (err.response) {
        alertUser(false, err.response.data.message)
      } else {
        alertUser(false, err.message)
      }
    }
  }

const deleteData: (route: string, msg: string) => Promise<void> =
  async (route, msg) => {
    try {
      const userToken = getUserToken()
      const res = await api.delete(route, {
        headers: {
          authorization: `Bearer ${userToken}`
        }
      }) 

      const { status} = res.data

      if (status === 'success') { 
        alertUser(true, msg)
      } 
      
    } catch (err) {
      if (err.response) {
        alertUser(false, err.response.data.message)
      } else {
        alertUser(false, err.message)
      }
    }
  }

const sendData: (route: string, data: any, msg: string ) => Promise<void> = 
  async (route, data, msg) => {
    try { 
      const userToken = getUserToken()
      const res = await api.post(route, data, {
        headers: {
          authorization: `Bearer ${userToken}`
        }
      })

      const { status } = res.data

      if (status === 'success') { 
        alertUser(true, msg)
      }  
    } catch (err) {
      if (err.response) {
        console.log(err)
        alertUser(false, err.response.data.message)
      } else {
        alertUser(false, err.message)
      }
    }
  }

const updateOne: (route: string, data: any, msg: string, newRoute?: string) => Promise<void> =
  async (route, data, msg, newRoute) => {
    try {
      const userToken = getUserToken()
      const res = await api.patch(newRoute || route, data, {
        headers: {
          authorization: `Bearer ${userToken}`
        }
      })
  
      const { status, data: { docs, doc } } = res.data

      if (status === 'success') { 
        alertUser(true, msg)
      }  
    } catch (err) {
      if (err.response) {
        alertUser(false, err.response.data.message)
      } else {
        alertUser(false, err.message)
      }
    }
  }

 
export class APICommunicator {
  private route: string

  constructor(route: string) {
    this.route = route
  }

  public async index(storeDataHere: TAppDataGetSet) {
    const data: TAppObjectData = await fecthData(this.route)
    App.setAppData(storeDataHere, data)
  }

  public async store(data: TDataObjects, msg: string) {
    await sendData(this.route, data, msg)
  }

  public async show(id: string, storeDataHere: TAppDataGetSet) {
    const data = await fecthData(`${this.route}/${id}`)
    App.setAppData(storeDataHere, data)
  }

  public async update<T>(id: string, data: T, msg: string, route?: string) {
    await updateOne(route || `${this.route}/${id}`, data, msg)
  }

  public async destroy(id: string, msg: string) {
    await deleteData(`${this.route}/${id}`, msg)
  }
}