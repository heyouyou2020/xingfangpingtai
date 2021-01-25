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
          <div class="title-one">律师窗口信访</div>
          <div class="top-item">
              <span class="title-ite"></span>
              <span class="title-item">信访信息</span>
          </div>
          <div class="table-item">
              <table width="100%" height="600px" border="1" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" >
                <tr>
                    <td class="titleitem">*姓名或单位名称</td>
                    <td class="contenitem">张三</td>
                    <td class="titleitem">性别</td>
                    <td class="contenitem">男</td>
                </tr>
                <tr>
                    <td class="titleitem">*证件类型</td>
                    <td class="contenitem">{{data.certificateOptionName}}</td>
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
                <tr>
                    <td class="titleitem">案件类别</td>
                    <td class="contenitem" colspan='3'>检察院</td>
                </tr>
                <tr>
                    <td class="titleitem">咨询内容</td>
                    <td id="left" class="contenitem" colspan='3'>
                      一段时间以来，手机浏览器野蛮生长，违规从事互联网新闻信息服务,
                      成为“自媒体”传播乱象的聚集地和放大器。据介绍，此次专项集中整治和督导整改
                      ，把影响力较大的8款手机浏览器纳入首批名单进行重点集中整治,即UC、QQ、华为、360、搜狗、vivo、OPPO等。
                      集中整治将多措并举、标本兼治，着力解决三大突出问题：
                      一是发布“自媒体”违规采编的各类互联网新闻信息，如歪曲解读经济民生政策、散布“小道消息”、
                      传播谣言信息、翻炒旧闻编造“新闻”等；二是发布“标题党”文章，如恶意浮夸、“唱衰”“卖惨”、冒名炒作等；
                      三是发布违背社会主义核心价值观的不良信息，如传播低俗图文视频、炒作明星绯闻隐私和娱乐八卦等。
                    </td>
                </tr>
                <tr>
                    <td class="titleitem">接访时间</td>
                    <td class="contenitem" colspan='3'>{{data.appointmentTime}}</td>
                </tr>
              </table>
          </div>
          <div @click="goback" class="comeback">返回</div>
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
      data:{},
      hours:'',
      chatData:'',
    }
  },
  methods:{
    goback() {
        this.$router.go(-1)
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
    gocenter() {},
    change() {
        console.log(this.time)
    }
  },
  created(){
    //  获取月份 星期
    this.getTime()
      // 获取界面回复内容
    this.$axios.get('visitor/windowsInterview/detail/'+this.$route.params.id).then(res => {
        this.data = res.data.data[0]
        console.log(this.data)
    })
  }, 
  mounted() {
  } 
}
</script>
