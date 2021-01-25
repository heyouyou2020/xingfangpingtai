import Vue from 'vue'
import App from './components/App'
import { router, axios } from "./config"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import md5 from 'js-md5'

Vue.config.productionTip = false
Vue.prototype.$md5 = md5
Vue.prototype.HOST='/api'
axios()
Vue.use(ElementUI)
Vue.use(Vuex)
const store=new Vuex.Store({
  state:{
    userName: '',
    show: true,
    sex: '',
    idcard: '',
    mobile: '',
    email: '',
    idtype: '',
  },
  mutations:{
    changeName(state,payload){
      state.userName =payload.userName
    },
    changeShow(state,payload){
      state.show = payload.show
    },
    changeSex(state,payload){
      state.sex =payload.sex
    },
    changeIdcard(state,payload){
      state.idcard =payload.idcard
    },
    changeMobile(state,payload){
      state.mobile =payload.mobile
    },
    changeEmail(state,payload){
      state.email =payload.email
    },
    changeIdtype(state,payload){
      state.idtype =payload.idtype
    },
  },
  actions:{ 
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})