export const $ = document.querySelector.bind(document)
export const $$ = document.querySelectorAll.bind(document)
export const GEBI = document.getElementById.bind(document)
export const GEBC = document.getElementsByClassName.bind(document)

export default {
  pages: {
    self: Array.from($$('.page')) as HTMLDivElement[],
    home: $('.page.home#home') as HTMLDivElement,
    about: {
      self: $('.page.about#about') as HTMLDivElement,
      messageForm: {
        form: $('.page.about#about form.contact-box') as HTMLFormElement,
        name: $('.page.about#about form.contact-box #messagename') as HTMLInputElement,
        number: $('.page.about#about form.contact-box #messagenumber') as HTMLInputElement,
        message: $('.page.about#about form.contact-box #messagetext') as HTMLTextAreaElement,
        btn: $('.page.about#about form.contact-box #btn') as HTMLButtonElement
      },
      signupForm: {
        form: $('.page.about#about form.signup-box') as HTMLFormElement,
        name: $('.page.about#about form.signup-box #signupname') as HTMLInputElement,
        email: $('.page.about#about form.signup-box #signupemail') as HTMLInputElement,
        number: $('.page.about#about form.signup-box #signupnumber') as HTMLInputElement,
        password: $('.page.about#about form.signup-box #signuppassword') as HTMLInputElement,
        passwordConfirm: $('.page.about#about form.signup-box #signuppasswordconfirm') as HTMLInputElement,
        btn: $('.page.about#about form.signup-box #signupbtn') as HTMLButtonElement 
      }
    },
    products: {
      self: $('.page.products#products') as HTMLDivElement,
      allProducts: $(`.page.products#products .products__products .all`) as HTMLDivElement,
      topProducts: $(`.page.products#products .sub-categories-products`) as HTMLDivElement,
      allReviews: $(`.page.products#products .products__reviews .all`) as HTMLDivElement,
      categoryItems: Array.from($$(`.page.products#products .products__categories .category-item`)) as HTMLDivElement[],
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