<template>
  <div>
    <div class="container">
      <el-row type="flex" justify="space-between" class="main">
        <div class="logo">
          <nuxt-link to="/">
            <img src="../assets/logo.png" alt />
          </nuxt-link>
        </div>
        <el-row type="flex" class="navs">
          <nuxt-link to="/">首页</nuxt-link>
          <nuxt-link to="/post">旅游攻略</nuxt-link>
          <nuxt-link to="/hotel">酒店</nuxt-link>
          <nuxt-link to="/air">国内机票</nuxt-link>
        </el-row>
        <el-row type="flex" class="login">
          <div v-if="!$store.state.user.userInfo.token" class="loginRegister">
            <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
          </div>
          <div v-else>
            <el-dropdown>
              <span class="el-dropdown-link">
                <div>
                  <img src="../assets/head.png" alt />
                  <!-- 可以改为<img:src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar"> -->
                  {{$store.state.user.userInfo.user.nickname}}
                  <i
                    class="el-icon-arrow-down el-icon--right"
                  ></i>
                </div>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-row>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '黑马程序员'
    }
  },
  methods: {
    handleLogout () {
      // console.log('退出')
      this.$store.commit('user/resetUserInfo')
      this.$message.success('退出成功')
      setTimeout(() => {
        this.$router.replace("/user/login")
      }, 1000);
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  height: 60px;
  box-shadow: 0 3px 30px #ccc;
  .main {
    width: 1000px;
    margin: 0 auto;
    .logo {
      img {
        width: 142px;
        height: 42px;
        margin-top: 9px;
      }
    }
    .navs {
      flex: 1;
      margin: 0 20px;
      a {
        display: block;
        padding: 0 20px;
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        &:hover {
          border-bottom: 5px #409eff solid;
          color: #409eff;
        }
      }
      .nuxt-link-exact-active {
        background-color: #409eff;
        color: #fff;
        &:hover {
          color: #fff;
        }
      }
    }
    .login {
      line-height: 60px;
      font-size: 14px;
      color: #606266;
      &:hover {
          color: #409eff;
        }
      span {
        cursor: pointer;
      }
      .el-dropdown-link {
        img {
          height: 36px;
          border-radius: 18px;
          vertical-align: middle;
          margin-right: 10px;
          &:hover {
            box-shadow: 0 0 5px #409eff;
            border: 1px solid #409eff;
          }
        }
        &:hover {
          color: #409eff;
        }
      }
    }
  }
}
</style>
