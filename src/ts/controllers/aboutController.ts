import { ContactAPI } from '../models/About'
import { UsersAPI } from '../models/Users'
import { alertUser } from '../models/Alert'

import { toPage } from '../routes/PageControllers'

import DOM from '../views/elements'
import { formFieldsCleaner } from '../views/View'

import { ISignup, IMessage } from '../constants/Interfaces'

const contactForm: () => void = () => {
  const { form, name, number, message, btn } = DOM.pages.about.messageForm

    form.addEventListener('submit', async (e: Event) => {
      e.preventDefault()

      if (!name.value) return alertUser(false, 'Diz-nos o seu nome!')
      if (!number.value) return alertUser(false, 'Precisamos do seu numero de telfone')
      if (!message.value) return alertUser(false, 'Escreva a mensagen!')

      const data = {
        name: name.value,
        number: parseInt(number.value),
        message: message.value
      }

      btn.disabled = true
      btn.value = 'Enviando mensagen ...'
      await ContactAPI.store<IMessage>(data, 'Mensagem enviada com successo')
      formFieldsCleaner([name, number, message], null)
      btn.value = 'Enviar'
      btn.disabled = false
    })
}

const signupForm: () => void = () => {
  const { form, name, number, email, password, passwordConfirm, btn } = DOM.pages.about.signupForm

    form.addEventListener('submit', async (e: Event) => {
      e.preventDefault()

      if (!name.value) return alertUser(false, 'Seu nome!')
      if (!number.value) return alertUser(false, 'Seu numero de telefone')
      if (!email.value) return alertUser(false, 'Seu email!')
      if (!password.value) return alertUser(false, 'Sua senha!')
      if (!passwordConfirm.value) return alertUser(false, 'Confima a sua senha!')
      if (password.value !== passwordConfirm.value) return alertUser(false, 'Senhas não são iguais!')

      const data: ISignup = {
        name: name.value,
        email: email.value,
        phone: parseInt(number.value),
        password: password.value,
        passwordConfirm: passwordConfirm.value
      }
      
      btn.disabled = true
      await UsersAPI.store<ISignup>(data, 'A sua conta foi criada com successo', 'users/signup')
      formFieldsCleaner([name, email, number, password, passwordConfirm], null)
      btn.disabled = false
    })
}

export const aboutPageCtrl: () => Promise<void> = 
  async () => {
    toPage('about')

    contactForm()
    signupForm()
  }