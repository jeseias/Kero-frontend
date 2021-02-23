import { BookingAPI } from './Booking'
import App from '../App'

import { IProduct, IBookedProduct } from '../constants/interfaces'

export const getAllShoppingItems: () => Promise<IBookedProduct[]> = async () => BookingAPI.index(App.AppData.loggedUser!.token)