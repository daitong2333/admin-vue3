<template>
  <div ref="chartDom" style="width: 600px; height: 400px;"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

const chartDom = ref(null);
let chartInstance = null;
const emits = defineEmits(['custom-event']);
// 示例数据
const pieData = [
  { value: 1, name: '省外' },
  { value: 1, name: '省内' },
  { value: 1, name: '武汉' },
];

onMounted(() => {
  chartInstance = echarts.init(chartDom.value);
  
  const option = {
    title: {
      text: '在线盾构分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        // 自定义悬停提示框内容
        return `
          <div style="font-weight:bold;margin-bottom:5px;">${params.name}</div>
          <div style="display:flex;align-items:center;">
            <span style="display:inline-block;width:10px;height:10px;background:${params.color};margin-right:5px;"></span>
            <span>数值: ${params.value}</span>
          </div>
          <div style="margin-top:5px;">占比: ${params.percent}%</div>
          ${params.data.remark ? `<div style="margin-top:5px;">备注: ${params.data.remark}</div>` : ''}
        `;
      }
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'inside',
          formatter: '{b}: {c}'
        },
        emphasis: {
          // 悬停时的高亮样式
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          // 悬停时的标签样式
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold',
            formatter: (params) => {
              return `{name|${params.name}}\n{value|${params.value}}\n{percent|${params.percent}%}`;
            },
            rich: {
              name: {
                fontSize: 14,
                color: '#333',
                padding: [0, 0, 5, 0]
              },
              value: {
                fontSize: 16,
                fontWeight: 'bold',
                color: '#000'
              },
              percent: {
                fontSize: 12,
                color: '#999'
              }
            }
          }
        },
        data: pieData.map(item => ({
          ...item,
          // 可以添加额外数据用于tooltip显示
          remark: getRemark(item.name)
        }))
      }
    ]
  };
  
  chartInstance.setOption(option);
  
  // 响应式调整
  window.addEventListener('resize', handleResize);
  chartInstance.on('click', function(params) {
  console.log('点击了:', params.name, '数值:', params.value);

  emits('custom-event', params.name);
  // alert(`点击了 ${params.name}，数值: ${params.value}`);
});
});

// 根据名称获取备注信息
function getRemark(name) {
  const remarks = {
    '直接访问': '用户直接输入网址访问',
    '邮件营销': '通过营销邮件引导访问',
    '联盟广告': '来自广告联盟的流量',
    '视频广告': '视频平台投放的广告',
    '搜索引擎': '来自Google、百度等搜索引擎'
  };
  return remarks[name] || '';
}

// 处理窗口大小变化
const handleResize = () => {
  chartInstance && chartInstance.resize();
};

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  if (chartInstance) {
    chartInstance.dispose();
  }
});
</script>

<style scoped>
/* 可以添加自定义样式 */
</style>