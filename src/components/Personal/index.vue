<template>
  <div class="home">
    <img src="../../assets/image/beijing.png" alt="">
    <div class="conten">
      <div class="login-item">
        <div class="left">
          <span>{{riqi}}</span>
          <span>{{xingqi}}</span>
        </div>
        <div class="right">
          <span>{{$store.state.userName}},欢迎你</span>
          <span @click="comeHome">回到首页</span>
          <span @click="zhuxiao">注销</span>
        </div>
      </div>
      <div class="sfjz">
        <img src="../../assets/image/sfjz.png" alt="">
        <div class="maozi">
          <img src="../../assets/image/maozi.png" alt="">
          <span>律师接访与化解平台</span>
        </div>
      </div>
      <!-- 案例模块 -->
      <div class="person-item">
        <div class="left-item">
          <div class="top">
             <div class="sma-image"><img src="../../assets/image/person.png" alt=""><span>个人中心</span></div>
             <div class="big-image">
               <img src="../../assets/image/tuxiang.png" alt="">
               <div class="title-item">
                 <span>{{$store.state.userName}}</span>
                 <span>{{$store.state.mobile}}</span>
               </div>
             </div>
          </div>
          <div class="bottom">
            <div v-for="item in data" :key="item.id" :class="item.className" @click="clickme(item.id)">{{item.title}}</div>
          </div>
        </div>
        <div class="right">
          <div class="wenzi">{{str}}</div>
          <div v-show="tableShow1" class="biao-ge">
             <el-table
                v-loading="listLoading"
                class="table-hidden-cell"
                :data="tableData"
                stripe
                highlight-current-row
             >
                <el-table-column
                  v-for="item in tableHeader"
                  :key="item.filed"
                  :prop="item.filed"
                  :label="item.title"
                  :width="item.width"
                  sortable
                  :show-overflow-tooltip="true"
                  :cell-class-name="item.colorB"
                />
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                   <el-button type="text" size="small" @click="handleClickOne(scope.row)">查看</el-button>
                  </template>
                </el-table-column>
             </el-table> 
             <div class="block">
       <el-pagination
       v-show="total1>0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page1"
      :page-sizes="[10, 20, 30, 40]"
      :page-size.sync="sizi1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total1">
    </el-pagination>
             </div>
          </div>
          <div v-show="tableShow2"  class="biao-ge">
             <el-table
        v-loading="listLoading"
        class="table-hidden-cell"
        :data="tableList"
        stripe
        highlight-current-row
      >
        <el-table-column
          v-for="item in headerList"
          :key="item.filed"
          :prop="item.filed"
          :label="item.title"
          :width="item.width"
          sortable
          :show-overflow-tooltip="true"
          :cell-class-name="item.colorB"
        />
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClickTwo(scope.row)">查看</el-button>
          </template>
        </el-table-column>
             </el-table>
        <div class="block">
   
    <el-pagination
      v-show="total2>0"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      :current-page.sync="page2"
      :page-sizes="[10, 20, 30, 40]"
      :page-size.sync="sizi2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total2">
    </el-pagination>
               </div>
          </div>
          <div v-show="tableShow3"  class="biao-ge">
             <el-table
        class="table-hidden-cell"
        :data="tableCount"
        stripe
        highlight-current-row
      >
        <el-table-column
          v-for="item in headeCount"
          :key="item.filed"
          :prop="item.filed"
          :label="item.title"
          :width="item.width"
          sortable
          :show-overflow-tooltip="true"
          :cell-class-name="item.colorB"
        />
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClickThr(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
            <div class="block">
              <el-pagination
                v-show="total3>0"
                @size-change="getSizeChange"
                @current-change="getCurrentChange"
                :current-page.sync="page3"
                :page-sizes="[10, 20, 30, 40]"
                :page-size.sync="sizi3"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total3">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './index.less'
import {Vm, router} from '../../config'
import {userData} from '../../services'
export default {
  data(){
    return{
      str:'我的网络咨询',
      total1: 0,
      total2:0,
      total3:0,
      xingqi:'',
      riqi: '',
      listLoading: false,
      display:true,
      username:'',
      shoujihaoma: '',
      popupVisible:false,
      tableShow1:true,
      tableShow2:false,
      tableShow3:false,
      show:this.$store.state.show,
      page1: 1,
      page2: 1,
      page3: 1,
      sizi1:10,
      sizi2:10,
      sizi3:10,
      tableHeader: [
        { filed: 'optionValueName', title: '咨询类型'},
        { filed: 'createTime', title: '咨询时间' },
        { filed: 'procuratorateName	', title: '检察院' },
        { filed: 'lawyerName', title: '律师名称' },
        { filed: 'isReply', title: '律师回复' },
      ],
      tableData: [
      ],
      headerList: [
        { filed: 'optionValueName', title: '案件类型'},
        { filed: 'appointmentTime', title: '接访时间' },
        { filed: 'procuratorateName', title: '检察院' },
        { filed: 'lawyerName', title: '咨询律师' },
        { filed: 'state', title: '状态' },
        { filed: 'unreadCount', title: '未读消息' },
      ],
      tableList: [
      ],
      headeCount: [
        { filed: 'optionValueName', title: '案件类型'},
        { filed: 'updateTime', title: '接访时间' },
        { filed: 'procuratorateName', title: '检擦院' },
        { filed: 'lawyerName', title: '咨询律师' },
        { filed: 'state', title: '状态' },
      ],
      tableCount: [
      ],
      data: [
        { id: 0, title: '我的网络咨询', className: 'active'},
        { id: 1, title: '我的网络接访',className: ''},
        { id: 2, title: '我的预约接访窗口',className:''},
      ]
    }
  },
  methods:{
    login() {
      Vm.$emit('getLogin',true)
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
    comeHome() {
      this.$router.push({
        name: 'home'
      })
    },
    submit() {
      Vm.$emit('getLogin',true)
    },
    clickme(id) {
      this.data.map(item => {
        item.className = ''
      })
      this.data[id].className = 'active'
      if (id === 0) {
        this.tableShow1 = true
        this.tableShow2 = false
        this.tableShow3 =false
        this.str = '我的网络咨询'
      }
      if (id === 1){
        this.tableShow2 = true
        this.tableShow1 = false
        this.tableShow3 =false
        this.str = '我的网络接访'
      }
      if (id ===2){
        this.tableShow3 = true
        this.tableShow1 = false
        this.tableShow2 =false
        this.str = '我的预约接访窗口'
      }
      
    },
      handleSizeChange(val) {
        this.sizi1 = val
        this.page1 = 1
        this.$axios.get('visitor/consulting/list',{ pageNum: 1, pageSize: val }).then(res => {
        this.tableData = res.data.data
        })
      },
      handleCurrentChange(val) {
        this.$axios.get('visitor/consulting/list',{ pageNum: val, pageSize: this.sizi1 }).then(res => {
        this.tableData = res.data.data
        })
      },
      onSizeChange(val) {
        this.sizi2 = val
        this.page2 = 1
        this.$axios.get('visitor/interview/list',{ pageNum: 1, pageSize: val }).then(res => {
        this.tableList = res.data.data
        })
      },
      onCurrentChange(val) {
        this.$axios.get('visitor/interview/list',{ pageNum: val, pageSize: this.sizi2 }).then(res => {
        this.tableList = res.data.data
        })
      },
      getSizeChange(val) {
        this.sizi3 = val
        this.page3 = 1
        this.$axios.get('visitor/windowsInterview/list',{ pageNum: 1, pageSize: val }).then(res => {
        this.tableCount = res.data.data
        })
      },
      getCurrentChange(val) {
        this.$axios.get('visitor/windowsInterview/list',{ pageNum: val, pageSize: this.sizi3 }).then(res => {
        this.tableCount = res.data.data
        })
      },
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
      handleClickOne(row) {
        this.$router.push({
          name:'zixunxq',
          params:{id: row.id}

        })
      },
      handleClickThr(row) {
        this.$router.push({
          name: 'chuangxq',
          params:{id: row.id}
        })
      },
      handleClickTwo(row) {
        this.$router.push({
          name: 'yuyuexq',
          params:{id: row.id}
        })
      },
  },
  created() {
    this.getTime()
      // 初次3个表格加载数据 网络咨询
      this.$axios.get('visitor/consulting/list',{params:{ pageNum: 1, pageSize: 10 }}).then(res => {
        console.log(res)
        this.tableData = res.data.data
        this.total1 = res.data.tada.total
      })
      // 初次3个表格加载数据 网络接访
      this.$axios.get('visitor/interview/list',{params:{ pageNum: 1, pageSize: 10 }}).then(res => {
          console.log(res)
        this.tableList = res.data.data
         this.total2 = res.data.data.total
      })
      // 初次3个表格加载数据 窗口接访
      this.$axios.get('visitor/windowsInterview/list',{params:{ pageNum: 1, pageSize: 10 }}).then(res => {
        console.log(res)
        this.tableCount = res.data.data
        this.total3 = res.data.data.total
      })  
  } 
}
</script>
