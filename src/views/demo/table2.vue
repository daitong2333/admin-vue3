<template>

  <el-table
          ref="dataTableRef"
          :data="pageData"
          highlight-current-row
          border 
          style="width: 100%"
          height="440"
          stripe
        >
          <el-table-column label="城市" prop="timestamp" min-width="100" />
          <el-table-column label="工程名" prop="col1" min-width="100" />
          <el-table-column label="标段" prop="col2" min-width="100" />  
          <el-table-column label="区间" prop="col3" min-width="100" />   
          
          <el-table-column label="盾构编号" prop="col4" min-width="100" />
          <el-table-column label="同注灌浆状态" prop="col5" min-width="100" />
          <!-- <el-table-column label="标段" prop="col2" width="100" />  
          <el-table-column label="区间" prop="col3" width="100" />  -->
        </el-table>
  </template>
  
  <script setup lang="ts">
    // let pageData = ref([{title:'2025/3/27/18/24/30',device:'80'}])
    const pageData = ref([
    {
      timestamp: '武汉市',
      col1: "新港一期",
      col2: "二标",
      col3: '铁万区间',
      col4: "D833",
      col5: '在线',
    },
  ]);
  </script>