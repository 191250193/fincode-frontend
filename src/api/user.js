import axios from '@/plugins/axios'

export async function login(username, passport, password) {
  const { data } = await axios.post('/user/signin', {
    username,
    passport,
    password
  })
  return data
}

export async function register(username, passport, password, password2) {
  const { data } = await axios.post('/user/signup', {
    username,
    passport,
    password,
    password2
  })

  return data
}
