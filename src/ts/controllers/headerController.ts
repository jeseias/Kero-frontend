import { logoutHandler } from './authController'
 
import { afterDOM } from '../views/elements'

import { menuToggler } from '../views/View'

export const showUserMenu: () => void = () => {
  const { menuBtn, menuBox } = afterDOM.header.user

  menuToggler(menuBtn(), menuBox(), 'user')

  logoutHandler()
}