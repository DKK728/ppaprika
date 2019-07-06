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
export const addAuthorityRole = (data) => {
    return axios ({
        url: 'roles',
        method: 'post',
        data: { roleName: data.roleName, roleDesc: data.roleDesc?data.roleDesc:''}
    })
}
export const deleteRole = (id) => {
    return axios ({
        url: `roles/${id}`,
        method: 'delete'
    })
}
export const updateRole = (data) => {
    return axios ({
        url: `roles/${data.id}`,
        method: 'put',
        data: { roleName: data.roleName, roleDesc: data.roleDesc}
    })
}
export const updateRoleRights = (roleId,rids) => {
    return axios ({
        url: `roles/${roleId}/rights`,
        method: 'post',
        data: { rids }
    })
}