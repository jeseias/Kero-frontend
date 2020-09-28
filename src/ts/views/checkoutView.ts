import { ICheckoutProduct } from '../constants/Interfaces'

import { afterDOM } from './elements'
import { addChildren,  } from './View'

export const displayMyCheckouts: (checkouts: ICheckoutProduct[]) => void = (checkouts) => {
  const { checkoutMenu } = afterDOM.header.user 
  
  if (checkouts[0]) {
    const temp: (data: ICheckoutProduct) => string = checkout => `
      <li class="checkout__item" id="${checkout._id}">
        <h3 class="checkout__item__title">Encomenda - ${checkouts.findIndex((el) => { return el.total === checkout.total })}</h3>
        <span class="checkout__item__date">${checkout.products.length} Itens</span>
        <span class="checkout__item__state">
          ${checkout.state === 'sent' 
            ? 'Enviado'   
            : checkout.state === 'active' ? 'Activo' : 'Concluído'  
          }
        </span>
      </li>
    `
  
    return addChildren(checkoutMenu(), checkouts, temp)
  }

  checkoutMenu().insertAdjacentHTML('afterbegin', `
    <div class="empty">Vazio</div>
  `)  

}