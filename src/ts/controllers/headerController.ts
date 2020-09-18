import { logoutHandler } from './authController'
 
import { afterDOM } from '../views/elements'

export const showUserMenu: () => void = () => {
  const { menuBtn, menuBox } = afterDOM.header.user

  menuBtn().addEventListener('click', () => {
    menuBox().classList.toggle('visible')
  })

  menuBox().addEventListener('mouseleave', () => {
    menuBox().classList.remove('visible')
  })

  logoutHandler()
}