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
          <div class="title-one">律师预约信访</div>
          <div class="top-item">
              <span class="title-ite"></span>
              <span class="title-item">信访信息</span>
          </div>
          <div class="table-item">
              <table width="100%" height="300px" border="1" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" >
                <tr>
                    <td class="titleitem">*姓名或单位名称</td>
                    <td class="contenitem">{{biaoge.visitorName}}</td>
                    <td class="titleitem">性别</td>
                    <td class="contenitem">男</td>
                </tr>
                <tr>
                    <td class="titleitem">*证件类型</td>
                    <td class="contenitem">身份证</td>
                    <td class="titleitem">*证件号码</td>
                    <td class="contenitem">420989879487908210</td>
                </tr>
                <tr>
                    <td class="titleitem">民族</td>
                    <td class="contenitem">汉</td>
                    <td class="titleitem">国籍</td>
                    <td class="contenitem">中国</td>
                </tr>
                <tr>
                    <td class="titleitem">*移动电话</td>
                    <td class="contenitem">13971526522</td>
                    <td class="titleitem">电子邮箱</td>
                    <td class="contenitem">23409879@.com</td>
                </tr>
                <tr>
                    <td class="titleitem">工作单位</td>
                    <td class="contenitem">检察院</td>
                    <td class="titleitem">*通讯地地址</td>
                    <td class="contenitem">山东</td>
                </tr>
              </table>
          </div>
          <div class="title-one">交流区</div>
          <!-- 下面是聊天内容模块 -->
          <div class="jiaoliu">
              <ul class="kuang">
                  <li v-for="item in message" :key="item.id">
                      <span class="name">{{item.visitorName?item.visitorName:item.lawyerName}}</span>
                      <span class="time">{{item.createTime}}</span>
                      <div class="neirong">
                         {{item.content}}
                      </div>                           
                  </li>
              </ul>
              <div class="message-item">
                <input v-model="chatData" type="text" name="" id="">
              </div>
              <div class="but" @click="sendinfo">发布</div>
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
      data:[
        // {name:'',time:'',title:''},
      ],
      message:[],
      biaoge:{},
      hours:'',
      chatData:'',
    }
  },
  methods:{
    handleClick() {},
    goback() {
        this.$router.go(-1)
    },
    sendinfo() {
        const nowDate = new Date()
        const date = {
          hours:nowDate.getHours(),
          minu:nowDate.getMinutes(),
          second:nowDate.getSeconds()
      }
       let hours=''
       let minu=''
       let second=''
       //时
      if (date.hours < 10) {
          hours = '0' + date.hours
      } else {
          hours = date.hours
      }
       //分
      if (date.minu < 10) {
          minu = '0' + date.minu
      } else {
          minu = date.minu
      }
       //秒
      if (date.second < 10) {
          second = '0' + date.second
      } else {
          second = date.second
      }
      let alltime = hours+':'+minu+':'+second
      this.message.push({
        visitorName: this.username,
        lawyerName: '',
        createTime: alltime,
        content: this.chatData
      })
      this.chatData = ''
    },
    getTime(){
      const nowDate = new Date()
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth()+1,
        date:nowDate.getDate(),
        day:nowDate.getDay(),
        hours:nowDate.getHours(),
        minu:nowDate.getMinutes(),
        second:nowDate.getSeconds()
      }
      let mouth = ''
      let day = ''
      let hours=''
      let minu=''
      let second=''
      // 月
      if (date.month < 10) {
        mouth = '0' + date.month
      } else {
        mouth = date.month
      }
      //日
      this.riqi = date.year + '-' + mouth+ '-'+day
      const arr= ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
      console.log(date)
      this.xingqi = arr[date.day]
    },
    // 视图重新渲染时异步 
    zhuxiao() {
      if(confirm('确定退出登录吗')){
         localStorage.removeItem('number')
         userData.removeUserData()
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
    this.$axios.get('visitor/interview/detail/'+this.$route.params.id).then(res => {
        this.biaoge = res.data.data[0]
        console.log(this.data)
    })
    this.$axios.get('visitor/interview/exchange/'+this.$route.params.id).then(res =>{
      this.message = res.data.data
      console.log(this.message)
    })
  }, 
  mounted() {
  } 
}
</script>
