import Vue from "vue"
import VueRouter from "vue-router"
import { userData } from '../services'
const Home = () => import('../components/Home');
const Login = () => import('../components/Login');
const Zhuce = () => import('../components/Zhuce');
const Hist = () => import('../components/Hist');
const xiangqing = () => import('../components/xiangqing');
const Zixun = () => import('../components/Zixun');
const Anli = () => import('../components/Anli');
const juti = () => import('../components/juti');
const wlzixun = () => import('../components/wlzixun');
const wlxinfang = () => import('../components/wlxinfang');
const wlyuyue = () => import('../components/wlyuyue');
const Personal = () => import('../components/Personal');
const zixunXQ = () => import('../components/zixunXQ');
const yuyueXQ = () => import('../components/yuyueXQ');
const chuangXQ = () => import('../components/chuangXQ');
const News = () => import('../components/News');

Vue.use(VueRouter);
export default new VueRouter({
   routes:[
      {
         path:'/',
         redirect:'/home'
      },
      {
         name:'home',
         path:'/home',
         component:Home 
      },
      {
         name:'login',
         path:'/login',
         component:Login 
      },
      {
         name:'zhuce',
         path:'/zhuce',
         component:Zhuce,
        //  beforeEnter: (to, from, next) => {
        //     if (!userData.getUserData()) {
        //         next({
        //             path: '/login'
        //         })
        //     } else {
        //         next()
        //     }
        // }
      }, 
      {
         name:'hist',
         path:'/hist',
         component:Hist,
         beforeEnter: (to, from, next) => {
            let token = localStorage.getItem('number')
            if (!token) {
                next({
                    path: '/login'
                })
            } else {
                next()
            }
        }
      },
      {
         name:'zixun',
         path:'/zixun',
         component:Zixun,
         beforeEnter: (to, from, next) => {
            let token = localStorage.getItem('number')
            if (!token) {
                next({
                    path: '/login'
                })
            } else {
                next()
            }
        }
      },
      {
         name:'xiangqing',
         path:'/xiangqing/:id',
         component:xiangqing
      },
      {
        name:'anli',
        path:'/anli/:id',
        component:Anli,
        beforeEnter: (to, from, next) => {
            let token = localStorage.getItem('number')
            if (!token) {
                next({
                    path: '/login'
                })
            } else {
                next()
            }
        }
      },
      {
        name:'wlzixun',
        path:'/wlzixun',
        component:wlzixun,
        beforeEnter: (to, from, next) => {
             let token = localStorage.getItem('number')
             if (!token) {
                 next({
                     path: '/login'
                 })
             } else {
                 next()
             }
         }
       },
       {
         name:'wlxinfang',
         path:'/wlxinfang',
         component:wlxinfang,
         beforeEnter: (to, from, next) => {
              let token = localStorage.getItem('number')
              if (!token) {
                  next({
                      path: '/login'
                  })
              } else {
                  next()
              }
          }
       },
       {
         name:'wlyuyue',
         path:'/wlyuyue',
         component:wlyuyue,
         beforeEnter: (to, from, next) => {
              let token = localStorage.getItem('number')
              if (!token) {
                  next({
                      path: '/login'
                  })
              } else {
                  next()
              }
          }
       },
       {
         name:'personal',
         path:'/personal',
         component:Personal,
         beforeEnter: (to, from, next) => {
              let token = localStorage.getItem('number')
              if (!token) {
                  next({
                      path: '/login'
                  })
              } else {
                  next()
              }
          }
       },
       {
         name:'zixunxq',
         path:'/zixunxq/:id',
         component:zixunXQ 
       },
       {
         name:'yuyuexq',
         path:'/yuyuexq/:id',
         component:yuyueXQ 
       },
       {
        name:'chuangxq',
        path:'/chuangxq/:id',
        component:chuangXQ
      },
      {
        name:'news',
        path:'/news/:id',
        component:News
      },
   ]
})