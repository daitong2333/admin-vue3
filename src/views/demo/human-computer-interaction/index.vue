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
      <el-col :span="14" >
        <el-card shadow="never" class="mt-2" style="height:100%">
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

            <radarChart />
            <el-button>本环报表</el-button>
            <el-button>今日统计</el-button>
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
import radarChart from './radarChart.vue';
import pieRealData from './pieRealData.vue';
import ITable2 from './ITable2.vue'
import LogAPI, { VisitStatsVO, VisitTrendVO } from "@/api/system/log";
import { useUserStore } from "@/store/modules/user";
import { useMqtt } from "./useMqtt"
import { useRouter } from 'vue-router'
const router = useRouter()

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
// const { connect, subscribe, messages, isConnected } = useMqtt(
//   'ws://8.148.65.133:8083/mqtt',
//   { clientId: 'vue3-client-' + Math.random().toString(16).substring(2, 8),topic:'test33/topic' }
// );
// connect();
// subscribe('test33/topic'); // 订阅主题


const userStore = useUserStore();


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
