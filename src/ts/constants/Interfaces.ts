export interface IApp {
  loggedUser: ILoggedUser | undefined 
}

export interface IUser {
  id: string 
  name: string 
  img__url: string 
  role: string
  email: string
  photo: string
}

export interface ILoggedUser extends IUser {
  token: string
  current: boolean
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
}