import axios from '@/api/interceptor.js'

export const login = (data) => {
  return axios({
    method: 'post',
    url: 'login',
    data
  })
}
export const getUserList = (pa) => {
  return axios ({
    url: 'users',
    params: pa
  })
}
export const addUser = (userdata) => {
  return axios ({
    url: 'users',
    method: 'post',
    data: userdata
  })
}
