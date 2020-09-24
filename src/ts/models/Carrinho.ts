import { BookingAPI } from './Booking'
import App from '../App'

import { IProduct, IBookedProduct } from '../constants/Interfaces'

export const getAllShopptinItems: () => Promise<IBookedProduct[]> = async () => BookingAPI.index(App.AppData.loggedUser!.token)