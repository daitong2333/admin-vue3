<template>
  <div>
    <span>注入速率:{{speedSum}} (L/min)</span>
    <div ref="chartDom" style="width: 500px; height: 500px;"></div>
  </div>
 
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartDom = ref(null);
const data = ref([
    { name: '管道1', value: 1,a:20,b:0.12 },
    { name: '管道2', value: 1,a:21,b:0.13 },
    { name: '管道3', value: 1 ,a:22,b:0.14},
    { name: '管道4', value: 1,a:23,b:0.15 },
  ])

const speedSum = ref(0)
    speedSum.value = data.value.reduce((sum, item) => sum + item.a, 0);
const total = ref(40)  
let myChart = null
onMounted(() => {
  myChart = echarts.init(chartDom.value);
  const option = {
    title: {
      text: '掘进进度',
      subtext: `${total.value}(mm/min)`,
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
          <div>压力: ${params.data.b}</div>
        `;
     }
    },
    legend: {
      // orient: 'vertical',
      bottom: 0,
      // top: 0,
      data: data.value.map(item => item.name)
    },
    series: [
      {
        name: '用户分类',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          
          formatter: function(params) {
            return `流量 ${params.data.a}(L/min)\n 压力 ${params.data.b}(bar)`;
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
        data: data.value.map(item => ({
          ...item,
          itemStyle: {
            color: getColor(item.name)
          }
        }))
      }
    ]
  };
  
  myChart.setOption(option);
   // 启动定时更新
   startDataUpdate();
  // 响应式调整
  window.addEventListener('resize', function() {
    myChart.resize();
  });
});
function getRandomInRange(min, max) {
      return Math.random() * (max - min) + min;
}
function startDataUpdate(){
  // 生成[-5, 5]之间的随机数（包含边界）
  setInterval(()=>{
    let mapA = [0.12,0.13,0.14,0.15]
    total.value = getRandomInRange(-5, 5) + 40
    const variation = parseFloat((Math.random() * 0.1 - 0.05).toFixed(2));
    data.value.forEach((x,idx)=>{
      x.a = (((40 - total.value)/40 + 1)*x.a).toFixed(2)
      x.b = parseFloat((mapA[idx] + variation).toFixed(2))
    })
  speedSum.value = data.value.reduce((acc, item) => {
      return acc + parseFloat(item.a);
    }, 0).toFixed(2);
     // 更新图表数据和中心显示的总数
     myChart.setOption({
        title: {
          subtext: `${total.value.toFixed(2)}(mm/min)`,
        },
        series: [{
          data: data.value
        }]
      });
  },3000)
}
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