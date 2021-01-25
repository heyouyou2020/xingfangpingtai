<template>
 
</template>
<script>
import './index.less'
import { userData } from '../../services'
export default {
  data() {
    return {
      show: '',
      userName: '',
      xingqi: '',
      riqi: '',
      activeNames: '1'
    }
  },
  methods:{
    zhuciao() {
      if(confirm('确定退出登录吗')) {
          this.$router.push({
              name: 'home',
          })
        userData.removeUserData()
      }
    },
    jiaohao() {
      console.log(11111)
      this.$router.push({
        name: 'jiaohao',
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
    goback() {
        this.$router.go(-1)
    },
    handleChange() {},
  },
  created() {
    this.getTime()
    const name = userData.getUserData()
    this.userName = name
  }, 
}
</script>
