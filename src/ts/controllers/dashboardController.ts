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

export const dashboardPageCtrl: () => Promise<void> = async () => {

  if (App.AppData.loggedUser) {
    toPage('dashboard')
    return await sendReview()
  } 

  alertUser(false, 'Faça login para acessar a sua conta!'), 
  toPage('products')
}