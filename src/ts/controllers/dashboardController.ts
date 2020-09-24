import App from '../App'
import { DashboardAPI, normalDataUpdate, imgDataUpdate, passwordUpdate } from '../models/Dashboard'
import { alertUser } from '../models/Alert'

import { toPage } from '../routes/PageControllers'

import DOM from '../views/elements'
import { formFieldsCleaner, userInputNotifacation } from '../views/View'

import { IReviewSend, IReview, IUserLocation, IKeroClient } from '../constants/Interfaces'

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
  const { 
    userDetails: { name, email, phone, img },
    locationBox: { blockInput, buildingInput, entraceInput, apartment }
  } = DOM.pages.dashboard 

  const { location }: IKeroClient = JSON.parse(localStorage.getItem('kero-client')!)
  const { loggedUser } = App.AppData

  if (loggedUser) {
    name.value = loggedUser.name
    email.value = loggedUser.email
    phone.value = loggedUser.phone

    img.style.backgroundImage = `url(${loggedUser.img__url})`
  }

  if (location) {
    blockInput.value = `${location.block}`
    buildingInput.value = `${location.building}`
    entraceInput.value = `${location.entrace}`
    apartment.value = `${location.apartment}`
  }
}

const updateUserData: () => Promise<void> = async () => {
  const { name, email, phone, img, file, userForm, btn } = DOM.pages.dashboard.userDetails

  file.addEventListener('change', () => {
    const imgFile = Array.from(file.files!)[0]

    if (img) {
      const imgLink = URL.createObjectURL(imgFile)

      img.style.backgroundImage = `url(${imgLink})`
    }
  })

  userForm.addEventListener('submit', async (e: Event) => {
    e.preventDefault()

    btn.disabled = true
    btn.textContent = 'Enviando...'
    const img = file.files?.item(0)

    if (!name.value) return alertUser(false, 'O nome!')
    if (!email.value) return alertUser(false, 'O email!')
    if (!phone.value) return alertUser(false, 'O telefone!')

    btn.disabled = true
    btn.textContent = 'Enviando...'

    if (img) return await imgDataUpdate({ 
      phone: parseInt(phone.value), 
      email: email.value, 
      name: name.value, 
      file: img 
    })

    await normalDataUpdate({ phone: parseInt(phone.value), email: email.value, name: name.value })
  })
}

const updateUserPassword: () => Promise<void> = async () => {
  const { self, confirmPassword, currentPassword, newPassword } = DOM.pages.dashboard.passwordBox

  self.addEventListener('submit', async (e: Event) => {
    e.preventDefault()

    if (!currentPassword.value) return alertUser(false, 'A sua senha atual!')
    if (!newPassword.value) return alertUser(false, 'A sua nova senha!')
    if (!confirmPassword.value) return alertUser(false, 'Confirma a sua senha!')
    if (confirmPassword.value !== newPassword.value) return alertUser(false, 'Senhas não são iguais!')

    await passwordUpdate({
      password: newPassword.value,
      passwordConfirm: confirmPassword.value,
      passwordCurrent: currentPassword.value
    })
  })
}

const saveUserLocation: () => void = () => {
  const { blockInput, buildingInput, entraceInput, apartment, form } = DOM.pages.dashboard.locationBox
  
  form.addEventListener('submit', (e: Event) => {
    e.preventDefault()

    userInputNotifacation([
      [buildingInput, 'O numero do seu predio']
    ]) 

    const userLocation: IUserLocation = {
      block: parseInt(blockInput.value),
      building: parseInt(buildingInput.value),
      entrace: entraceInput.value,
      apartment: apartment.value
    }

   const KeroClient: IKeroClient = JSON.parse(localStorage.getItem('kero-client')!);
   console.log(KeroClient)

   KeroClient.location = userLocation
   console.log(KeroClient)

   localStorage.setItem('kero-client', JSON.stringify(KeroClient))
  });

}

export const dashboardPageCtrl: () => Promise<void> = async () => {

  if (!App.AppData.loggedUser) {
    toPage('products')
    return alertUser(false, 'Faça login para acessar a sua conta!')
  } 

  toPage('dashboard')
  setUserData()
  saveUserLocation()

  await updateUserData()
  await updateUserPassword()
  await sendReview()
  await updateUserPassword()
}