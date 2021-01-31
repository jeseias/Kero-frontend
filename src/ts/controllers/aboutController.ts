import App from '../App'
import { ContactAPI } from '../models/About'
import { UsersAPI } from '../models/Users'
import { alertUser } from '../models/Alert'
import { saveUser, isUserLogged } from '../models/Auth'

import { toPage } from '../routes/PageControllers'
import { autoMountUserData } from '../views/aboutView'

import DOM from '../views/elements'
import { formFieldsCleaner } from '../views/View'

import { ISignup, IMessage, ILoggedUser, IAuthRes, IKeroClient } from '../constants/interfaces'

const contactForm: () => void = () => {
  const { form, name, number, message, btn } = DOM.pages.about.messageForm
  const user = App.AppData.loggedUser

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

    await ContactAPI.store<IMessage, {}>(data, 'Mensagem enviada com successo')

    formFieldsCleaner([name, number, message], null)

    btn.value = 'Enviar'
    btn.disabled = false

    if (user) {
      name.value = user.name
      number.value = user.phone
    }
  })
}

const signupForm: () => void = () => {
  const { form, name, number, email, password, passwordConfirm, btn } = DOM.pages.about.signupForm

  if (App.AppData.loggedUser) {
    btn.disabled = true;
    btn.classList.add('disabled')
  }

  form.addEventListener('submit', async (e: Event) => {
    e.preventDefault()

    if (!name.value) return alertUser(false, 'Seu nome!')
    if (!number.value) return alertUser(false, 'Seu numero de telefone')
    if (!email.value) return alertUser(false, 'Seu email!')
    if (!password.value) return alertUser(false, 'Sua senha!')
    if (!passwordConfirm.value) return alertUser(false, 'Confima a sua senha!')
    if (password.value !== passwordConfirm.value) return alertUser(false, 'Senhas não são iguais!')

    const signupData: ISignup = {
      name: name.value,
      email: email.value,
      phone: parseInt(number.value),
      password: password.value,
      passwordConfirm: passwordConfirm.value
    }
    
    btn.disabled = true
    const { data: { token, data: { user } } } = await UsersAPI.store<ISignup, IAuthRes<ILoggedUser>>(signupData, 'A sua conta foi criada com successo', undefined, 'users/signup')
    
    formFieldsCleaner([name, email, number, password, passwordConfirm], null)
    btn.disabled = false 
    
    const loggedUser: ILoggedUser = { ...user, token }
    saveUser(loggedUser)
    App.toPage('products')
  })
}

const autoFillDataInForm: () => void = () => {
  if (isUserLogged()) {
    let KeroClient: IKeroClient = JSON.parse(localStorage.getItem('kero-client')!)

    autoMountUserData(KeroClient)
  } 
}

export const aboutPageCtrl: () => Promise<void> = 
  async () => {
    toPage('about')

    contactForm()
    signupForm()

    // If user is logged Auto fill his user data
    autoFillDataInForm()
  }