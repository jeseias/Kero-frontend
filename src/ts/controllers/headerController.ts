import { logoutHandler } from './authController'
 
import { afterDOM } from '../views/elements'

export const showUserMenu: () => void = () => {
  const { menuBtn, menuBox } = afterDOM.header.user

  menuBtn().addEventListener('click', () => {
    menuBox().classList.toggle('visible')

    setTimeout(() => {
      if (menuBox().classList.contains('visible')) {
        document.body.addEventListener('click', (e: Event) => {
          const el = <HTMLElement>e.target
  
          if (!el.classList.contains('user__menu')) {
            menuBox().classList.remove('visible')
          }
        })
      }
    }, 100)
  })

  menuBox().addEventListener('mouseleave', () => {
    menuBox().classList.remove('visible')
  })

  logoutHandler()
}