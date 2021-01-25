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
          <span >{{$store.state.userName}},欢迎你</span>
          <span  @click="goback">返回上一层</span>
          <span @click="zhuxiao">注销</span>
        </div>
      </div>
      <!--首页律师接访系统部分  -->
      <div class="lvshi-image">
         <img src="../../assets/image/lvshi.png" alt="">
      </div>
      <div class="show">
          <div class="title-one">咨询详情</div>
          <div class="message">
              <span class="one">检察院:</span>
              <i>{{data.procuratorateName}}</i>
              <span>咨询律师:</span>
              <i>{{data.lawyerName}}</i>
              <span>类别:</span>
              <i>{{data.optionValueName}}</i>
          </div>
          <div class="zixun-item">
              <span class="one">咨询内容:</span>
              <span class="two">
                 {{data.consultingContent}}
              </span>
          </div> 
          <div class="title-one">律师回复</div>
          <div class="zixun-item">
              <span class="one">回复内容</span>
              <span class="two">
                {{data.replyContent}}
              </span>
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
      show: true,
      riqi:'',
      xingqi: '',
      username: '',
      time: '',
      data: {},
    }
  },
  methods:{
    handleClick() {},
    goback() {
        this.$router.go(-1)
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
    gocenter() {},
    change() {
        console.log(this.time)
    }
  },
  created(){
    //  获取月份 星期
    this.getTime()
      // 获取界面回复内容
      this.$axios.get('visitor/consulting/detail/'+this.$route.params.id).then(res => {
        this.data = res.data.data[0]
        console.log(this.data)
      })

  }, 
  mounted() {
  } 
}
</script>
