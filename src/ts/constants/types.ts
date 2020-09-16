import { IProduct, IReview, IUser, IBooking, IMessage, ILogin, ISignup } from './Interfaces'

export type TAppObjectData = IReview | IProduct | IUser
export type TAppDataGetSet = 'product' | 'product' | 'reviews' | 'review' | 'user' | 'bookings' | 'booking'
export type TDataObjects = FormData | IBooking | IMessage |ILogin | ISignup