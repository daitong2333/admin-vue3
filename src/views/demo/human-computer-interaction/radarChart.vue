<template>
  <div ref="chartDom" style="width: 400px; height: 350px;"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

const chartDom = ref(null);
let chartInstance = null;

// 模拟数据（实际可替换为API数据）
const pipelineData = {
  pipeline1: { flow: 85, pressure: 72, fullness: 90,a:12},
  pipeline2: { flow: 78, pressure: 65, fullness: 82,a:13 },
  pipeline3: { flow: 92, pressure: 88, fullness: 95,a:14 },
  pipeline4: { flow: 68, pressure: 75, fullness: 70,a:88 }
};

// 指标配置
const indicators = [
  { name: '流量', max: 100, unit: 'm³/h' },
  { name: '压力', max: 100, unit: 'MPa' },
  { name: '充盈参数', max: 100, unit: '%' },
  { name: '待定参数', max: 100, unit: 'x' }
];

const initChart = () => {
  if (!chartDom.value) return;
  chartInstance = echarts.init(chartDom.value);

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: params => {
        const unit = indicators[params.dataIndex].unit;
        return `${params.seriesName}<br/>
                ${params.name}: ${params.value} ${unit}`;
      }
    },
    legend: {
      data: ['管路1', '管路2', '管路3', '管路4'],
      bottom: 10,
      // orient: 'vertical'
    },
    radar: {
      indicator: indicators.map(item => ({
        name: `${item.name}(${item.unit})`,
        max: item.max
      })),
      radius: '65%',
      splitNumber: 4,
      axisName: {
        color: '#666'
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(255,255,255,0.7)', 'rgba(200,200,200,0.3)']
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(100, 100, 100, 0.2)'
        }
      }
    },
    series: [
      {
        name: '管路参数',
        type: 'radar',
        emphasis: {
          lineStyle: { width: 4 }
        },
        data: [
          {
            value: Object.values(pipelineData.pipeline1),
            name: '管路1',
            areaStyle: { color: 'rgba(255, 99, 71, 0.4)' },
            lineStyle: { color: '#FF6347', width: 2 },
            symbol: 'path://M0,0L5,5L10,0L5,-5Z', // 自定义箭头符号
            symbolSize: 10
          },
          {
            value: Object.values(pipelineData.pipeline2),
            name: '管路2',
            areaStyle: { color: 'rgba(65, 105, 225, 0.4)' },
            lineStyle: { color: '#4169E1', width: 2 },
            symbol: 'rect',
            symbolSize: 8
          },
          {
            value: Object.values(pipelineData.pipeline3),
            name: '管路3',
            areaStyle: { color: 'rgba(50, 205, 50, 0.4)' },
            lineStyle: { color: '#32CD32', width: 2 },
            symbol: 'triangle',
            symbolSize: 10
          },
          {
            value: Object.values(pipelineData.pipeline4),
            name: '管路4',
            areaStyle: { color: 'rgba(147, 112, 219, 0.4)' },
            lineStyle: { color: '#9370DB', width: 2 },
            symbol: 'diamond',
            symbolSize: 10
          }
        ]
      }
    ]
  };

  chartInstance.setOption(option);
};

// 响应式调整
const resizeChart = () => chartInstance?.resize();

onMounted(() => {
  initChart();
  window.addEventListener('resize', resizeChart);
});

onBeforeUnmount(() => {
  chartInstance?.dispose();
  window.removeEventListener('resize', resizeChart);
});
</script>