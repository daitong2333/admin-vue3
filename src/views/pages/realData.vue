<template>
  <div ref="chartDom" style="width: 500px; height: 500px;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartDom = ref(null);

onMounted(() => {
  const myChart = echarts.init(chartDom.value);
  
  // 示例数据（根据您提供的效果图）
  const data = [
    { name: '管道1', value: 1,a:1.1,b:2.2 },
    { name: '管道2', value: 1,a:1.1,b:2.2 },
    { name: '管道3', value: 1 ,a:1.1,b:2.2},
    { name: '管道4', value: 1,a:1.1,b:2.2 },
  ];
  
  // 计算总数
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const option = {
    title: {
      text: '掘进进度',
      subtext: `${total}%`,
      left: 'center',
      top: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold'
      },
      subtextStyle: {
        fontSize: 16,
        color: '#333'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        return `
          <div>流量: ${params.data.a}</div>
          <div>压力: ${params.data.b}%</div>
        `;
     }
    },
    legend: {
      // orient: 'vertical',
      bottom: 0,
      // top: 0,
      data: data.map(item => item.name)
    },
    series: [
      {
        name: '用户分类',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          
          formatter: function(params) {
            return `流量 ${params.data.a}\n 压力 ${params.data.b}%`;
          }
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: data.map(item => ({
          ...item,
          itemStyle: {
            color: getColor(item.name)
          }
        }))
      }
    ]
  };
  
  myChart.setOption(option);
  
  // 响应式调整
  window.addEventListener('resize', function() {
    myChart.resize();
  });
});

// 颜色生成函数
function getColor(name) {
  const colorMap = {
    '管道1': '#67C23A',  // 绿色
    '管道2': '#E6A23C',  // 橙色
    '管道3': '#F56C6C',  // 红色
    // '管道4': '#909399', // 灰色
    '管道4': '#409EFF'  // 蓝色
  };
  return colorMap[name] || '#909399';
}
</script>