<template>
  <div class="container">
    <el-row type="flex" justify="center" align="middle" class="main">
      <div class="form-wrapper">
        <el-row type="flex" justify="center" class="tabs">
          <span
            :class="{active:currentTab === index}"
            v-for="(item,index) in [`登录`,`注册`]"
            :key="index"
            @click="handleChangeTab(index)"
          >{{item}}</span>
        </el-row>
        <LoginForm v-if="currentTab ==0" />
        <RegisterForm v-if="currentTab ==1" />
      </div>
    </el-row>
  </div>
</template>

<script>
import LoginForm from '@/components/user/loginForm.vue'
import RegisterForm from '@/components/user/registerForm.vue'
export default {
  data () {
    return {
      currentTab: 0
    }
  },
  mounted () {

  },
  methods: {
    handleChangeTab (index) {
      this.currentTab = index
    }
  },
  components: {
    LoginForm,
    RegisterForm
  }
}
</script>

<style scoped lang="less">
.container {
  height: 700px;
  background: url("../../assets/th03.jpg") center 0;
  min-width: 1000px;
  .main {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    .form-wrapper {
      width: 400px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
      position: absolute;
      top: 50%;
      transform: translate(0,-50%);
      .tabs {
        span {
          display: block;
          width: 50%;
          height: 50px;
          box-sizing: border-box;
          border-top: 2px #eee solid;
          background: #eee;
          line-height: 48px;
          text-align: center;
          cursor: pointer;
          color: #666;

          &.active {
            color: orange;
            border-top-color: orange;
            background: #fff;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
