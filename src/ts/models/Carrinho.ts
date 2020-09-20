import { BookingAPI } from './Booking'
import App from '../App'

import { IProduct } from '../constants/Interfaces'

export const getAllShopptinItems: () => Promise<{ product: IProduct }[]> = async () => BookingAPI.index(App.AppData.loggedUser!.token)