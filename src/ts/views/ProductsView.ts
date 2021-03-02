import { filterProducts, getCategoryProducts, getTopProject } from '../models/Products'

import DOM, { GEBI } from './elements'
import { addChildren, textShorter, setThisActive, svgLocation } from './View'

import { IProduct, IReview } from '../constants/interfaces' 
import { TProductCategory } from '../constants/types' 
import { formatMoney } from '../Utils/logic'
import { displayModal } from './ViewModal'

// All My templates
const LOCATION = 'http://127.0.0.1:5000/files/img/users/'

export const tempTopProductsGenerator: (data: IProduct) => string = data => `
  <div class="product-card" id="product-${data.id}">
    <div class="product-card__img" style="background-image: url(${data.img__url})"></div>
    <p class="product-card__name">${data.name}</p>
    <p class="product-card__summary">${textShorter(60, data.summary)}</p>
    <div class="product-card__footer">
      <span class="product-card__price">${formatMoney(data.price)}</span>
      <span class="product-card__cart">Adicionar</span>
    </div>
  </div>  
`

const tempProductsGenerator: (data: IProduct) => string = data => `
  <div class="product-item" id="product-${data.id}">
    <img class="product-item__img" src="${data.img__url}" />
    <p class="product-item__name">${data.name}</p>
    <p class="product-item__price">${formatMoney(data.price)}</p>
    <p class="product-item__cart">Adicionar ao carinho</p>
  </div> 
` 
  
const tempReviewsGenerator: (data: IReview) => string = data => { 
  return `
    <div class="review-item" id="${data.id}">
      <img class="review-item__img" src="${LOCATION}${data.user.photo}" />
      <span class="review-item__name">${data.user.name}</span>
      <div class="review-item__rating" data-star="${data.rating}">
      </div>
      <p class="review-item__summary">${data.review}</p>
    </div>  
  `
}

const tempProductModal: (data: IProduct) => string = data => {
  return `
    <div class="solo-product" id="product-${data.id}">
      <svg class="close">
        <use xlink:href="${svgLocation}circle-with-cross"></use>
      </svg>
      <img class="solo-product__img" src="${data.img__url}" />
      <h2 class="solo-product__name">${data.name}</h2> 
      <p class="solo-product__category">${data.category}</p> 
      <p class="solo-product__summary">${data.summary}</p>
      <div>
        <p class="solo-product__price">${formatMoney(data.price)}</p>
        <p class="solo-product__cart-btn">Adicionar</p>
      </div>
    </div>
  `
}

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
export const switchProductCategory: (products: IProduct[], category: TProductCategory | string) => void = 
  (products, category) => {
    const { allProducts, topProducts } = DOM.pages.products
    const filterProducts = getCategoryProducts(products, category)

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

export const displayProductModal: (product: IProduct) => void = product => {
  displayModal(tempProductModal(product));
}

export const mountProductPage: (
  products: IProduct[],
  reviews: IReview[],
) => void = (products, reviews) => {
  const { allProducts, allReviews, topProducts, categoryItems } = DOM.pages.products
  const filteredDefaultProducts = filterProducts(products, 'eletronicos')
  const filteredTopProducts = getTopProject(filteredDefaultProducts);

  topProducts.style.gridTemplateColumns = `repeat(${filteredTopProducts.length}, 25rem)`

  setThisActive(categoryItems[0], categoryItems, 'category-item--active')
  
  displayAllProducts(allProducts, filteredDefaultProducts , tempProductsGenerator, 'afterbegin')
  displayAllProducts(topProducts, filteredTopProducts, tempTopProductsGenerator, 'afterbegin')

  addChildren(allReviews, reviews, tempReviewsGenerator, 'beforeend')

  reviews.forEach(item => {
    const reviewParentDiv = <HTMLDivElement>GEBI(item.id)
    const ratingContainer = <HTMLDivElement>reviewParentDiv.querySelector('.review-item__rating')
    const starLength = ratingContainer.dataset.star!

    for (let i = 0; i < parseInt(starLength) ; i++) {
      ratingContainer.insertAdjacentHTML('afterbegin', `
        <svg class="review-item__star">
          <use xlink:href="src/assets/SVGs/sprite.svg#icon-star-full"></use>
        </svg>
      `)
    }
  })
}