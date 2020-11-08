import { IProduct, IReview, IUser, IBooking, IMessage, ILogin, ISignup } from './interfaces'

export type TAppObjectData = IReview | IProduct | IUser | IReview[] | IProduct[]
export type TAppObjectDataAll = IReview[] | IProduct[]
export type TAppDataGetSet = 'product' | 'products' | 'reviews' | 'review' | 'bookings' | 'booking'
export type TDataObjects = FormData | IBooking | IMessage | ILogin | ISignup

export type TProductCategory = 'eletronicos' | 'alimentação' | 'materias' | 'vestuários'

export type TAppData = 'loggedUser'

export type TCheckout = string