<template>
<div class="login">
  <div class="top">
    <span class="image"><img src="../../assets/image/newlvshi.png" alt=""></span>
    <span class="wenzi" @click="gobackhome">返回首页</span>
  </div>
  <!-- 登录框部分 -->
  <div class="login">
    <div class="tupian">
      <img src="../../assets/image/loginbj.png" alt="">
    </div>
    <div class="login-item">
      <img src="../../assets/image/loginn.png" alt="">
    </div>
    <div class="login-last">
      <div class="number-login" v-show="show">
        <span class="one">用户登录</span>
        <div class="two">
            <input type="text" name="" id="" placeholder="请输入手机号" v-model="mimaNumber">
        </div>
       
        <div class="three"><input type="text" name="" id="" placeholder="请输入短信验证码"> <span>获取验证码</span></div>
        <div class="four"><input type="text" name="" id="" placeholder="请输入验证码"><span>MHGI</span></div>
        <div class="five" @click="loginyanzhen">登录</div>
        <div class="six">
          <span @click="mima">密码登录</span>
          <span>注册账号</span>
        </div>
      </div>
      <div class="mima-login"  v-show="!show">
        <span class="one">用户登录</span>
        <div class="two">
            <input type="text" name="" id="" placeholder="请输入手机号" v-model="mimaNumber">
        </div>
       
        <div class="three"><input type="text" name="" id="" placeholder="请输入密码" v-model="mimaPassword"></div>
        <div class="four"><input type="text" name="" id="" placeholder="请输入验证码"><span>MHGI</span></div>
        <div class="five" @click="loginmima">登录</div>
        <div class="six">
          <span>
            <span @click="yanzhenma">验证码登录</span>
            <span @click="forget">忘记密码</span>
          </span>
          <span @click="zhuce">注册账号</span>
        </div>
      </div>
    </div>
  </div>
</div>

</template>
<script>
import './index.less'
import { userData } from '../../services'
import { Vm } from '../../config'
export default {
    data() {
        return {
          show: false,
          riqi: '',
          xingqi: '',
          mimaNumber: '',
          mimaPassword: '',
        }
    },
    methods: {
        goback() {
            this.$router.push({
                name: 'home',
            })
        },
        loginmima() {
          this.$axios.post('authority/visitor/login',{
            mobile:this.mimaNumber,
            password: this.$md5(this.mimaPassword)
          })
          .then(async res => {
            console.log(res)
            if (res.data.code==1001) {
              this.$message.error('账号或密码错误');
              return false
            }
            localStorage.setItem('number', res.data.data.accessToken);
            await this.$axios.get('visitor/userInfo').then(respon=> {
                   console.log(respon)
                   localStorage.setItem('idtype',respon.data.data.certificateOption)
                   localStorage.setItem('email',respon.data.data.email)
                   localStorage.setItem('idcardNum',respon.data.data.idcardNum)
                   localStorage.setItem('mobile',respon.data.data.mobile)
                   localStorage.setItem('realName',respon.data.data.realName)
                   localStorage.setItem('sex',respon.data.data.sex)
                   this.$store.commit({
                      type: 'changeName',
                      userName: respon.data.data.realName
                    })
                    this.$store.commit({
                      type: 'changeShow',
                      show: false
                    })
                    this.$store.commit({
                      type: 'changeSex',
                      sex: respon.data.data.sex
                    })
                    this.$store.commit({
                      type: 'changeIdcard',
                      idcard: respon.data.data.idcardNum
                    })
                    this.$store.commit({
                      type: ' changeMobile',
                      mobile: respon.data.data.mobile
                    })
                    this.$store.commit({
                      type: '  changeEmail',
                      email: respon.data.data.email
                    })
                    this.$store.commit({
                      type: '  changeIdtype',
                      idtype: respon.data.data.certificateOption
                    }) 
                    this.$message.success('登录成功')
                    this.$router.push({
                    name: 'home',
                    })
                  })
                  .catch(err => {
                    console.log(err)
                    this.$message.error('错误，登录失败')
                    return false
                  })
              })
        },
        mima() {
          this.show = false
        },
        yanzhenma(){
          this.show = true
        },
        loginyanzhen() {
        },
        gobackhome() {
          this.$router.push({
            name: 'home',
          })
        },
        zhuce() {
          this.$router.push({
            name: 'zhuce'
          })
        },
        forget() {},
        getTime(){
          const nowDate = new Date()
          const date = {
            year: nowDate.getFullYear(),
            month: nowDate.getMonth()+1,
            date:nowDate.getDate(),
            day:nowDate.getDay()
          }
          let mouth = ''
          let day = ''
           // 月
          if (date.month < 10) {
            mouth = '0' + date.month
          } else {
            mouth = date.month
          }
           //日
          if (date.date < 10) {
            day = '0' + date.date
          } else {
            day = date.date
          }
          this.riqi = date.year + '-' + mouth+ '-'+day
          const arr= ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
          console.log(date)
          this.xingqi = arr[date.day]
        },
    },
    created() {
        this.getTime()
    },
}
</script>
