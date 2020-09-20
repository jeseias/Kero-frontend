import { filterProducts, getCategoryProducts, getTopProject } from '../models/Products'

import DOM from './elements'
import { addChildren, textShorter, setThisActive } from './View'

import { IProduct, IReview } from '../constants/Interfaces' 
import { TProductCategory } from '../constants/types' 

// All My templates
const LOCATION = 'http://127.0.0.1:5000/files/img/users/'

const tempTopProductsGenerator: (data: IProduct) => string = data => `
  <div class="product-card" id="product-${data.id}">
    <div class="product-card__img" style="background-image: url(${data.img__url})"></div>
    <p class="product-card__name">${data.name}</p>
    <p class="product-card__summary">${textShorter(80, data.summary)}</p>
    <div class="product-card__footer">
      <span class="product-card__price">${data.price} KZ</span>
      <span class="product-card__cart">Adicionar no carinho</span>
    <div>
  </div>  
`

const tempProductsGenerator: (data: IProduct) => string = data => `
  <div class="product-item" id="product-${data.id}">
    <img class="product-item__img" src="${data.img__url}" />
    <p class="product-item__name">${data.name}</p>
    <p class="product-item__price">${data.price}</p>
    <p class="product-item__cart">Adicionar ao carinho</p>
  </div> 
` 
  
const tempReviewsGenerator: (data: IReview) => string = data => `
  <div class="review-item" id="${data.id}">
    <img class="review-item__img" src="${LOCATION}${data.user.photo}" />
    <span class="review-item__name">${data.user.name}</span>
    <div class="review-item__rating">${data.rating}</div>
    <p class="review-item__summary">${data.review}</p>
  </div>  
`

const displayAllProducts: (
  parent: HTMLElement, 
  data: any, 
  tempGenerator: (data: any) => string,
  where?: InsertPosition
) => void = 
  (parent, data, tempGenerator, where) => {
    addChildren(parent, data , tempGenerator, where)
  } 

// All exported function
export const swicthProductCategory: (products: IProduct[], catergory: TProductCategory | string) => void = 
  (products, catergory) => {
    const { allProducts, topProducts } = DOM.pages.products
    const filterProducts = getCategoryProducts(products, catergory)

    displayAllProducts(
      topProducts, 
      getTopProject(filterProducts),
      tempTopProductsGenerator,
      'afterbegin'
    )

    displayAllProducts(
      allProducts, 
      filterProducts,
      tempProductsGenerator,
      'afterbegin'
    )
  }

export const mountProductPage: (
  products: IProduct[],
  reviews: IReview[],
) => void = (products, reviews) => {
  const { allProducts, allReviews, topProducts, categoryItems } = DOM.pages.products
  const filterdDefaultProducts = filterProducts(products, 'eletronicos')

  setThisActive(categoryItems[0], categoryItems, 'category-item--active')
  
  displayAllProducts(allProducts, filterdDefaultProducts , tempProductsGenerator, 'afterbegin')
  displayAllProducts(topProducts, getTopProject(filterdDefaultProducts), tempTopProductsGenerator, 'afterbegin')

  addChildren(allReviews, reviews, tempReviewsGenerator, 'beforeend')
}