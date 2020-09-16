import { APICommunicator } from '../Utils/API'

import { IProduct } from '../constants/Interfaces'
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