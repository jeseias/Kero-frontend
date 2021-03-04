import { IProduct } from "../constants/interfaces";
import { formatMoney } from "../Utils/logic";
import { addChildren } from './View'

const productTemp: (data: IProduct) => string = data => `
  <div class="search__product" id="product-${data.id}">
    <img src="${data.img__url}" class="search__img"/>
    <p class="search__name">${data.name}</p>
    <p class="search__price">${formatMoney(data.price)}</p>
  </div>
` 

export const displayProducts: (data: IProduct[], container: HTMLDivElement) => void 
  = (data, container) => {
    addChildren(container, data, productTemp)
  }