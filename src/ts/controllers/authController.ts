import App from '../App'
import { showModal, hideModal } from '../models/Modal'
import { login, logout } from '../models/Auth'
import { alertUser } from '../models/Alert'

import { afterDOM } from '../views/elements'
import { loginTemp } from '../views/AuthView'

export const loginHanlder: () => Promise<void> = async () => {
  const { loginBtn } = afterDOM.header.normal
  
  loginBtn().addEventListener('click', () => {
    showModal(loginTemp)

    const { self, emailInput, passwordInput } = afterDOM.loginForm

    self().addEventListener('submit', async (e: Event) => {
      e.preventDefault()
  
      const email = emailInput().value
      const password = passwordInput().value
  
      if (!email) return alertUser(false, 'Email!')
      if (!password) return alertUser(false, 'Senha!')
  
      await login({ email, password })
      hideModal()
    })
  }) 
}

export const logoutHandler: () => void = () => {
  const { logoutbtn } = afterDOM.header.user
  
  logoutbtn().addEventListener('click', async () => {
    await logout()
  })
}