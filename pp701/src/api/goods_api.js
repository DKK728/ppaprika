import axios from '@/api/interceptor.js'

export const getAllGoods = (pa) => {
  return axios({
    url: 'goods',
    params: pa
  })
}
export const deleteGoods = (id) => {
  return axios({
    url: `goods/${id}`,
    method: 'delete'
  })
}
