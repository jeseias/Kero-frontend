import DOM from './elements'

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
      <button><a href="#about">Seje Nosso Cliente</a></button>
      <button>Faça Login</button>
    </div>
  `

  self.insertAdjacentHTML('afterbegin', temp)
}


const userLoggedHeader = () => {
  const { self } = DOM.header

  const temp = `
    ${HeaderMainTemp}
    <div class="user">
      <p class="user__name">Jeseias Domingos</p>
      <img class="user__img" /> 
      <div class="user__icon"></div>
      <ul class="user__menu">
        <li class="user__item">Minha Conta</li>
        <li class="user__item">Sair</li>
      </ul>
    </div>
  `

  self.insertAdjacentHTML('afterbegin', temp)
}

export default {
  normalHeader,
  userLoggedHeader
}