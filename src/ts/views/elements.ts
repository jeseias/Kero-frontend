export const $ = document.querySelector.bind(document)
export const $$ = document.querySelectorAll.bind(document)
export const GEBI = document.getElementById.bind(document)
export const GEBC = document.getElementsByClassName.bind(document)

// Elements
const dashboard = `.page.dashboard#dashboard`
const products = `.page.products#products`
const carrinho = `.page.carrinho#carrinho`

export const afterDOM = {
  header: {
    normal: {
      loginBtn: () => <HTMLButtonElement>GEBI(`loginbtn`),
      signupBtn: () => <HTMLButtonElement>GEBI(`signupbtn`)
    },
    user: {
      self: () => <HTMLDivElement>$(`header.header .user`),
      menuBtn: () => <HTMLDivElement>$(`header.header .user .user__icon`),
      menuBox: () => <HTMLDivElement>$(`header.header .user .user__menu`),
      logoutbtn: () => <HTMLDivElement>$(`header.header .user .user__menu #logoutbtn`),
    }
  },
  loginForm: {
    self: () => $(`.modal #loginform`) as HTMLFormElement,
    emailInput: () => $(`.modal #loginform input#loginemail`) as HTMLInputElement,
    passwordInput: () => $(`.modal #loginform input#loginpassword`) as HTMLInputElement,
    submitloginBtn: () => $(`.modal #loginform input[type="submit"]`) as HTMLInputElement
  },
  pages: {
    products: {
      allSubCategoryProducts: () => <HTMLDivElement[]>Array.from($$(`${products} .products__sub-categories .product-card`)),
      allProducts: () => <HTMLDivElement[]>Array.from($$(`${products} .products__products .all .product-item`)),
    },
    carrinho: {
      deleteBtns: () => <HTMLDivElement[]>Array.from($$(`${carrinho} .product-card__settings`))
    }
  }
}

export default {
  pages: {
    self: Array.from($$('.page')) as HTMLDivElement[],
    home: {
      self: $('.page.home#home') as HTMLDivElement,
      banner: $('.page.home#home .banner') as HTMLDivElement,
      bannerSlider: $('.page.home#home .banner .banner__slider') as HTMLDivElement,
      bannerItems: Array.from($$('.page.home#home .banner .banner__item')) as HTMLDivElement[],
    },
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
    dashboard: {
      self: <HTMLDivElement>$(`${dashboard}`),
      reviewBox: {
        form: <HTMLFormElement>$(`${dashboard} .form__review`),
        message: <HTMLTextAreaElement>$(`${dashboard} form.form__review textarea`),
        rating: <HTMLInputElement>$(`${dashboard} form.form__review input`),
        submitBtn: <HTMLInputElement>$(`${dashboard} form.form__review button`),
      },
      userDetails: {
        userForm: <HTMLFormElement>$(`${dashboard} form.form__user-details`),
        name: <HTMLInputElement>$(`${dashboard} .form__user-details input#name`),
        email: <HTMLInputElement>$(`${dashboard} .form__user-details input#email`),
        phone: <HTMLInputElement>$(`${dashboard} .form__user-details input#phone`),
        file: <HTMLInputElement>$(`${dashboard} .form__user-details input#file`),
        img: <HTMLDivElement>$(`${dashboard} .form__user-details .img`)
      },
      passwordBox: {
        self: <HTMLFormElement>$(`${dashboard} form.form__user-password`),
        currentPassword: <HTMLInputElement>$(`${dashboard} form.form__user-password input#current-password`),
        newPassword: <HTMLInputElement>$(`${dashboard} form.form__user-password input#new-password`),
        confirmPassword: <HTMLInputElement>$(`${dashboard} form.form__user-password input#confirm-password`),
      }
    },  
    carrinho: {
      self: <HTMLDivElement>$(`${carrinho} `),
      top: <HTMLDivElement>$(`${carrinho} .top`),
      all: <HTMLDivElement>$(`${carrinho} .allproducts`),
    },
    contact: $('.page.contact#contact') as HTMLDivElement,
    error: $('.page.error#error') as HTMLDivElement
  },

  aside: {
    nav: {
      self: $('header.header nav.nav') as HTMLDivElement,
      items: Array.from($$('aside.aside nav.nav .nav__item')) as HTMLLIElement[],
      links: Array.from($$('aside.aside nav.nav .nav__link')) as HTMLAnchorElement[]
    }
  },

  header: {
    self: $('header.header') as HTMLDivElement
  }
}