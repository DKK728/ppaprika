import axios from '@/api/interceptor.js'

export const allotUser = (id,rid) => {
    return axios({
        url: `users/${id}/role`,
        method: 'put',
        data: { rid: rid }
    })
}
export const getAllRoleList = (data) => {
    return axios({
        url: 'roles'
    })
}
