import api from '../services/api'
import { alertUser } from '../models/Alert'
import { getUserToken } from '../models/Auth'
import App from '../App'
import { TAppDataGetSet, TDataObjects, TAppObjectData } from '../constants/types'

import { AxiosResponse } from 'axios'
 
const fecthData: (route: string, token?: boolean) => Promise<TAppObjectData> =
  async (route, token) => {
    try {

      let res: AxiosResponse

      if (token) {
        res = await api.get(route, {
          headers: {
            authorization: getUserToken()
          }
        })

        const { status, data: {  docs, doc } } = res.data

        if (status === 'success') { 
          return docs || doc
        }
      } else {
        res = await api.get(route)
        const { status, data: {  docs, doc  } } = res.data
        if (status === 'success') { 
          return docs || doc
        }
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

const sendData: (route: string, data: any, msg: string, token?: boolean) => Promise<void> = 
  async (route, data, msg, token) => {
    try { 

      let res: AxiosResponse

      if (token) {
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
      } else {
        res = await api.post(route, data)
  
        const { status } = res.data
  
        if (status === 'success') { 
          alertUser(true, msg)
        } 
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

  /**
   * Get All the data from a specific resourse
   */
  public async index(): Promise<any> {
    const data = await fecthData(this.route)
    return data
  }

  /** 
   * Send data to resource
  */
  public async store<T>(data: T, msg: string, route?: string) {
    await sendData(route || this.route, data, msg)
  }

  public async show(id: string) {
    const data = await fecthData(`${this.route}/${id}`)
  }

  public async update<T>(id: string, data: T, msg: string, route?: string) {
    await updateOne(route || `${this.route}/${id}`, data, msg)
  }

  public async destroy(id: string, msg: string) {
    await deleteData(`${this.route}/${id}`, msg)
  }
}