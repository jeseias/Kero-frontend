import { IKeroClient } from "../constants/interfaces";
import DOM from "./elements";

export const autoMountUserData: (user: IKeroClient) => void = user => {
  const { 
    messageForm: { name, number },
  } = DOM.pages.about

  name.value = `${user.loggedUser?.name}`
  number.value = `${user.loggedUser?.phone}`

  name.readOnly = true
  number.readOnly = true
} 