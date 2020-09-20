import App from '../App'
import { DashboardAPI } from '../models/Dashboard'
import { alertUser } from '../models/Alert'
import { saveUser } from '../models/Auth'
import api from '../services/api'

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
  const { name, email, phone, img, file, userForm } = DOM.pages.dashboard.userDetails

  file.addEventListener('change', () => {
    const imgFile = Array.from(file.files!)[0]

    if (img) {
      const imgLink = URL.createObjectURL(imgFile)

      img.style.backgroundImage = `url(${imgLink})`
    }
  })

  const updateUserLS: (user: any) => void = (updatedUser) => {
    const user = App.AppData.loggedUser!
    user.email = updatedUser.email
    user.name = updatedUser.name
    user.photo = updatedUser.photo
    user.img__url = updatedUser.img__url
    saveUser(user!)
    App.init()
  }

  userForm.addEventListener('submit', async (e: Event) => {
    e.preventDefault()

    const img = file.files?.item(0)

    if (!name.value) return alertUser(false, 'O nome!')
    if (!email.value) return alertUser(false, 'O email!')
    if (!phone.value) return alertUser(false, 'O telefone!')

    if (img) {
      const userData = new FormData()

      userData.append('photo', img)
      userData.append('name', name.value)
      userData.append('email', email.value)
      userData.append('phone', phone.value)

      try {
        const res = await api.patch('/users/updateMe', userData, {
          headers: {
            authorization: `Bearer ${App.AppData.loggedUser!.token}`
          }
        })

        const { status, data: { user: updatedUser } } = res.data
        updateUserLS(updatedUser)
        alertUser(true, 'Atualização feita com successo')

      } catch (err) {
        alertUser(false, err.response.message)
      }
    } else {
      try {
        const res = await api.patch('/users/updateMe', {
          name: name.value,
          email: email.value,
          phone: name.value
        }, {
          headers: {
            authorization: `Bearer ${App.AppData.loggedUser!.token}`
          }
        })

        const { status, data: { user: updatedUser } } = res.data
        updateUserLS(updatedUser)
        alertUser(true, 'Atualização feita com successo')

      } catch (err) {
        alertUser(false, err.response.message)
      }
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