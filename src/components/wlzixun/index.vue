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
          <span class="wlzx">网络咨询</span>
       
            <div class="biaoge">
            <div class="one">
               <div class="left">
                 <span>*姓名</span>
                 <input type="text" name="name" id="" v-model="form.name" value="$store.state.userName" disabled>
               </div>
               <div class="right">
                 <span>*手机号码</span>
                 <input type="text" name="" id="" v-model="form.number" disabled>
               </div>
            </div>
            <div class="one-item">
               <div class="left-item">
                 <span class="span-item">*选择检察院</span>
                 <el-cascader :options="options" :show-all-levels="false"  :props="props" @active-item-change="change" v-model="form.jianchayuan"></el-cascader>
                  <!-- <el-select v-model="value"  placeholder="请选择" @change="changeId">
                    <el-option
                       v-for="item in options"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
                     </el-option>
                  </el-select> -->
               </div>
               <div class="right">
                 <span>*咨询律师</span>
                  <select name="lvshi" id="" class="seled" v-model="form.lvshi">
                   <option value="1">曹律师</option>
                   <option value="0">其他</option>
                 </select>
               </div>
            </div>
            <div class="one">
               <div class="left">
                 <span>*类别</span>
                 <select name="leibie" id="" class="seled" v-model="form.leibie">
                   <option value="1">刑事</option>
                   <option value="2">民事</option>
                   <option value="3">行政</option>
                   <option value="4">司法救援</option>
                   <option value="5">国家赔偿</option>
                   <option value="7">其他</option>
                 </select>
               </div>
            </div>
            <div class="last-one">
               <div>*内容</div>
              <input type="text" name="" id="" v-model="form.conten">
            </div>
            </div>
            <span class="caozuo">
              <span @click="tijiao">提交</span>
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
      canhsu: '',
      props:{
        label: 'name',
        value: 'id',
        children: 'children'
      },
      show: true,
      riqi:'',
      xingqi: '',
      username: '',
      value: '',
      form:{
        name: this.$store.state.userName,
        number: this.$store.state.mobile,
        jianchayuan: '',
        lvshi: '',
        leibie: '',
        conten: '',
      },
    }
  },
  methods:{
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
     change(val) {
       console.log(val)
       let value =val[0]
       this.$axios.get('visitor/lawyer/list/'+value).then(res => {
         console.log(res)
       })
      // this.$axios.get('visitor/procuratorate/children/'+value).then(res => {
      //   let count = res.data.data
      //   count.map((item,index)=>{
      //     this.$set(count[index],'children',[])
      //   })
      //   for (let i = 0; i <= this.options.length; i++) {
      //     if(this.options[i].id==value){
      //        this.$set(this.options[i],'children',count)
      //     }
      //   }
      // })

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
    tijiao() {
      for(var k in this.form) {
        if(this.form[k] == '') {
          this.$message.error('错了哦,请输入完整信息');
          return false
        }
      } 
        this.$axios.post('visitor/consulting', {
          procuratorateId: this.form.jianchayuan,
          lawyerId: this.form.lvshi,
          consultingTypeOption: this.form.leibie,
          consultingContent: this.form.conten
        })
          .then(res => {
            debugger
            console.log(res)
            this.$message({
              message: '提交成功',
              type: 'success'
            })
          })
          .catch(err =>{
            debugger
            console.log(err)
          }) 
    },
    gocenter() {},
  },
  created(){
    // 获取下拉框内容
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
    //  获取月份 星期
    this.getTime()
  }, 
  mounted() {
  } 
}
</script>
