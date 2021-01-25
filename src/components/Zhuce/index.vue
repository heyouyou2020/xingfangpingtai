<template>
<div class="zhuce-item">
  <div class="top">
    <span class="image"><img src="../../assets/image/newlvshi.png" alt=""></span>
    <span class="wenzi" @click="gobackhome">返回首页</span>
  </div>
  <!-- 登录框部分 -->
  <div class="zhuce">
    <div class="tupian">
      <img src="../../assets/image/loginbj.png" alt="">
    </div>
    <div class="login-item">
      <img src="../../assets/image/zhuce.png" alt="">
    </div>
    <div class="login-last">
      <div class="number-login">
        <span class="one">用户注册</span>
        <div class="two">
            <input v-model="form.name" type="text" name="" id="" placeholder="姓名">*
        </div>
        <div class="xingbie">
            <span>性别</span>
            <input type="radio" name="sex" id="" value='1' v-model="form.sex">
            <span>男</span>
            <input type="radio" name="sex" id="" value='0' v-model="form.sex">
            <span>女</span>*
        </div>
        <div class="two">
          <select v-model="form.idtype" name="plan" id="plan">
            <option value="1" >身份证</option>
            <option value="2">港澳台同行证</option>
            <option value="3">外国护照</option>
            <option value="4">其他</option>
          </select>
        </div>
        <div class="two">
            <input type="text" name="" id="" placeholder="身份证号码" v-model="form.idcard" @blur="blurId">*
        </div>
        <div class="two">
            <input type="text" name="" id="" placeholder="手机号" v-model="form.number" @blur="blurNum">*
        </div>
        <div class="four"><input type="text" name="" id="" placeholder="请输入验证码"><span>MHGI</span>*</div>
        <div class="three">
          <input type="text" name="" id="" placeholder="请输入短信验证码">
          <button type="button"  v-show="!show1">请{{math}}后重新获取</button>
          <button type="button" v-show="show1" @click="getyanzheng" >获取验证码</button>*
        </div>
        <div class="two">
            <input v-model="form.mimaNumber" type="text" name="" id="" placeholder="请输入密码">*
        </div>
        <div class="two">
            <input v-model="form.mimaPassword" type="text" name="" id="" placeholder="请再次确认输入密码">*
        </div>
        <div class="two">
            <input type="text" name="" id="" placeholder="电子邮箱" v-model="form.email">*
        </div>
        <div class="two">
            <input type="text" name="" id="" placeholder="家庭住址" v-model="form.dizhi">*
        </div>
        <div class="five" @click="zhuce">注册账号</div>
        <!-- <div class="six">
          <span @click="mima">密码登录</span>
          <span>注册账号</span>
        </div> -->
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
          form: {
            name: '',
            sex: '0',
            idcard: '',
            number: '',
            mimaNumber: '',
            mimaPassword: '',
            email: '',
            dizhi: '',
            idtype: '1',
          },
          userablr: true,
          show1: true,
          math:30
        }
    },
    methods: {
        getyanzheng() {
          this.show1 = false
          var timer=null
          timer= setInterval(() =>{
            this.math--
            console.log(this.math)
            if(this.math===0){
              this.math=30
              this.show1=true
              clearInterval(timer)
            }
          },1000)
        },
        blurId() {
          this.$axios.get('visitor/validation/idcardNum/'+ this.form.idcard).then(res => {
            console.log(res)
            if (res.data.code == 1) {
              this.$message.error(res.data.msg)
            }
          })
        },
        blurNum() {
          this.$axios.get('visitor/validation/mobile/' + this.form.number).then(res => {
            console.log(res)
            if (res.data.code == 1) {
              this.$message.error(res.data.msg)
            }
          })
        },
        zhuce() {
            for (var k in this.form) {
              if (this.form[k] == '') {
                 this.$message.error('请输入完整信息')
                 return false
              }
            }
            if (this.form.mimaNumber != this.form.mimaPassword) {
                this.$message.error('两次密码输入不一致，请确认后重新提交')
                return false
            }
            this.$axios.post('visitor/register',{
              realName: this.form.name,
              password: this.$md5(this.form.mimaNumber),
              mobile: this.form.number,
              certificateOption: this.form.idtype,
              idcardNum: this.form.idcard,
              sex: this.form.sex,
              email: this.form.email,
              addr: this.form.dizhi
            }).then(res => {
              console.log(res)
              this.$message({
              message: '恭喜你，注册成功',
              type: 'success'
              })
              this.$router.push({
                name: 'login'
              })
            })
            .catch(err => {console.log(err)})
        }, 
        gobackhome() {
          this.$router.push({
            name: 'home',
          })
        },
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
        console.log(this.math)
    },
}
</script>
