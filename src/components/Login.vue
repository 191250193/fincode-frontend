<template>
  <div class="ant-modal">
    <a-modal
      v-model="innerVisibility"
      :title="title"
      @cancel="handleCancel"
      centered
      :footer="null"
      :closable="false"
    >
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules">
        <a-form-model-item
          has-feedback
          prop="passport"
          :wrapper-col="wrapperFormItem"
          key="passport"
        >
          <a-input
            v-model="ruleForm.passport"
            type="text"
            autocomplete="off"
            placeholder="账号"
          >
          </a-input>
        </a-form-model-item>
        <a-form-model-item
          has-feedback
          prop="pwd"
          :wrapper-col="wrapperFormItem"
          key="pwd"
        >
          <a-input
            v-model="ruleForm.pwd"
            type="password"
            autocomplete="off"
            placeholder="密码"
          >
            <!-- <a-icon slot="prefix" type="lock" style="color:rgba(255,255,255,.25)" /> -->
          </a-input>
        </a-form-model-item>
        <a-form-model-item
          has-feedback
          prop="checkPwd"
          :wrapper-col="wrapperFormItem"
          v-if="loginOrRegister === 1"
          key="pwd2"
        >
          <a-input
            v-model="ruleForm.checkPwd"
            type="password"
            autocomplete="off"
            placeholder="再次确认密码"
          />
        </a-form-model-item>
        <a-form-model-item
          class="login-register-toggle"
          :wrapper-col="wrapperToggleTip"
          key="toggle-tip"
        >
          <div
            @click="toggleLoginAndRegister"
            class="login-register-toggle__inner"
          >
            {{ toggleTip }}
          </div>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="wrapperFormItem" key="btn">
          <a-button type="primary" @click="submitForm('ruleForm')" block>
            {{ title }}
          </a-button>
          <a-button type="default" @click="handleCancel" block> 取消</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import { Modal } from 'ant-design-vue'
import { login, register } from '@/api/user'

Vue.use(Modal) // 在这里引入是为了解决“Failed to resolve directive: ant-portal”问题

export default {
  props: {
    visibility: Boolean,
    onFinish: Function
  },
  data() {
    const validatePassport = (rule, value, callback) => {
      if (value.length < 6 || value.length > 16) {
        callback(new Error('账号长度在6到16之间'))
      }
      callback()
    }
    const validatePwd = (rule, value, callback) => {
      if (value.length < 6 || value.length > 16) {
        callback(new Error('密码长度在6到16之间'))
      } else {
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
        if (!reg.test(value)) {
          callback(new Error('密码必须包含大写字母、小写字母和数字'))
        }
        callback()
      }
    }
    const validatePwd2 = (rule, value, callback) => {
      if (value !== this.ruleForm.pwd) {
        callback(new Error('两次输入的密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        passport: '',
        pwd: '',
        checkPwd: ''
      },
      rules: {
        passport: [{
          validator: validatePassport,
          trigger: 'change'
        }],
        pwd: [{
          validator: validatePwd,
          trigger: 'change'
        }],
        checkPwd: [{
          validator: validatePwd2,
          trigger: 'change'
        }]
      },
      wrapperFormItem: {
        span: 14,
        offset: 5
      },
      wrapperToggleTip: {
        span: 8,
        offset: 12
      },
      title: '登录',
      innerVisibility: this.visibility,
      loginOrRegister: 0, // 0: login 1: register
      toggleTip: '没有账号？立即注册！'
    }
  },
  watch: {
    visibility(newVal, oldVal) {
      this.innerVisibility = newVal
    }
  },
  methods: {
    handleCancel() {
      this.innerVisibility = false
      this.onFinish(0)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.loginOrRegister === 0) {
            this.handleLogin()
          } else if (this.loginOrRegister === 1) {
            this.handleRegister()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toggleLoginAndRegister() {
      this.loginOrRegister = this.loginOrRegister === 0 ? 1 : 0
      this.title = this.loginOrRegister === 0 ? '登录' : '注册'
      this.toggleTip =
        this.loginOrRegister === 0
          ? '没有账号？立即注册！'
          : '已有账号？马上登录！'
    },
    handleLogin() {
      const info = this.ruleForm
      login(info.passport, info.passport, info.pwd)
        .then(res => {
          if (res.code === 1) {
            this.$message.error('用户名或密码错误，请重试')
          } else {
            this.$message.success('登录成功')
            this.innerVisibility = false
            this.handleLoginStorage()
            this.onFinish(1)
          }
        })
        .catch(e => {
        })
    },
    handleRegister() {
      const info = this.ruleForm
      register(info.passport, info.passport, info.pwd, info.checkPwd)
        .then(res => {
          console.log(res)
          this.$message.success('注册成功')
          this.innerVisibility = false
          this.onFinish(1)
        })
        .catch(e => {
        })
    },

    handleLoginStorage() {
      this.$store.commit('usernameSetter', {
        username: this.ruleForm.passport
      })
      this.$store.commit('isLoginSetter', {
        isLogin: true
      })
      sessionStorage.setItem('username', this.ruleForm.passport)
      sessionStorage.setItem('isLogin', 'true')
    }
  }
}
</script>

<style lang='less'>
@import "../assets/default.less";

.ant-modal {
  &-content {
    background-color: @theme-color;
  }

  &-header {
    background-color: @theme-color;
    text-align: center;
    border-bottom: 0px;
  }

  &-title {
    font-size: 22px;
    margin-top: 10px;
  }

  &-title,
  &-close {
    color: @font-color;
  }

  &-body {
    .ant-form-item-control {
      .ant-input {
        background-color: @theme-color;
        color: @font-color;

        &:hover {
          background-color: @theme-color;
        }
      }
    }

    .login-register-toggle {
      color: @font-color;
      margin-bottom: 0;

      &__inner {
        cursor: pointer;
      }
    }
  }
}
</style>
