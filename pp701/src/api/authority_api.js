import axios from '@/api/interceptor.js'

export const getAllAuthority = (type) => {
    return axios({
        url: `rights/${type}`
    })
}
export const getMenuList = () => {
    return axios ({
        url: 'menus'
    })
}