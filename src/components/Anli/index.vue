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
          <span @click="goback">返回</span>
        </div>
      </div>
      <!--首页律师接访系统部分  -->
      <div class="lvshi-image">
         <img src="../../assets/image/lvshi.png" alt="">
      </div>
      <div class="show-item">
        <div class="xuanxiangka">
          <div v-for="item in data" :key="item.id" @click="clickme(item.id)" :class="item.clssname">{{item.title}}</div>
        </div>
        <div v-show="data[0].show" class="tabledata">
          <div class="one">
            <el-table
            class="table-hidden-cell"
           :data="tableData1"
           stripe
           highlight-current-row
          >
            <el-table-column
              v-for="item in tableHeader"
              :key="item.filed"
              :prop="item.filed"
              :width="item.width"
              :label="item.title"
              sortable
              :show-overflow-tooltip="true"
            />
            <el-table-column
               width="100" >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
             </template>
            </el-table-column>
          </el-table>
             <div class="fenye">
                <el-pagination
                v-show="total1>0"
                @size-change="handleSizeChange1"
                @current-change="handleCurrentChange1"
                :current-page.sync="page1"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total1">
            </el-pagination>
             </div>
          </div>
        </div>
        <div v-show="data[1].show" class="tabledata">
          <div class="one">
            <el-table
            class="table-hidden-cell"
           :data="tableData2"
           stripe
           highlight-current-row
          >
            <el-table-column
              v-for="item in tableHeader"
              :key="item.filed"
              :prop="item.filed"
              :width="item.width"
              :label="item.title"
              sortable
              :show-overflow-tooltip="true"
            />
            <el-table-column
               width="100" >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
             </template>
            </el-table-column>
          </el-table>
             <div class="fenye">
                <el-pagination
                v-show="total2>0"
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
                :current-page.sync="page2"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total2">
            </el-pagination>
             </div>
          </div>
        </div>
        <div v-show="data[2].show" class="tabledata">
          <div class="one">
            <el-table
            class="table-hidden-cell"
           :data="tableData3"
           stripe
           highlight-current-row
          >
            <el-table-column
              v-for="item in tableHeader"
              :key="item.filed"
              :prop="item.filed"
              :width="item.width"
              :label="item.title"
              sortable
              :show-overflow-tooltip="true"
            />
            <el-table-column
               width="100" >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
             </template>
            </el-table-column>
          </el-table>
             <div class="fenye">
                <el-pagination
                 v-show="total3>0"
                @size-change="handleSizeChange3"
                @current-change="handleCurrentChange3"
                :current-page="1"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total3">
            </el-pagination>
             </div>
          </div>
        </div>
        <div v-show="data[3].show" class="tabledata">
          <div class="one">
            <el-table
            class="table-hidden-cell"
           :data="tableData4"
           stripe
           highlight-current-row
          >
            <el-table-column
              v-for="item in tableHeader"
              :key="item.filed"
              :prop="item.filed"
              :width="item.width"
              :label="item.title"
              sortable
              :show-overflow-tooltip="true"
            />
            <el-table-column
               width="100" >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
             </template>
            </el-table-column>
          </el-table>
             <div class="fenye">
                <el-pagination
                 v-show="total4>0"
                @size-change="handleSizeChange4"
                @current-change="handleCurrentChange4"
                :current-page="1"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total4">
            </el-pagination>
             </div>
          </div>
        </div>
        <div v-show="data[4].show" class="tabledata">
          <div class="one">
            <el-table
            class="table-hidden-cell"
           :data="tableData5"
           stripe
           highlight-current-row
          >
            <el-table-column
              v-for="item in tableHeader"
              :key="item.filed"
              :prop="item.filed"
              :width="item.width"
              :label="item.title"
              sortable
              :show-overflow-tooltip="true"
            />
            <el-table-column
               width="100" >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
             </template>
            </el-table-column>
          </el-table>
             <div class="fenye">
                <el-pagination
                 v-show="total5>0"
                @size-change="handleSizeChange5"
                @current-change="handleCurrentChange5"
                :current-page="1"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total5">
            </el-pagination>
             </div>
          </div>
        </div>
        <div v-show="data[5].show" class="tabledata">
          <div class="one">
            <el-table
            class="table-hidden-cell"
           :data="tableData6"
           stripe
           highlight-current-row
          >
            <el-table-column
              v-for="item in tableHeader"
              :key="item.filed"
              :prop="item.filed"
              :width="item.width"
              :label="item.title"
              sortable
              :show-overflow-tooltip="true"
            />
            <el-table-column
               width="100" >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
             </template>
            </el-table-column>
            </el-table>
            <div class="fenye">
                <el-pagination
                 v-show="total6>0"
                @size-change="handleSizeChange6"
                @current-change="handleCurrentChange6"
                :current-page.sync="page6"
                :page-sizes="[5, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total6">
               </el-pagination>
            </div>
          </div>
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
      riqi:'',
      xingqi: '',
      username: '',
      show: true,
      total1:0,
      total2:0,
      total3:0,
      total4:0,
      total5:0,
      total6:0,
      sizi1: 10,
      sizi2: 10,
      sizi3: 10,
      sizi4: 10,
      sizi5: 10,
      sizi6: 10,
      page1: 1,
      page2: 1,
      page6: 1,
      data: [
        {id:0,title:'优秀案例展示',clssname:'', show: false},
        {id:1,title:'代表委员说检查',clssname:'', show: false},
        {id:2,title:'联络工作状态',clssname:'', show: false},
        {id:3,title:'鲁检公告',clssname:'', show: false},
        {id:4,title:'律师风采',clssname:'', show: false,},
        {id:5,title:'检查队伍',clssname:'', show: false},
      ],
      tableHeader: [
       { filed: 'title', title: '标题' },
       { filed: 'time', title: '日期时间',width:200 },
      ],
      tableData1: [
      //  { wenti:'政务公开工作中存在的问题和不足',time:'2020-10-10'},
      //  { wenti:'IMF官员：亚太经济复苏不均衡 中国有望更快恢复正常'  ,time:'2020-10-10'},
      //  { wenti:'日本有座隐秘的雕像公园，由日本富豪斥巨资打造，现却一片荒凉！' ,time:'2020-10-10'},
      //  { wenti:'纸包不住火！特朗普一番话犯众怒，舆论沸腾，美媒：中国正在获胜' ,time:'2020-10-10'},
      //  { wenti:'到日本九州陶瓷小镇体验「有田烧」技术、潜入仓库寻宝'  ,time:'2020-10-10'},
      //  { wenti:'再现新风景线！特朗普同民主党大打出手之际，俄媒：美国或陷内战',time:'2020-10-10'},
      //  { wenti:'中国战机位于世界什么水平？能否引领世界潮流？关键还看六代机',time:'2020-10-10'},
      //  { wenti:'十三五成就巡礼丨问鼎苍穹 中国航天迈向太空新高度',time:'2020-10-10'},
     ],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      tableData6: [],
    }
  },
  methods:{
    handleClick(row) {
      this.$router.push({
        name: 'news',
        params:{
          id: row.id
        }
      })
    },
    goback() {
      this.$router.go(-1)
    },
    //  1111111
    handleSizeChange1(val){
      console.log(val)
      this.page1 = 1
      this.sizi1 = val
      this.$axios.get('visitor/info/case',{pageNum:this.page1,pageSize:val}).then(res => {this.tableData1 = res.data.data})
      
    },
    handleCurrentChange1(val){
      console.log(val)
      this.$axios.get('visitor/info/case',{pageNum:val,pageSize:this.sizi1}).then(res => {this.tableData1 = res.data.data})
    },
     //  2222222
    handleSizeChange2(val){
      console.log(val)
    },
    handleCurrentChange2(val){
      console.log(val)
    },
     //  333333
    handleSizeChange3(val){
      console.log(val)
    },
    handleCurrentChange3(val){
      console.log(val)
    },
     //  444444
    handleSizeChange4(val){
      console.log(val)
    },
    handleCurrentChange4(val){
      console.log(val)
    },
     //  555555
    handleSizeChange5(val){
      console.log(val)
    },
    handleCurrentChange5(val){
      console.log(val)
    },
     //  666666
    handleSizeChange6(val){
      console.log(val)
      this.page6 = 1
    },
    handleCurrentChange6(val){
      console.log(val)
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
    clickme(id) {
      this.data.map(item => {
        item.clssname = ''
        item.show = false
      })
      this.data[id].clssname = 'active'
      this.data[id].show = true
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
  },
  created(){
    //  获取月份 星期
    this.$axios.get('visitor/info/case',{params:{pageNum:1,pageSize:10}}).then(res => {
      console.log(res)
      this.tableData1 = res.data.data.pageList
      this.total1 = res.data.data.total
      })
    // this.$axios.get('visitor/info/comment',{params:{pageNum:1,pageSize:10}}).then(res => {
    //   console.log(res)
    //   this.tableData2 =res.data.data.pageList
    //   this.total2 = res.data.data.total
    //   })
    // this.$axios.get('visitor/info/work',{params:{pageNum:1,pageSize:10}}).then(res => {
    //   this.tableData3 =res.data.data.pageList
    //   this.total3 = res.data.data.total
    //   })
    // this.$axios.get('visitor/info/notice',{params:{pageNum:1,pageSize:10}}).then(res => {
    //   this.tableData4 =res.data.data.pageList
    //   this.total4 = res.data.data.total
    //   })
    // this.$axios.get('visitor/info/lawyer',{params:{pageNum:1,pageSize:10}}).then(res => {
    //   this.tableData5 = res.data.data.pageList
    //   this.total5 = res.data.data.total
    //   })
    // this.$axios.get('visitor/info/problem',{params:{pageNum:1,pageSize:10}}).then(res => {
    //   this.tableData6 =res.data.data.pageList
    //   this.total6 = res.data.data.total
    //   })
    this.data.map(item => {
        item.clssname = ''
      })
    this.data[this.$route.params.id].clssname = 'active'
    this.data[this.$route.params.id].show = true
    this.getTime()
  }, 
  mounted() {
  } 
}
</script>
