import { logoutHandler } from './authController'
 
import { afterDOM } from '../views/elements'

export const showUserMenu: () => void = () => {
  const { menuBtn, menuBox } = afterDOM.header.user

  menuBtn().addEventListener('click', () => {
    menuBox().style.display = 'block'
    setTimeout(() => {
      menuBox().classList.toggle('visible') 
    }, 100) 
  })

  menuBox().addEventListener('mouseleave', () => {
    menuBox().classList.remove('visible')
  })

  logoutHandler()
}