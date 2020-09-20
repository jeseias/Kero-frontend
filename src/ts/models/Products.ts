import { APICommunicator } from '../Utils/API'
import { BookingAPI } from './Booking'
import App from '../App'

import { IProduct, IBooking } from '../constants/Interfaces'
import { TProductCategory } from '../constants/types'

export const ProductAPI = new APICommunicator('/products')

export const getTopProject: (data: IProduct[]) => IProduct[] = 
  (data) => {
    return data.filter(product => product.top === true)
  }

export const getCategoryProducts: (data: IProduct[], category: TProductCategory | string) => IProduct[] =
  (data, category) => {
    return data.filter(product => product.category === category)
  }

export const filterProducts: (products: IProduct[], category: TProductCategory | string) => IProduct[] =
  (products, catergory) => {
    return getCategoryProducts(products, catergory)
  }

export const addProductToShoppingList: (id: string, price: number) => Promise<void> = 
  async (id, price) => {
    await BookingAPI.store<IBooking, IBooking>({
      product: id,
      user: App.AppData.loggedUser!._id,
      price: price,
      paid: false
    }, 'Produto adicionando ao carrinho com successo', App.AppData.loggedUser!.token)
  }