<template>
  <div>
    <el-form :model="form" ref="form" :rules="rules" class="form" status-icon>
      <el-form-item class="form-item" prop="username">
        <el-input placeholder="用户名/手机" v-model="form.username" clearable></el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="captcha">
        <el-input placeholder="请输入验证码" v-model="form.captcha">
          <el-button slot="append" @click="getCaptcha" v-text="text" :disabled="disabled"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="nickname">
        <el-input placeholder="你的名字" v-model="form.nickname" clearable :readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="password">
        <el-input
          placeholder="密码"
          type="password"
          v-model="form.password"
          clearable
          :readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="repassword">
        <el-input placeholder="确认密码" type="password" v-model="form.repassword" clearable></el-input>
      </el-form-item>
      <el-button class="submit" type="primary" @click="handleRegisterSubmit">注册</el-button>
    </el-form>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  data () {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",   // 登录用户名/手机
        password: "",    // 登录密码
        repassword: "",    //
        nickname: "",
        captcha: ""
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
          }
        ],
        repassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        nickname: [
          {
            required: true,
            message: '请输入你的名字',
            trigger: 'blur'
          }
        ],
        captcha: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ]
      },
      readonly: 'readonly',
      disabled: false,
      text: '获取验证码'
    }

  },
  methods: {
    handleRegisterSubmit () {
      this.$refs.form.validate((valid) => {
        let { repassword, ...props } = this.form
        this.$store.dispatch('user/register', props)
          .then(res => {
            this.$store.commit('user/setUserInfo', res.data)
            this.$message.success('注册成功!')
            setTimeout(() => {
              this.$router.replace("/")
            }, 1000);
          })
      })
    },
    resetReadonly () {
      // let _this = this
      setTimeout(() => {
        this.readonly = false
      }, 900)
    },
    getCaptcha () {
      let phoneNumber = this.form.username
      if (!phoneNumber.trim()) {
        this.$message.warning('请输入手机号');
        return;
      }
      this.$store.dispatch('user/captcha', phoneNumber)
        .then(res => {
          this.$confirm(`您的验证码是${res.data.code}`, '提示', { confirmButtonText: '确定', type: 'warning' })
          this.form.captcha = res.data.code
        })
      this.text = 10
      this.disabled = 'disabled'
      let interval = setInterval(() => {
        this.text = --this.text
        if (this.text == 0) {
          clearInterval(interval)
          this.text = '获取验证码'
          this.disabled = false
        }
      }, 1000)
    }
  },
  mounted () {
    this.resetReadonly()
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
.submit {
  width: 100%;
}
</style>
