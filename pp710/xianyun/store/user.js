export const state = () => {
  return {
    userInfo: {
      token: "",
      user: {

      }
    }
    // userInfo: JSON.parse(window.localStorage.getItem('userInfo')) || {}
  }

}
export const mutations = {
  setUserInfo (state, data) {
    state.userInfo = data;
    // localStorage.setItem('userInfo', JSON.stringify(data))
  },
  resetUserInfo (state) {
    state.userInfo = {
      token: "",
      user: {
        nickname: ''
      }
    }

  }
}
export const actions = {
  //如何设置返回值
  login ({ commit }, data) {
    return this.$axios({
      url: '/accounts/login',
      method: 'POST',
      data: data
    })
    // .then(res => {
    //   commit('setUserInfo', res.data)
    // })
  },
  captcha ({ commit }, data) {
    return this.$axios({
      url: '/captchas',
      method: 'POST',
      data: {
        tel: data
      }
    })
  },
  register ({commit},data) {
    return this.$axios({
      url: 'accounts/register',
      method: 'POST',
      data: data
    })
  }
}