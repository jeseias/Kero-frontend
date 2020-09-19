import App from '../App'
import { DashboardAPI } from '../models/Dashboard'
import { alertUser } from '../models/Alert'

import { toPage } from '../routes/PageControllers'

import DOM from '../views/elements'
import { formFieldsCleaner } from '../views/View'

import { IReviewSend, IReview } from '../constants/Interfaces'

const sendReview: () => Promise<void> = async () => {
  const { message, rating, form, submitBtn } = DOM.pages.dashboard.reviewBox

  form.addEventListener('submit', (e: Event) => {
    e.preventDefault()

    if (!message.value) return alertUser(false, 'Escreva o seu testemunho!')
    if (!rating.value) return alertUser(false, 'Qual é o nivel do nosso serviço!')

    submitBtn.disabled = true
    submitBtn.textContent = 'Enviando testemunho'

    if (App.AppData?.loggedUser?._id) {
      DashboardAPI('reviews').store<IReviewSend, IReview>({
        rating: parseInt(rating.value),
        review: message.value,
        user: App.AppData.loggedUser._id
      }, 'Testemunho enviado com successo', App.AppData.loggedUser.token)

      formFieldsCleaner([rating, message], null)

      submitBtn.disabled = false
      submitBtn.textContent = 'Criar testemunho'
    }
  })
}

const setUserData: () => void = () => {
  const { name, email, phone, img } = DOM.pages.dashboard.userDetails
  const { loggedUser } = App.AppData

  if (loggedUser) {
    name.value = loggedUser.name
    email.value = loggedUser.email
    phone.value = loggedUser.phone

    img.style.backgroundImage = `url(${loggedUser.img__url})`
  }
}

const updateUserData: () => Promise<void> = async () => {
  const { name, email, phone, img, file } = DOM.pages.dashboard.userDetails

  file.addEventListener('change', () => {
    const imgFile = Array.from(file.files!)[0]

    if (img) {
      const imgLink = URL.createObjectURL(imgFile)

      img.style.backgroundImage = `url(${imgLink})`
    }
  })
}

export const dashboardPageCtrl: () => Promise<void> = async () => {

  if (App.AppData.loggedUser) {
    toPage('dashboard')
    setUserData()

    await updateUserData()
    return await sendReview()
  } 

  alertUser(false, 'Faça login para acessar a sua conta!'), 
  toPage('products')
}