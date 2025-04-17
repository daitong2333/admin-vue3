<template>
  <div ref="chartDom" style="width: 600px; height: 400px;"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

const chartDom = ref(null);
let chartInstance = null;

// 初始化图表
const initChart = () => {
  if (!chartDom.value) return;
  chartInstance = echarts.init(chartDom.value);

  // 配置项
  const option = {
    // title: {
    //   text: '4 根压力图示例',
    // },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['压力1', '压力2', '压力3', '压力4'],
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '压力1',
        type: 'line',
        data: [0, 132, 101, 134, 90, 230],
      },
      {
        name: '压力2',
        type: 'line',
        data: [0, 182, 191, 234, 290, 330],
      },
      {
        name: '压力3',
        type: 'line',
        data: [0, 232, 201, 154, 190, 330],
      },
      {
        name: '压力4',
        type: 'line',
        data: [0, 332, 301, 334, 390, 430],
      },
    ],
  };

  chartInstance.setOption(option);
};

// 响应式调整图表大小
const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};

onMounted(() => {
  initChart();
  window.addEventListener('resize', resizeChart);
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
  window.removeEventListener('resize', resizeChart);
});
</script>