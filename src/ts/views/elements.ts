export const $ = document.querySelector.bind(document)
export const $$ = document.querySelectorAll.bind(document)
export const GEBI = document.getElementById.bind(document)
export const GEBC = document.getElementsByClassName.bind(document)

// Elements
const header = `header.header`
const dashboard = `.page.dashboard#dashboard`
const products = `.page.products#products`
const cart = `.page.cart#cart`
const home = `.page.home#home`

export const afterDOM = {
  header: {
    searchBox: () => <HTMLDivElement>$(`${header} .search`),
    searchInput: () => <HTMLInputElement>$(`${header} .search .search__input`),
    searchContainer: () => <HTMLDivElement>$(`${header} .search .search__container`),
    getAllSearchProducts: () => <HTMLDivElement[]>Array.from($$(`${header} .search__container .search__product`)),
    normal: {
      loginBtn: () => <HTMLButtonElement>GEBI(`loginbtn`),
      signupBtn: () => <HTMLButtonElement>GEBI(`signupbtn`)
    },
    user: {
      self: () => <HTMLDivElement>$(`${header} .user`),
      menuBtn: () => <HTMLDivElement>$(`${header} .user .user__icon`),
      menuBox: () => <HTMLDivElement>$(`${header} .user .user__menu`),
      logoutbtn: () => <HTMLDivElement>$(`${header} .user .user__menu #logoutbtn`),
      checkoutBtn: () => <HTMLUListElement>$(`${header} .user .checkout .checkout__icon`),
      checkoutMenu: () => <HTMLUListElement>$(`${header} .user .checkout .checkout__menu`),
      allCheckoutItems: () => <HTMLLIElement[]>Array.from($$(`${header} .user .checkout__menu__item`))
    }
  },
  loginForm: {
    self: () => $(`.modal #loginform`) as HTMLFormElement,
    emailInput: () => $(`.modal #loginform input#loginemail`) as HTMLInputElement,
    passwordInput: () => $(`.modal #loginform input#loginpassword`) as HTMLInputElement,
    submitloginBtn: () => $(`.modal #loginform input[type="submit"]`) as HTMLInputElement
  },
  pages: {
    home: {
      getAllProducts: () => <HTMLDivElement[]>Array.from($$(`${home} .product-card`)),
    },
    products: {
      allSubCategoryProducts: () => <HTMLDivElement[]>Array.from($$(`${products} .products__sub-categories .product-card`)),
      allProducts: () => <HTMLDivElement[]>Array.from($$(`${products} .products__products .all .product-item`)),
      productModal: () => $(`.modal .solo-product`) as HTMLDivElement,
    },
    cart: {
      deleteBtns: () => <HTMLDivElement[]>Array.from($$(`${cart} .product-card__settings`)),
      allProducts: () => <HTMLDivElement[]>Array.from($$(`${cart} .allproducts .product-card`)),
      selectBtn: () => <HTMLSpanElement[]>Array.from($$(`${cart} .allproducts .product-card .product-card__cart`)),
      checkoutModel: {
        form: () => <HTMLFormElement>$(`.modal .checkout-box #location-form`),
        products: () => <HTMLDivElement[]>Array.from($$(`.modal .checkout-box .checkout-box__product`)),
        quantityInputs: () => <HTMLInputElement[]>Array.from($$(`.modal .checkout-box .checkout-box__product__quantity`)),
        totalProductPrice: () => <HTMLParagraphElement[]>Array.from($$(`.modal .checkout-box .checkout-box__product__total`)),
        blockInput: () => <HTMLSelectElement>$(`.modal .checkout-box  #location-form select#block`),
        buildingInput: () => <HTMLInputElement>$(`.modal .checkout-box #location-form input#building`),
        apartmentInput: () => <HTMLInputElement>$(`.modal .checkout-box #location-form input#apartment`),
        entraceInput: () => <HTMLSelectElement>$(`.modal .checkout-box #location-form select#entrace`),
        mainTotalPrice: () => <HTMLSpanElement>$(`.modal .checkout-box #location-form span#total-price`),
        submitBtn: () => <HTMLInputElement>$(`.modal .checkout-box #location-form input#checkout-btn`)
      }
    },
  },
  checkoutItems: {
    checkoutDeleteBtn: () => <HTMLElement>$(`.checkoutone-box__header__remover`),
  }
}

export default {
  pages: {
    self: <HTMLDivElement>$('.pages'),
    home: {
      self: $('.page.home#home') as HTMLDivElement,
      banner: $('.page.home#home .banner') as HTMLDivElement,
      bannerSlider: $('.page.home#home .banner .banner__slider') as HTMLDivElement,
      bannerItems: Array.from($$('.page.home#home .banner .banner__item')) as HTMLDivElement[],
      popularProducts: <HTMLDivElement>$(`${home} .home-top-products`)
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
        img: <HTMLDivElement>$(`${dashboard} .form__user-details .img`),
        btn: <HTMLButtonElement>$(`${dashboard} .form__user-details button`)
      },
      passwordBox: {
        self: <HTMLFormElement>$(`${dashboard} form.form__user-password`),
        currentPassword: <HTMLInputElement>$(`${dashboard} form.form__user-password input#current-password`),
        newPassword: <HTMLInputElement>$(`${dashboard} form.form__user-password input#new-password`),
        confirmPassword: <HTMLInputElement>$(`${dashboard} form.form__user-password input#confirm-password`),
      },
      locationBox: {
        form: <HTMLFormElement>$(`${dashboard} .dashboard__location-information form`),
        blockInput: <HTMLSelectElement>$(`${dashboard} .dashboard__location-information select#location-block`),
        buildingInput: <HTMLInputElement>$(`${dashboard} .dashboard__location-information input#location-building`),
        entraceInput: <HTMLSelectElement>$(`${dashboard} .dashboard__location-information select#location-entrace`),
        apartment: <HTMLInputElement>$(`${dashboard} .dashboard__location-information input#location-apartment`),
        submitBtn: <HTMLButtonElement>$(`${dashboard} .dashboard__location-information select#location-building`),
      }
    },  
    cart: {
      self: <HTMLDivElement>$(`${cart} `),
      top: {
        self: <HTMLDivElement>$(`${cart} .top`),
        items: <HTMLParagraphElement>$(`${cart} .top .info__items`),
        total: <HTMLParagraphElement>$(`${cart} .top .info__total`),
        select: <HTMLSelectElement>$(`${cart} .top .action select`),
        checkoutBtn: <HTMLButtonElement>$(`${cart} .top .action button`)
      },
      all: <HTMLDivElement>$(`${cart} .allproducts`)
    },
    contact: $('.page.contact#contact') as HTMLDivElement,
    error: $('.page.error#error') as HTMLDivElement
  },

  aside: {
    self: <HTMLDivElement>$(`aside.aside`),
    asideToggleBtn: <HTMLElement>$(`aside.aside .toggle-btn`),
    nav: {
      self: $('header.header nav.nav') as HTMLDivElement,
      items: Array.from($$('aside.aside nav.nav .nav__item')) as HTMLLIElement[],
      links: Array.from($$('aside.aside nav.nav .nav__link')) as HTMLAnchorElement[]
    }
  },

  header: {
    self: $('header.header') as HTMLDivElement,
  }
}