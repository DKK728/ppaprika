import axios from '@/api/interceptor.js'

export const getAllCategories = (pa) => {
    return axios({
        url: 'categories',
        params: pa
    })
}
