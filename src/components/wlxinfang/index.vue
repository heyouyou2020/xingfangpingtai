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
          <span  @click="gocenter">个人中心</span>
          <span @click="zhuxiao">注销</span>
        </div>
      </div>
      <!--首页律师接访系统部分  -->
      <div class="lvshi-image">
         <img src="../../assets/image/lvshi.png" alt="">
      </div>
      <form class="biaodan">
        <div class="show">
          <span class="wlzx">网络接访</span>
          <div class="biaoge">
            <div class="one">
               <div class="left">
                 <span>*姓名</span>
                 <input type="text" name="name" id="" v-model="form.name" disabled>
               </div>
               <div class="right">
                 <span>*性别</span>
                 <select v-model="form.sex" name="sex" id="" class="seled" disabled>
                   <option value="1">男</option>
                   <option value="0">女</option>
                 </select>
               </div>
            </div>
            <div class="one">
               <div class="left">
                 <span>*证件类型</span>
                 <select v-model="form.idcard" name="cardtype" id="" class="seled">
                   <option value="1">身份证</option>
                   <option value="2">护照</option>
                   <option value="3">驾驶证</option>
                 </select>
               </div>
               <div class="right">
                 <span>*证件号码</span>
                 <input v-model="form.number" type="text" name="" id="">
               </div>
            </div>
            <div class="one">
               <div class="left">
                 <span>民族</span>
                 <select v-model="form.mingzu" name="mingzu" id="" class="seled">
                   <option value="1">汉族</option>
                   <option value="0">回族</option>
                   <option value="2">苗族</option>
                 </select>
               </div>
               <div class="right">
                 <span>国籍</span>
                 <select v-model="form.guoji" name="guoji" id="" class="seled">
                   <option value="1">中国</option>
                   <option value="0">其他</option>
                 </select>
               </div>
            </div>
            <div class="one">
               <div class="left">
                 <span>工作单位</span>
                 <input v-model="form.danwei" type="text" name="" id="" >
               </div>
               <div class="right">
                 <span>居住地</span>
                 <input v-model="form.addr" type="text" name="" id="" >
               </div>
            </div>
            <div class="one">
               <div class="left">
                 <span>*移动电话</span>
                 <input v-model="form.tele" type="text" name="name" id="" disabled>
               </div>
               <div class="right">
                 <span>*电子邮箱</span>
                 <input v-model="form.email" type="text" name="" id="" >
               </div>
            </div>
            <div class="one">
               <div class="left">
                 <span>*案件类别</span>
                 <select v-model="form.anjian" name="anjianleibie" id="" class="seled">
                   <option value="1">抢劫</option>
                   <option value="0">盗窃</option>
                   <option value="2">斗殴</option>
                 </select>
               </div>
               <div class="right">
                 <span>*选择律师</span>
                  <select v-model="form.lvshi" name="lvshi" id="" class="seled">
                   <option value="1">张三</option>
                   <option value="0">李四</option>
                   <option value="2">王五</option>
                 </select>
               </div>
            </div>
            <div class="last-one">
               <div>*内容</div>
               <input v-model="form.conten" type="text" name="" id="" >
            </div>
            <div class="one-item">
              <div class="left-item">
                 <span class="span-item">*一级检察院</span>
                 <el-cascader :options="options" :show-all-levels="false"  :props="props" @active-item-change="change" v-model="form.jianchayuan"></el-cascader>
               </div>
            </div>
            <div class="time">
              <span class="jiuzhu">*预约时间</span>
              <el-date-picker
                v-model="form.time"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </div>
            <span class="caozuo">
              <span @click="submit">提交</span>
              <span @click="goback">返回</span>
            </span>
      </div>
       </form>
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
      options: [],
      props:{
        label: 'name',
        value: 'id',
        children: 'children'
      },
      show: true,
      riqi:'',
      xingqi: '',
      username: '',
      time: '',
      form:{
        name: this.$store.state.userName,
        sex:  this.$store.state.sex,
        idcard: this.$store.state.idtype,
        number: this.$store.state.idcard,
        mingzu: '',
        guoji: '',
        danwei: '',
        addr: '',
        tele: this.$store.state.mobile,
        email: '',
        anjian: '',
        conten: '',
        jianchayuan: '',
        lvshi: '',
        time: '',
      },
      options: [],
      options1:[],
    }
  },
  methods:{
    handleClick() {},
    goback() {
        this.$router.push({
          name: 'home'
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
    submit() {
      for(var k in this.form) {
        if(this.form[k] == '') {
          this.$message.error('错了哦,请输入完整信息');
          return false
        }
      } 
      this.$axios.post('visitor/interview',{
        procuratorateId: this.form.jianchayuan,
        lawyerId: this.form.lvshi,
        caseTypeOption: this.form.anjian,
        nation: this.form.mingzu,
        country: this.form.guoji,
        workUnit: this.form.danwei,
        habitation:this.form.addr,
        content:this.form.conten,
        appointmentTime: this.form.time
      })
        .then(res => {
            this.$message({
            message: '提交成功',
            type: 'success'
            })
        })
        .catch(err =>{
          console.log(err)
        })
    },
    gocenter() {},
    change() {
        console.log(this.time)
    }
  },
  created(){
    //  获取月份 星期
    this.getTime()
    this.$axios.get('visitor/procuratorate/list').then(res => {
      this.options = res.data.data
      this.options.map((item,index) => {
        this.$set(this.options[index],'children',[])
      })
      console.log(this.options)
    })
    .catch(err => {
      console.log(err)
    })
  }, 
  mounted() {
  },
}
</script>
