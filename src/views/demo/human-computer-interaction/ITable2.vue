<template>

<el-table
        ref="dataTableRef"
        :data="pageData"
        highlight-current-row
        border 
        style="width: 100%"
        height="240"
        stripe
      >
        <el-table-column label="管路" prop="timestamp" width="100" />
        <el-table-column label="注入量" prop="col1" width="100" />
        <el-table-column label="结束压力" prop="col2" width="100" />  
        <el-table-column label="充盈系数" prop="col3" width="100" />       
      </el-table>
</template>

<script setup lang="ts">
  // let pageData = ref([{title:'2025/3/27/18/24/30',device:'80'}])
  const pageData = ref([
  {
    timestamp: '管路1',
    time: '18:24:30',
    col1: 1023,
    col2: 0.38,
    col3: '--',
  },
  {
    timestamp: '管路2',
    time: '18:26:30',
    col1: 1020,
    col2: 0.424,
    col3: '--',
  },
  {
    timestamp: '管路3',
    time: '18:28:30',
    col1: 1006,
    col2: 0.448,
    col3: '--',
  },
  {
    timestamp: '管路4',
    time: '18:30:30',
    col1: 1232,
    col2: 0.458,
    col3: '--',
  },
  {
    timestamp: '汇总',
    col1: 4281,
    col2: 0.4275,
    col3:'1.189'
  },

]);
</script>