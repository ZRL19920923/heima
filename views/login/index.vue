<template>
    <div class="container">
        <el-card class="mycard">
            <img src="../../assets/images/logo_index.png" alt="">
            <el-form :model="loginForm" :rules="loginFormRule" ref="loginForm">
                <el-form-item prop="mobile">
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                   <el-form-item prop="code">
                    <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:236px;margin-right:10px;"></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                 <el-form-item>
                    <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                  <el-form-item>
                    <el-button class="mybutton" type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import store from '../../store/index.js'
export default {
  data () {
    // 自定义验证方法
    const checkMobile = (rules, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机格式错误'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '13211111111',
        code: '246810'
      },
      loginFormRule: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码长度6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 获取el-form组件实例 拿到验证的方法validate
      this.$refs.loginForm.validate(async (vaild) => {
        if (vaild) {
          try {
            const { data: { data } } = await this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            store.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号码错误')
          }
        }
      }
      )
    }
  },
  created () {
  }
}
</script>

<style scoped lang="less">
    .container {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(../../assets/images/login_bg.jpg);
        .mycard {
            height: 350px;
            width: 400px;
            // background: pink;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            img {
                display: block;
                margin: 0 auto 20px;
            }
            .mybutton {
                width: 100%;
            }
        }
    }
</style>
