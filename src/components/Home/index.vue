<template>
  <div class="home">
    <img src="../../assets/image/shouye.png" alt="">
    <div class="conten">
      <div class="login">
        <div class="left">
          <span>{{riqi}}</span>
          <span>{{xingqi}}</span>
        </div>
        <div class="right">
          <span @click="login" v-show="$store.state.show">登录</span>
          <span @click="submit" v-show="$store.state.show">注册</span>
          <span v-show="!$store.state.show">{{$store.state.userName}},欢迎你</span>
          <span v-show="!$store.state.show" @click="gocenter">个人中心</span>
          <span @click="zhuxiao" v-show="!$store.state.show">注销</span>
        </div>
      </div>
      <!--首页律师接访系统部分  -->
      <div class="lvshi-image">
         <img src="../../assets/image/lvshi.png" alt="">
      </div>
      <!-- 路由 方框跳转部分 -->
      <div class="fangkuang">
        <div class="one"><img src="../../assets/image/wyxinfang.png" alt=""></div>
        <div class="two">
          <img src="../../assets/image/zixun.png" alt="" @click="gowlzixun">
          <img src="../../assets/image/wlxinfang.png" alt="" @click="gowlxinfang">
          <img src="../../assets/image/wlyuyue.png" alt="" @click="goyuyue">
        </div>
        <div class="three">
          <span>我要查信访</span>
          <img src="../../assets/image/find.png" alt="">
          </div>
      </div>
      <!-- 案例部分 -->
      <div class="anli">
        <div class="alltiem">
          <div class="top-item">
          <span class="zhanshi">优秀案例展示</span>
          <span class=more @click="Findmore(0)">更多</span>
        </div>
         <ul>
           <li v-for="item in zhanshi" :key="item.id" @click="clickme(item.id)">{{item.title}}</li>
         </ul>
        </div>
         <div class="alltiem">
          <div class="top-item">
          <span class="zhanshi">代表委员说检察</span>
          <span class=more @click="Findmore(1)">更多</span>
        </div>
         <ul>
           <li v-for="item in dbwysjc" :key="item.id" @click="clickme(item.id)">{{item.title}}</li>
         </ul>
        </div>
         <div class="alltiem">
          <div class="top-item">
          <span class="zhanshi">联络工作动态</span>
          <span class=more @click="Findmore(2)">更多</span>
        </div>
         <ul>
           <li v-for="item in llgzzt" :key="item.id" @click="clickme(item.id)">{{item.title}}</li>
         </ul>
        </div>
        <div class="alltiem">
          <div class="top-item">
          <span class="zhanshi">鲁检公告</span>
          <span class=more @click="Findmore(3)">更多</span>
        </div>
         <ul>
            <li v-for="item in ljgg" :key="item.id" @click="clickme(item.id)">{{item.title}}</li>
         </ul>
        </div>
        <div class="alltiem">
          <div class="top-item">
          <span class="zhanshi">律师风采</span>
          <span class=more @click="Findmore(4)">更多</span>
        </div>
         <ul>
            <li v-for="item in lvshifc" :key="item.id" @click="clickme(item.id)">{{item.title}}</li>
         </ul>
        </div>
        <div class="alltiem">
          <div class="top-item">
          <span class="zhanshi">常见问题</span>
          <span class=more @click="Findmore(5)">更多</span>
        </div>
         <ul>
           <li v-for="item in cjwt" :key="item.id" @click="clickme(item.id)">{{item.title}}</li>
         </ul>
        </div>
      </div> 
    </div>
  </div>
</template>
<script>
import "./index.less"
import { Vm } from '../../config'
import { userData } from '../../services'
export default {
  data(){
    return{
      show: '',
      riqi:'',
      xingqi: '',
      username: '',
      zhanshi: [],
      dbwysjc: [],
      llgzzt: [],
      ljgg: [],
      lvshifc: [],
      cjwt: []
    }
  },
  methods:{
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
    gowlzixun() {
      this.$router.push({
        name: 'wlzixun'
      })
    },
    gowlxinfang() {
      this.$router.push({
        name: 'wlxinfang'
      })
    },
    goyuyue() {
      this.$router.push({
        name: 'wlyuyue'
      })
    },
    // 视图重新渲染时异步 
    zhuxiao() {
      if(confirm('确定退出登录吗')){
         localStorage.removeItem('number')
         this.$store.commit({
            type: 'changeName',
            userName: '',
          })
          this.$store.commit({
            type: 'changeShow',
            show: true
          })
         this.$router.push({
             name: 'home'
         })
      }
    },
    submit() {
      this.$router.push({
        name: 'zhuce'
      })
    },
    gocenter() {
      this.$router.push({
        name:'personal'
      })
    },
    login() {
      this.$router.push({
        name: 'login'
      })
    },
    Findmore(id) {
      this.$router.push({
        name: 'anli',
        params: { id: id }
      })
    },
    clickme(id) {
      this.$router.push({
        name: 'news',
        params: {
          id: id
        }
      })
    },
  },
  created(){
    //  获取月份 星期
    
    this.getTime()
    // this.$axios.get('visitor/info/userInfo').then( res=> {
    //   this.username = res.data.data.realName
    //   this.show = false
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    this.$axios.get('visitor/info/home')
      .then(res => {
        // 在这里对数组进行裁切，只取六组数据展示
        this.zhanshi = res.data.data.case
        this.dbwysjc = res.data.data.comment
        this.llgzzt = res.data.data.work
        this.ljgg = res.data.data.report
        this.lvshifc= res.data.data.lawyer
        this.cjwt = res.data.data.problem
      })
      // .catch(err => {
      //   console.log(err)
      //   this.$message.error('网络错误')
      // })
  }, 
  mounted() {
  } 
}
</script>
