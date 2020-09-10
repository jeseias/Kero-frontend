import DOM, { $, GEBI } from '../views/elements'

const setHash: (hash: string) => void = 
  (hash) => window.location.hash = hash;

const setNavItemActive: (hash: string) => void = (hash) => {
  const { items, links } = DOM.header.nav
  const activeClass = 'nav__item--active'

  links.forEach(link => {
    link.hash.replace('#', '') !== hash
      ? link.parentElement!.classList.remove(activeClass) 
      : link.parentElement!.classList.add(activeClass)
  })
}

const toPage: (to: string) => void = (to) => {
  const currentPage = <HTMLDivElement | undefined>$('.page.visible')

  const setPage: () => void = () => {
    const page = <HTMLDivElement>GEBI(to)
    page.classList.add('visible') 
    setHash(to)
    setNavItemActive(to)
  }
  
  if (currentPage) {
    currentPage.classList.remove('visible');
    setPage();
  } else {
    setPage();
  }
}

const homepage: () => void = () => {
  toPage('home')
}

const aboutpage: () => void = () => {
  toPage('about')
}

const productspage: () => void = () => {
  toPage('products')
}

const contactpage: () => void = () => {
  toPage('contact')
}

const errorpage: () => void = () => {
  toPage('error')
}

export {
  homepage,
  aboutpage,
  productspage,
  contactpage,
  errorpage,
  toPage
}