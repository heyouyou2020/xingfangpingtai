<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view> 
    </keep-alive>
  </div>
</template>
<script>
import './index.less'
import {Vm} from '../../config'
import { userData } from '../../services'
export default {
  data() {
    return {
      isLogin:false,
      count: 123,
    }
  },
  created() {
    if(localStorage.getItem('number')){
        this.$store.commit({
          type: 'changeName',
          userName: localStorage.getItem('realName')
        })
          this.$store.commit({
          type: 'changeShow',
          show: false
        })
          this.$store.commit({
            type: 'changeSex',
            sex: localStorage.getItem('sex')
        })
          this.$store.commit({
            type: 'changeIdcard',
            idcard:localStorage.getItem('idcardNum')
        })
          this.$store.commit({
            type: 'changeMobile',
            mobile: localStorage.getItem('mobile')
        })
          this.$store.commit({
            type: 'changeEmail',
            email: localStorage.getItem('email')
        })
          this.$store.commit({
            type: 'changeIdtype',
            idtype: localStorage.getItem('idtype')
        })  
    }
  },
  mounted(){
  }
}
</script>
