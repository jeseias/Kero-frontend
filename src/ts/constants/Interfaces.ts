export interface IApp {
  loggedUser: ILoggedUser | undefined,
  AllUserBookedProducts?: IBookedProduct[] | undefined
}

export interface IBookedProduct {
  product: IProduct
  _id: string 
  paid: boolean
  price: number
  user: IUser
} 

export interface IKeroClient {
  loggedUser?: ILoggedUser
  location?: IUserLocation
  checkout?: string[]
}

export interface ICheckoutProductSend {
  products: IProductToBeBooked[]
  user: string 
  total: number 
  location: IUserLocation
}

export interface ICheckoutProduct extends ICheckoutProductSend {
  state: 'sent' | 'active' | 'complete',
  _id: string
  createdAt: Date
}

export interface IProductToBeBooked {
  productID: string 
  price: number 
  quantity: number
}

export interface IUserLocation {
  block: number
  building: number,
  entrace: string
  apartment: string
}

export interface IBasicUser {
  _id: string 
  name: string 
  role: string
  email: string
  photo: string
  phone: string
}

export interface IUser extends IBasicUser {
  img__url: string 
}

export interface ILoggedUser extends IUser {
  token: string
}

export interface IAuthRes<T> {
  status: string,
  token: string,
  data: {
    user: T
  }
}

export interface INoramlRes<T> {
  data: {
    doc?: T
    docs?: T
  }
}

export interface IProduct {
  id: string
  name: string
  img__url: string
  summary: string
  price: number
  category: string
  subategory: string
  top: boolean
  images: string[]
}

export interface IReview {
  id: string
  review: string 
  rating: number 
  user: IUser
}

// Data That will be sent by users
export interface IMessage {
  name: string 
  number: number 
  message: string
}

export interface ILogin {
  email: string 
  password: string
}

export interface ISignup {
  name: string 
  email: string 
  phone: number 
  password: string
  passwordConfirm: string
}

export interface IBooking {
  product: string
  user: string
  price: number
  paid: boolean
}

export interface IReviewSend {
  user: string
  review: string
  rating: number
}

export interface IUserData {
  name: string 
  email: string
  phone: number
} 

export interface IUserDataImg extends IUserData {
  file: File
}

export interface IPasswords {
  passwordCurrent: string
  password: string
  passwordConfirm: string
} 