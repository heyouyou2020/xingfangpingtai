<template>
  
</template>
<script>
import './index.less'
import { userData } from '../../services'
export default {
    data() {
        return{
            total: 200,
            xingqi: '',
            riqi: '',
            userName: '',
            time: '',
            listLoading: false,
            tableHeader: [
              { filed: 'bianhao', title: '编号' },
              { filed: 'time', title: '信访时间', colorB: 'colorB', width: '200' },
              { filed: 'leixing', title: '信访类型' },
              { filed: 'neirong', title: '信访类容' },
            ],
            tableData: [
              { bianhao: '1302', time: '2019-12-4', leixing: '山东检察院', neirong:'这是是救助资源'},
              { bianhao: '1302', time: '2019-12-4', leixing: '山东检察院', neirong:'这是是救助资源'},
              { bianhao: '1302', time: '2019-12-4', leixing: '山东检察院', neirong:'这是是救助资源'},
              { bianhao: '1302', time: '2019-12-4', leixing: '山东检察院', neirong:'这是是救助资源'},
              { bianhao: '1302', time: '2019-12-4', leixing: '山东检察院', neirong:'这是是救助资源'},
              { bianhao: '1302', time: '2019-12-4', leixing: '山东检察院', neirong:'这是是救助资源'},
              { bianhao: '1302', time: '2019-12-4', leixing: '山东检察院', neirong:'这是是救助资源'},
              { bianhao: '1302', time: '2019-12-4', leixing: '山东检察院', neirong:'这是是救助资源'},
            ],
        }
    },
    methods: {
        zhuxiao() {
          if(confirm('确定退出登录吗')) {
            this.$router.push({
                name: 'home',
            })
            userData.removeUserData()
          }
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
        goback() {
           this.$router.go(-1)
        },
        find() {},
        handleClick() {
            this.$router.push({
                name: 'xiangqing',
            })
        },
        handleCurrentChange() {},
        handleSizeChange() {},
    },
    created() {
        this.getTime()
        const name = userData.getUserData()
        this.userName = name
    },
}
</script>
