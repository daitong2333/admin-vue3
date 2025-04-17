<template>

  <div style="height: fit-content;background: #fff;margin: 16px;">
    <el-form ref="queryFormRef" :model="formModel" :inline="false" style="padding:24px" label-width="150px" :disabled="route.query?.isRead">
      <el-row :gutter="20">
        <el-col :span="12" v-for="item in shieldMachineData" :key="item.id">
          <el-form-item 
          :label="item.label"
          :prop="item.id"
        >
        <!-- 根据不同类型渲染不同输入组件 -->
        <template v-if="typeof formModel[item.id] === 'number'">
            <el-input-number 
              class="w200"
              v-model="formModel[item.id]" 
              :placeholder="`请输入${item.label}`"
            />
          </template>
          <template v-else>
            <el-input 
            class="w200"
              v-model="formModel[item.id]" 
              :placeholder="`请输入${item.label}`"
            />
          </template>
        </el-form-item>
        </el-col>
      </el-row>
     

        <!-- <el-form-item label="流量阈值" prop="keywords">
          <el-input
            class="w200"
            v-model="queryParams.a"
            placeholder="流量阈值"
          />
        </el-form-item> -->
        <el-form-item>
          <!-- <el-button class="filter-item" type="primary" icon="search" @click="handleQuery">
            搜索
          </el-button> -->
          <el-button class="filter-item" type="primary" icon="setting">
            参数下发
          </el-button>
          <el-button class="filter-item" type="info" icon="setting">
            参数保存
          </el-button>
          <!-- <el-button icon="refresh" @click="handleResetQuery">重置</el-button> -->
          <el-button icon="refresh" @click="handleResetQuery">重置</el-button>

        </el-form-item>
      </el-form>
  </div>

</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log('iiiiiii', route.query.isRead)
// const queryParams = reactive<{a:'',status:''}>({});
const shieldMachineData = [
  { id: 'shieldMachineNo', label: '盾构机号' },
  { id: 'equipmentNo', label: '设备号' },
  { id: 'projectSection', label: '工程标段(XX线)' },
  { id: 'phase', label: '期' },
  { id: 'bidSection', label: '标段' },
  { id: 'intervalName', label: '区间' },
  { id: 'constructionUnit', label: '施工单位' },
  { id: 'constructionTeam', label: '施工队' },
  { id: 'pileNo', label: '桩号' },
  { id: 'ringNo', label: '环号' },
  { id: 'slurryRatio', label: '浆液配比' },
  { id: 'timeInterval', label: '时间间隔(min)' },
  { id: 'pressureLimit', label: '压力上限(Bar)' },
  { id: 'endPressure', label: '结束压力(Bar)' },
  { id: 'groutingLimit', label: '注浆量上限(M3)' },
  { id: 'groutingHoles', label: '注浆孔数' },
  { id: 'inspectionBatchNo', label: '检验批号(单元号)' },
  { id: 'totalRings', label: '检验批(单元号)总环数' },
  { id: 'totalInspectionBatches', label: '总(单元)检验批数' }
]
const formModel = reactive({
  shieldMachineNo: 'D833',
  equipmentNo: '001',
  projectSection: '新港线',
  phase: '一期',
  bidSection: '二标',
  intervalName: '铁万区间',
  constructionUnit: '中铁十一局',
  constructionTeam: '盾构五队',
  pileNo: '0+1235',
  ringNo: '77',
  slurryRatio: '2:01',
  timeInterval: 2,
  pressureLimit: 15,
  endPressure: 4,
  groutingLimit: 6,
  groutingHoles: 4,
  inspectionBatchNo: '1',
  totalRings: 100,
  totalInspectionBatches: 20
})
</script>

<style lang="scss" scoped>
 .w200{
  width: 200px;
 }
</style>
