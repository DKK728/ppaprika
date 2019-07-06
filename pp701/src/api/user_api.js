import axios from '@/api/interceptor.js'

export const login = (data) => {
  return axios({
    method: 'post',
    url: 'login',
    data
  })
}
export const getUserList = (pa) => {
  return axios({
    url: 'users',
    params: pa
  })
}
export const addUser = (userdata) => {
  return axios({
    url: 'users',
    method: 'post',
    data: userdata
  })
}
export const userStatusChange = (uid, type) => {
  return axios({
    url: `users/${uid}/state/${type}`,
    method: 'put'
  })
}
export const updateUser = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data: { email: data.email, mobile: data.mobile}
  })
}
export const deleteUser = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}
