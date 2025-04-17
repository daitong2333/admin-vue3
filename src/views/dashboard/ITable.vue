<template>

<el-table
        ref="dataTableRef"
        :data="pageData"
        highlight-current-row
        border 
        style="width: 100%"
        height="300"
        stripe
      >
        <el-table-column label="记录时间" prop="timestamp" min-width="220" />
        <el-table-column label="掘进进尺mm" prop="col1" width="140" />
        <el-table-column label="注浆流量1(L/min)" prop="col2" width="140" />
        <el-table-column label="累计注入量1(L)" prop="col3" width="140" />
        <el-table-column label="压力1(Bar)" prop="col4" width="140" />
        <el-table-column label="注浆流量2(L/min)" prop="col5" width="140" />
        <el-table-column label="累计注入量2(L)" prop="col6" width="140" />
        <el-table-column label="压力2(Bar)" prop="col7" width="140" />
        <el-table-column label="注浆流量3(L/min)" prop="col8" width="140" />
        <el-table-column label="累计注入量3(L)" prop="col9" width="140" />
        <el-table-column label="压力3(Bar)" prop="col10" width="140" />
        <el-table-column label="注浆流量4(L/min)" prop="col11" width="140" />
        <el-table-column label="累计注入量4(L)" prop="col12" width="140" />
        <el-table-column label="压力4(Bar)" prop="col13" width="140" />
      </el-table>
</template>

<script setup lang="ts">
  // let pageData = ref([{title:'2025/3/27/18/24/30',device:'80'}])
  const pageData = ref([
  {
    timestamp: '2025/3/27/18/24/30',
    time: '18:24:30',
    col1: 80,
    col2: 20.0,
    col3: 1.0,
    col4: 0.12,
    col5: 21.0,
    col6: 40,
    col7: 0.13,
    col8: 22,
    col9: 40,
    col10: 0.14,
    col11: 23,
    col12: 42,
    col13: 0.15
  },
  {
    timestamp: '2025/3/27/18/26/30',
    time: '18:26:30',
    col1: 160,
    col2: 20.0,
    col3: 74.0,
    col4: 0.14,
    col5: 19.9,
    col6: 110,
    col7: 0.151,
    col8: 20.9,
    col9: 109,
    col10: 0.162,
    col11: 21.7,
    col12: 127,
    col13: 0.172
  },
  {
    timestamp: '2025/3/27/18/28/30',
    time: '18:28:30',
    col1: 240,
    col2: 19.0,
    col3: 147.0,
    col4: 0.16,
    col5: 18.8,
    col6: 180,
    col7: 0.172,
    col8: 19.8,
    col9: 178,
    col10: 0.184,
    col11: 20.4,
    col12: 212,
    col13: 0.194
  },
  {
    timestamp: '2025/3/27/18/30/30',
    time: '18:30:30',
    col1: 320,
    col2: 18.0,
    col3: 220.0,
    col4: 0.18,
    col5: 17.7,
    col6: 250,
    col7: 0.193,
    col8: 18.7,
    col9: 247,
    col10: 0.206,
    col11: 19.1,
    col12: 297,
    col13: 0.216
  },
  {
    timestamp: '2025/3/27/18/32/30',
    time: '18:32:30',
    col1: 400,
    col2: 17.0,
    col3: 293.0,
    col4: 0.19,
    col5: 16.6,
    col6: 320,
    col7: 0.214,
    col8: 17.6,
    col9: 316,
    col10: 0.228,
    col11: 17.8,
    col12: 382,
    col13: 0.238
  },
  {
    timestamp: '2025/3/27/18/34/30',
    time: '18:34:30',
    col1: 480,
    col2: 16.0,
    col3: 366.0,
    col4: 0.21,
    col5: 15.5,
    col6: 390,
    col7: 0.235,
    col8: 16.5,
    col9: 385,
    col10: 0.25,
    col11: 16.5,
    col12: 467,
    col13: 0.26
  },
  {
    timestamp: '2025/3/27/18/36/30',
    time: '18:36:30',
    col1: 560,
    col2: 15.0,
    col3: 439.0,
    col4: 0.23,
    col5: 14.4,
    col6: 460,
    col7: 0.256,
    col8: 15.4,
    col9: 454,
    col10: 0.272,
    col11: 15.2,
    col12: 552,
    col13: 0.282
  },
  {
    timestamp: '2025/3/27/18/38/30',
    time: '18:38:30',
    col1: 640,
    col2: 14.0,
    col3: 512.0,
    col4: 0.25,
    col5: 13.3,
    col6: 530,
    col7: 0.277,
    col8: 14.3,
    col9: 523,
    col10: 0.294,
    col11: 13.9,
    col12: 637,
    col13: 0.304
  },
  {
    timestamp: '2025/3/27/18/40/30',
    time: '18:40:30',
    col1: 720,
    col2: 13.0,
    col3: 585.0,
    col4: 0.27,
    col5: 12.2,
    col6: 600,
    col7: 0.298,
    col8: 13.2,
    col9: 592,
    col10: 0.316,
    col11: 12.6,
    col12: 722,
    col13: 0.326
  },
  {
    timestamp: '2025/3/27/18/42/30',
    time: '18:42:30',
    col1: 800,
    col2: 12.0,
    col3: 658.0,
    col4: 0.29,
    col5: 11.1,
    col6: 670,
    col7: 0.319,
    col8: 12.1,
    col9: 661,
    col10: 0.338,
    col11: 11.3,
    col12: 807,
    col13: 0.348
  },
  {
    timestamp: '2025/3/27/18/44/30',
    time: '18:44:30',
    col1: 880,
    col2: 11.0,
    col3: 731.0,
    col4: 0.31,
    col5: 10.0,
    col6: 740,
    col7: 0.34,
    col8: 11,
    col9: 730,
    col10: 0.36,
    col11: 10,
    col12: 892,
    col13: 0.37
  },
  {
    timestamp: '2025/3/27/18/46/30',
    time: '18:46:30',
    col1: 960,
    col2: 10.0,
    col3: 804.0,
    col4: 0.32,
    col5: 8.9,
    col6: 810,
    col7: 0.361,
    col8: 9.9,
    col9: 799,
    col10: 0.382,
    col11: 8.7,
    col12: 977,
    col13: 0.392
  },
  {
    timestamp: '2025/3/27/18/48/30',
    time: '18:48:30',
    col1: 1040,
    col2: 9.0,
    col3: 877.0,
    col4: 0.34,
    col5: 7.8,
    col6: 880,
    col7: 0.382,
    col8: 8.8,
    col9: 868,
    col10: 0.404,
    col11: 7.4,
    col12: 1062,
    col13: 0.414
  },
  {
    timestamp: '2025/3/27/18/50/30',
    time: '18:50:30',
    col1: 1120,
    col2: 8.0,
    col3: 950.0,
    col4: 0.36,
    col5: 6.7,
    col6: 950,
    col7: 0.403,
    col8: 7.7,
    col9: 937,
    col10: 0.426,
    col11: 6.1,
    col12: 1147,
    col13: 0.436
  },
  {
    timestamp: '2025/3/27/18/52/30',
    time: '18:52:30',
    col1: 1200,
    col2: 7.0,
    col3: 1023.0,
    col4: 0.38,
    col5: 5.6,
    col6: 1020,
    col7: 0.424,
    col8: 6.6,
    col9: 1006,
    col10: 0.448,
    col11: 4.8,
    col12: 1232,
    col13: 0.458
  }
]);
</script>