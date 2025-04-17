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
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['流量1', '流量2', '流量3', '流量4'],
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
        name: '流量1',
        type: 'line',
        data: [120, 132, 101, 134, 90, 230],
      },
      {
        name: '流量2',
        type: 'line',
        data: [220, 182, 191, 234, 290, 330],
      },
      {
        name: '流量3',
        type: 'line',
        data: [150, 232, 201, 154, 190, 330],
      },
      {
        name: '流量4',
        type: 'line',
        data: [320, 332, 301, 334, 390, 430],
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