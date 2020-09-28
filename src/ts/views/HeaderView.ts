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

  const temp = `
    ${HeaderMainTemp}
    <div class="user">
      <div class="checkout">
        <div class="checkout__icon"></div>
        <ul class="checkout__menu"> 
        </ul>
      </div>
      <p class="user__name">${user.name}</p>
      <img class="user__img" src='${user.img__url}' /> 
      <div class="user__icon"></div>
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