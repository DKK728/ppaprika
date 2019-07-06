import axios from '@/api/interceptor.js'

export const allotUser = (id,rid) => {
    return axios({
        url: `users/${id}/role`,
        method: 'put',
        data: { rid: rid }
    })
}
export const getAllRoleList = () => {
    return axios({
        url: 'roles'
    })
}
export const deleteRightId = (roleId,rightId) => {
    return axios({
        url:`roles/${roleId}/rights/${rightId}`,
        method: 'delete'
    })
}