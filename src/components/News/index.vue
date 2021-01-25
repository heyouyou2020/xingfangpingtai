<template>
  <div class="dashboard-container">
    <div class=" clearfix">
      <div class="neirong">
        <div class="top">{{message.typeName}}</div>
        <div class="top">{{message.title}}</div>
        <div class="time">
          <span class="left">发布时间:</span>
          <span class="right">{{message.updateTime}}</span>
        </div>
        <div class="conten">{{message.content}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import './index.less'
export default {
  name: 'ReviewArrest',
  data() {
    return {
      message: {},
    }
  },
  created() {
    this.$axios.get('visitor/info/'+ this.$route.params.id).then(res => {
      this.message = res.data.data
    })
  },
  mounted() {
  },
  methods: {
    refresh(val) {
    },
    getTime() {
      const nowDate = new Date()
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1
      }
      let mouth = ''
      // 月
      if (date.month < 10) {
        mouth = '0' + date.month
      } else {
        mouth = date.month
      }
      // 日
      // if (date.date < 10) {
      //     day = '0' + date.date
      // } else {
      //     day = date.date
      // }
      this.form.start = date.year - 1 + '-' + mouth
      this.form.end = date.year + '-' + mouth
    }
  }
}
</script>



