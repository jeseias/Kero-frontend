import { svgLocation } from './View'

export const loginTemp = `
  <form id="loginform">
    <svg class="close">
      <use xlink:href="${svgLocation}circle-with-cross"></use>
    </svg>
    <h1>Login</h1>
    <input class="form-element" placeholder="email" type="email" id="loginemail" />
    <input class="form-element" placeholder="senha" type="password" id="loginpassword" />
    <input class="form-element" type="submit" value="Entrar"/>
  </form>
`