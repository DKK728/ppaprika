<template>
  <div>
    <el-form :model="form" ref="form" :rules="rules" class="form">
      <el-form-item class="form-item" prop="username">
        <el-input placeholder="用户名/手机" v-model="form.username" clearable autofocus = true></el-input>
      </el-form-item>

      <el-form-item class="form-item" prop="password">
        <el-input placeholder="密码" type="password" v-model="form.password" clearable></el-input>
      </el-form-item>

      <p class="form-text">
        <nuxt-link to="#">忘记密码</nuxt-link>
      </p>

      <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: "",   // 登录用户名/手机
        password: ""    // 登录密码
      },
      rules: {

        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
        ]

      }
    }
  },
  methods: {
    handleLoginSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', this.form)
            .then(res => {
              console.log(res)
              if (res.status === 200) {
                this.$message.success('login success !')
                setTimeout(() => {
                  this.$router.push("/")
                }, 1000);
              }
              // this.$message.success('login success !')
              // setTimeout(() => {
              //   this.$router.push("/")
              // }, 1000);
            })
          //写在axios.js里面了
          // .catch(err => {
          //   // console.log(err)
          //   // console.log(err.response)
          //   // console.log(err.request)
          //   // console.log(err.message)
          //   if (err.response.status === 400) {
          //     this.$message.error(err.response.data.message)
          //   }
          // })

        }
      })

    }
  }
}
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}
.form-item {
  margin-bottom: 20px;
}
.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}
.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
