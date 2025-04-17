<template>
  <div class="dashboard-container">
    <!-- github 角标 -->
    <!-- <github-corner class="github-corner" /> -->
     <!-- {{messages}} -->
    <el-card shadow="never" class="mt-2">
      <el-row >
        <el-col :span="18" :xs="24">
          <div class="flex-x-start">
            <img
              class="w120px h120px rounded-full"
              src="https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif"
            />
            <div class="ml-5">
              <p>{{ greetings }}</p>
              <!-- <el-text tag="strong">D833 新港线一期二标 铁万区间</el-text> -->
              <p class=" text-black" style="font-size:24px">D833 新港线一期二标 铁万区间 
                <el-link
                type="primary"
                :underline="false"
                @click="navigateToSettings"
              >
                参数设置
                <el-icon class="link-icon"><TopRight /></el-icon>
              </el-link>
              </p>
              <p class=" text-gray" >施工单位:城市轨道工程--盾构五队</p>
              <p class=" text-gray" >桩号:12345 </p>
              <p class="text-gray cursor-pointer" @click="editN" >环号:
                <span >{{showFormData.ringNo}}</span> 
                <el-icon
                class="align-middle cursor-pointer"
              >
                <Edit />
              </el-icon>
              </p>
            </div>
            
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="10" class="mt-5">
      <el-col :span="14">
        <el-card shadow="never" class="mt-2">
          <template #header>
            <div class="flex-x-between">
              <span class="text-gray">实时数据</span>
              <!-- <el-tag type="success" size="small">日</el-tag> -->
            </div>
            </template>
            <div  class="flex-x-center">
              <pieRealData />
            </div>
            
        </el-card>
      </el-col>

      <el-col :span="10">
        <el-card shadow="never" class="mt-2">
          <template #header>
            <div class="flex-x-between">
              <span class="text-gray">单环数据</span>
              <!-- <el-tag type="success" size="small">日</el-tag> -->
            </div>
            </template>
            
            <div class="flex-x-between text-gray" style="margin-bottom: 16px;">
              <span style="width: 400px;">开始时间: 2025/3/27/18/24/30</span> 
              <span style="width: 400px;">结束时间: 2025/3/27/18/52/30</span> 
            </div>

            <div class="flex-x-between text-gray">
              <span style="width: 400px;">掘进进尺: 1200</span> 
              <span style="width: 400px;">理论间隙: 3600</span> 
            </div>
            <ITable2></ITable2>
        </el-card>
      </el-col>
   </el-row>
      <!-- 折线图 -->
    <el-row :gutter="10" class="mt-5">
    <el-col :span="12">
          <el-card shadow="never">
            <template #header>
              <div class="flex-x-between">
                <span class="text-gray">压力曲线</span>
              </div>
            </template>
            
            <presureLine></presureLine>
          </el-card>
    </el-col> 
    <el-col :span="12">
          <el-card shadow="never">
            <template #header>
              <div class="flex-x-between">
                <span class="text-gray">流量曲线</span>
              </div>
            </template>
            
            <flowLine />
          </el-card>
    </el-col> 
   </el-row>
   <!-- 报表数据 -->
   <el-row :gutter="10" class="mt-5">
      <el-col :span="24">
        <el-card shadow="never" class="mt-2">
          <template #header>
            <div class="flex-x-between">
              <span class="text-gray">报表数据</span>
              <!-- <el-tag type="success" size="small">日</el-tag> -->
            </div>
            </template>
            <ITable></ITable>
        </el-card>
      </el-col>
   </el-row>
    <!-- 数据统计 -->
    <el-row :gutter="10" class="mt-5">
      <!-- 柱状图 -->
      <el-col :span="24">
            <el-card shadow="never">
              <template #header>
                <div class="flex-x-between">
                  <span class="text-gray">施工进度</span>
                  <el-tag type="success" size="small">日</el-tag>
                </div>
              </template>
              
              <!-- 柱状图 -->
              <ECharts :options="barChartOptions" height="400px" />

            </el-card>
      </el-col> 
    </el-row>
 

    <el-row :gutter="10" class="mt-5" v-if="false">
      <!-- 访问趋势统计图 -->
      <el-col :xs="24" :span="16">
        <el-card>
          <template #header>
            <div class="flex-x-between">
              <span>过程曲线</span>
              <el-radio-group v-model="visitTrendDateRange" size="small">
                <el-radio-button label="近7天" :value="7" />
                <el-radio-button label="近30天" :value="30" />
              </el-radio-group>
            </div>
          </template>
          <ECharts :options="visitTrendChartOptions" height="400px" />
        </el-card>
      </el-col>
      <!-- 最新动态 -->
      <el-col :xs="24" :span="8">
        <el-card>
          <template #header>
            <div class="flex-x-between">
              <span class="header-title">最新动态</span>
              <el-link
                type="primary"
                :underline="false"
                href="https://gitee.com/youlaiorg/vue3-element-admin/releases"
                target="_blank"
              >
                完整记录
                <el-icon class="link-icon"><TopRight /></el-icon>
              </el-link>
            </div>
          </template>
          <div style="height:400px;padding:3px;overflow: hidden;">
            <vue3-seamless-scroll
            :list="vesionList"
            :step="0.2"
            :hover="true"
          >
            <div  v-for="(item, index) in vesionList" :key="index">
              <div class="version-item" :class="{ 'latest-item': index === 0 }">
                  <div>
                    <el-text tag="strong">{{ item.title }}</el-text>
                    <el-tag v-if="item.tag" :type="index === 0 ? 'success' : 'info'" size="small">
                      {{ item.tag }}
                    </el-tag>
                  </div>

                  <el-text class="version-content">{{ item.content }}</el-text>

                  <div v-if="item.link">
                    <el-link
                      :type="index === 0 ? 'primary' : 'info'"
                      :href="item.link"
                      target="_blank"
                      :underline="false"
                    >
                      详情
                      <el-icon class="link-icon"><TopRight /></el-icon>
                    </el-link>
                  </div>
              </div>  
              <!-- <span>{{ item.title }}</span>
              <span>{{ item.date }}</span> -->
            </div>
          </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>


  <el-dialog
      v-model="dialog.visible"
      :title="dialog.title"
      width="500px"
      @close="handleCloseDialog"
    >
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="环号" prop="ringNo">
          <el-input
            v-model="formData.ringNo"
            style="width: 280px"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="handleCloseDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>
</template>

<script setup lang="ts">

defineOptions({
  name: "Dashboard",
  inheritAttrs: false,
});
import pieRealData from './pieRealData.vue';
import flowLine from './flowLine.vue';
import presureLine from './presureLine.vue';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'
import { dayjs } from "element-plus";
import TableInit from './table.vue'
import ITable from './ITable.vue'
import ITable2 from './ITable2.vue'
import LogAPI, { VisitStatsVO, VisitTrendVO } from "@/api/system/log";
import { useUserStore } from "@/store/modules/user";
import { formatGrowthRate } from "@/utils";
import { useMqtt } from "./useMqtt"
import { useRouter } from 'vue-router'
import { title } from 'process';
const router = useRouter()

interface VersionItem {
  id: string;
  title: string; // 版本标题（如：v2.4.0）
  date: string; // 发布时间
  content: string; // 版本描述
  link: string; // 详情链接
  tag?: string; // 版本标签（可选）
}
const showFormData = reactive({
  ringNo: '77',
})
const formData = reactive({
  ringNo: '',
})
const formRef = ref(null)
const dialog = ref({title:'编辑环号',visible:false})
const rules = reactive({
  ringNo:[
    { required: true, message: '请输入环号', trigger: ['blur','change']},
    // { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ]
})
const editN = ()=>{
  formData.ringNo =  showFormData.ringNo
  dialog.value.visible = true
}

const handleCloseDialog = ()=>{
  dialog.value.visible = false
}
const handleSubmit = async()=>{
  await formRef.value.validate()

  showFormData.ringNo =  formData.ringNo
  dialog.value.visible = false
}
const navigateToSettings = () => {
  router.push('/function/parameter-setting') // 替换为你的实际路由路径
  // 或者使用命名路由
  // router.push({ name: 'parameter-setting' })
}
console.log('ooooooo',useMqtt)
const { connect, subscribe, messages, isConnected } = useMqtt(
  'ws://8.148.65.133:8083/mqtt',
  { clientId: 'vue3-client-' + Math.random().toString(16).substring(2, 8),topic:'test33/topic' }
);
connect();
// subscribe('test33/topic'); // 订阅主题


const userStore = useUserStore();

// 当前通知公告列表
const vesionList = ref<VersionItem[]>([
  {
    id: "1",
    title: "v2.4.0",
    date: "2021-09-01 00:00:00",
    content: "实现基础框架搭建，包含权限管理、路由系统等核心功能。",
    link: "https://gitee.com/youlaiorg/vue3-element-admin/releases",
    tag: "里程碑1",
  },
  {
    id: "2",
    title: "v2.4.0",
    date: "2021-09-01 00:00:00",
    content: "实现基础框架搭建，包含权限管理、路由系统等核心功能。",
    link: "https://gitee.com/youlaiorg/vue3-element-admin/releases",
    tag: "里程碑2",
  },
  {
    id: "3",
    title: "v2.4.0",
    date: "2021-09-01 00:00:00",
    content: "实现基础框架搭建，包含权限管理、路由系统等核心功能。",
    link: "https://gitee.com/youlaiorg/vue3-element-admin/releases",
    tag: "里程碑3",
  },
  {
    id: "4",
    title: "v2.4.0",
    date: "2021-09-01 00:00:00",
    content: "实现基础框架搭建，包含权限管理、路由系统等核心功能。",
    link: "https://gitee.com/youlaiorg/vue3-element-admin/releases",
    tag: "里程碑4",
  },
]);

// 当前时间（用于计算问候语）
const currentDate = new Date();

// 问候语：根据当前小时返回不同问候语
const greetings = computed(() => {
  const hours = currentDate.getHours();
  const nickname = userStore.userInfo.nickname;
  if (hours >= 6 && hours < 8) {
    return "晨起披衣出草堂，轩窗已自喜微凉🌅！";
  } else if (hours >= 8 && hours < 12) {
    return `上午好，${nickname}！`;
  } else if (hours >= 12 && hours < 18) {
    return `下午好，${nickname}！`;
  } else if (hours >= 18 && hours < 24) {
    return `晚上好，${nickname}！`;
  } else {
    return "偷偷向银河要了一把碎星，只等你闭上眼睛撒入你的梦中，晚安🌛！";
  }
});

// 访客统计数据加载状态
const visitStatsLoading = ref(true);
// 访客统计数据
const visitStatsData = ref<VisitStatsVO>({
  todayUvCount: 0,
  uvGrowthRate: 0,
  totalUvCount: 0,
  todayPvCount: 0,
  pvGrowthRate: 0,
  totalPvCount: 0,
});

// 访问趋势日期范围（单位：天）
const visitTrendDateRange = ref(7);
// 访问趋势图表配置
const visitTrendChartOptions = ref();

/**
 * 获取访客统计数据
 */
const fetchVisitStatsData = () => {
  LogAPI.getVisitStats()
    .then((data) => {
      visitStatsData.value = data;
    })
    .finally(() => {
      visitStatsLoading.value = false;
    });
};

/**
 * 获取访问趋势数据，并更新图表配置
 */
const fetchVisitTrendData = () => {
  const startDate = dayjs()
    .subtract(visitTrendDateRange.value - 1, "day")
    .toDate();
  const endDate = new Date();

  LogAPI.getVisitTrend({
    startDate: dayjs(startDate).format("YYYY-MM-DD"),
    endDate: dayjs(endDate).format("YYYY-MM-DD"),
  }).then((data) => {
    updateVisitTrendChartOptions(data);
  });
};

/**
 * 更新访问趋势图表的配置项
 *
 * @param data - 访问趋势数据
 */
const updateVisitTrendChartOptions = (data: VisitTrendVO) => {
  console.log("Updating visit trend chart options");

  visitTrendChartOptions.value = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["压力(PV)", "流量(UV)"],
      bottom: 0,
    },
    grid: {
      left: "1%",
      right: "5%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data.dates,
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
        },
      },
    },
    series: [
      {
        name: "压力(PV)",
        type: "line",
        data: data.pvList,
        areaStyle: {
          color: "rgba(64, 158, 255, 0.1)",
        },
        smooth: true,
        itemStyle: {
          color: "#4080FF",
        },
        lineStyle: {
          color: "#4080FF",
        },
      },
      {
        name: "流量(UV)",
        type: "line",
        data: data.ipList,
        areaStyle: {
          color: "rgba(103, 194, 58, 0.1)",
        },
        smooth: true,
        itemStyle: {
          color: "#67C23A",
        },
        lineStyle: {
          color: "#67C23A",
        },
      },
    ],
  };
};

let barChartOptions = ref({
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["压力", "注入量"],
      bottom: 0,
    },
    grid: {
      left: "1%",
      right: "5%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      // data: [],
    },
    yAxis: {
      type: "category",
      data: ['X环(起)', 'X+1', 'X+2', 'X+3', 'X+4']
      // splitLine: {
      //   show: true,
      //   lineStyle: {
      //     type: "dashed",
      //   },
      // },
    },
  
    series: [
      {
        name: "压力",
        type: "bar",
        data: [320, 302, 341, 374, 290],
        areaStyle: {
          color: "rgba(64, 158, 255, 0.1)",
        },
        smooth: true,
        itemStyle: {
          color: "#4080FF",
        },
        markLine : {
                symbol:"none",
                itemStyle: {
                    normal: {
                        color:'#4080FF',
                        label: {
                        show: true, // 显示标签
                        color: '#333', // 标签文字颜色
                        fontSize: 12, // 字体大小
                        fontWeight: 'bold', // 字体粗细
                        formatter: function(params) {
                          return `压力基准（${params.value}）`
                      }
                    }
                    }
                }, 
                data : [{
                     xAxis: 100,
                     silent:true, 
                }]
                
            }
      },
      {
        name: "注入量",
        type: "bar",
        data: [420, 382, 401, 414, 390],
        areaStyle: {
          color: "rgba(103, 194, 58, 0.1)",
        },
        smooth: true,
        itemStyle: {
          color: "#cc333f",
        },
        markLine : {
                symbol:"none",
                itemStyle: {
                    normal: {
                        color:'#cc333f',
                        label: {
                        show: true, // 显示标签
                        color: '#333', // 标签文字颜色
                        fontSize: 12, // 字体大小
                        fontWeight: 'bold', // 字体粗细
                        formatter: function(params) {
                          return `注入量基准（${params.value}）`
                      }
                    }
                    }
                }, 
                data : [{
                     xAxis: 250,
                     silent:true, 
                }]
                
            }
      },

      // {
      //   name: '压力基线',
      //   type: 'line',
      //   data: [100, 100, 100, 100, 100, 100],
      //   symbol: 'none',
      //   lineStyle: {
      //     color: '#4080FF',
      //     width: 2,
      //     type: 'dashed'
      //   },
      // },
      // {
      //   name: '流量基线',
      //   type: 'line',
      //   data: [200, 200, 200, 200, 200, 200],
      //   symbol: 'none',
      //   lineStyle: {
      //     color: '#cc333f',
      //     width: 2,
      //     type: 'dashed'
      //   },
      // },
    ],
  })

/**
 * 根据增长率计算对应的 CSS 类名
 *
 * @param growthRate - 增长率数值
 */
const computeGrowthRateClass = (growthRate?: number): string => {
  if (!growthRate) {
    return "color-[--el-color-info]";
  }
  if (growthRate > 0) {
    return "color-[--el-color-danger]";
  } else if (growthRate < 0) {
    return "color-[--el-color-success]";
  } else {
    return "color-[--el-color-info]";
  }
};

// 监听访问趋势日期范围的变化，重新获取趋势数据
watch(
  () => visitTrendDateRange.value,
  (newVal) => {
    console.log("Visit trend date range changed:", newVal);
    fetchVisitTrendData();
  },
  { immediate: true }
);

// 组件挂载后加载访客统计数据和通知公告数据
onMounted(() => {
  fetchVisitStatsData();
});
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  padding: 24px;

  .github-corner {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    border: 0;
  }

  .version-item {
    padding: 16px;
    margin-bottom: 12px;
    background: var(--el-fill-color-lighter);
    border-radius: 8px;
    transition: all 0.2s;

    &.latest-item {
      background: var(--el-color-primary-light-9);
      border: 1px solid var(--el-color-primary-light-5);
    }
    &:hover {
      transform: translateX(5px);
    }
    .version-content {
      margin-bottom: 12px;
      font-size: 13px;
      line-height: 1.5;
      color: var(--el-text-color-secondary);
    }
  }
}
</style>
