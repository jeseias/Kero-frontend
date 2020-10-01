import DOM from './elements'

import { ILoggedUser } from '../constants/Interfaces'

const mountHeader: (header: HTMLDivElement, temp: string) => void = (header, temp) => {
  Array.from(header.children).forEach(child => header.removeChild(child))
  header.insertAdjacentHTML('afterbegin', temp)
} 

const HeaderMainTemp = `
  <div class="main">
    <h1>Hipermercado Kero Sequele</h1>
  </div>
`

const normalHeader = () => {
  const { self } = DOM.header

  const temp = `
    ${HeaderMainTemp}
    <div class="normal">
      <button id='signupbtn'><a href="#about">Seje Nosso Cliente</a></button>
      <button id="loginbtn">Faça Login</button>
    </div>
  `

  mountHeader(self, temp)
}

const userLoggedHeader: (user: ILoggedUser) => void = (user) => {
  const { self } = DOM.header
  const svgLocation = 'src/assets/SVGs/sprite.svg#icon-'
  const temp = `
    ${HeaderMainTemp}
    <div class="user">
      <div class="checkout">
        <svg class="checkout__icon">
          <use xlink:href="${svgLocation}shopping-bag"></use>
        </svg>
        <ul class="checkout__menu"> 
        </ul>
      </div>
      <p class="user__name">${user.name}</p>
      <img class="user__img" src='${user.img__url}' /> 
      <svg class="user__icon">
        <use xlink:href="${svgLocation}chevron-with-circle-down"></use>
      </svg>
      <ul class="user__menu">
        <a class="user__menu__item" href="#dashboard">Minha Conta</a>
        <a class="user__menu__item" href="#carrinho">Carrinho</a> 
        <li class="user__menu__item" id="logoutbtn">Sair</li>
      </ul>
    </div>
  `

  mountHeader(self, temp)
  
}

export default {
  normalHeader,
  userLoggedHeader
}