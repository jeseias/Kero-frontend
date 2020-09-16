import axios from 'axios'

// API
export default axios.create({
  baseURL: false ? 'https://saturno-app.herokuapp.com/api/v1/' : 'http://127.0.0.1:3333/api/v1'
})