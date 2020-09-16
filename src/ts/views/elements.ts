export const $ = document.querySelector.bind(document)
export const $$ = document.querySelectorAll.bind(document)
export const GEBI = document.getElementById.bind(document)
export const GEBC = document.getElementsByClassName.bind(document)

export default {
  pages: {
    self: Array.from($$('.page')) as HTMLDivElement[],
    home: $('.page.home#home') as HTMLDivElement,
    about: $('.page.about#about') as HTMLDivElement,
    products: {
      self: $('.page.products#products') as HTMLDivElement,
      allProducts: $(`.page.products#products .products__products .all`) as HTMLDivElement
    },
    contact: $('.page.contact#contact') as HTMLDivElement,
    error: $('.page.error#error') as HTMLDivElement
  },

  header: {
    self: $('header.header') as HTMLDivElement,
    nav: {
      self: $('header.header nav.nav') as HTMLDivElement,
      items: Array.from($$('aside.aside nav.nav .nav__item')) as HTMLLIElement[],
      links: Array.from($$('aside.aside nav.nav .nav__link')) as HTMLAnchorElement[]
    }
  }
}