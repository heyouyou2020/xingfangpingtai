<template>
<div>
  <div class="wen-conten">
    <input type="text" class="wen-input"><span class="wen-find">查询</span><span class="wen-title" @click="lishi">历史问题</span>
  </div>
  <div class="wen-biaoge">
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
      </el-table>
  </div>
</div>
</template>
<script>
import './wenti.less'
export default { 
  data() {
    return {
      tableHeader: [
        { filed: 'wenti', title: '问题描述' },
      ],
      listLoading: false,
      tableData: [
        { wenti:'政务公开工作中存在的问题和不足'},
        { wenti:'政务公开工作中存在的问题和不足'},
        { wenti:'政务公开工作中存在的问题和不足'},
        { wenti:'政务公开工作中存在的问题和不足'},
        { wenti:'政务公开工作中存在的问题和不足'},
        { wenti:'政务公开工作中存在的问题和不足'},
        { wenti:'政务公开工作中存在的问题和不足'},
        { wenti:'政务公开工作中存在的问题和不足'},
      ],
    }
  },
  methods: {
    lishi() {
      this.$router.push({
        name: 'lishi'
      })
    }
  }           
}
</script>
