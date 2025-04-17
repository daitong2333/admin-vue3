<template>

         <div style="height: 100%;background: #fff;margin: 16px;">

          <el-row :gutter="10" class="mt-5" style="height: 500px;padding-top:48px">
            <!-- 访问趋势统计图 -->
            <el-col :xs="16" :span="16">
               <Pie2  @custom-event="handleCustomEvent" />
            </el-col>
            <el-col :xs="18" :span="8">

              <div class="version-item" v-if="flag">
                  <div>
                    <el-text tag="strong">D833 新港一期二标</el-text>
                    <el-tag type="success" size="small" style="margin: 0 16px;">在线</el-tag>
                  </div>
           

                  <el-link
                      type="primary"
                      :underline="false"
                      @click="handleClick()"
                    >
                    点击进去区间页
                      <el-icon class="link-icon"><TopRight /></el-icon>
                    </el-link>
              </div>  
               <!-- <div style="border: 1px dashed #000;height: 100%;" class="flex-y-center" v-if="flag">
                 <span>D833 新港一期二标</span>
                 <el-tag type="success" size="small" style="margin: 0 16px;">在线</el-tag>
               
               </div> -->
            </el-col>
          </el-row>


          <table2 style="width: 100%;padding:  16px"></table2>
         </div>

</template>

<script setup>
import Pie2 from './pie2.vue';
import table2 from './table2.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const flag = ref(false);
const handleCustomEvent = (msg) => {
  // if(msg === '武汉'){
     flag.value = msg === '武汉'
  // }
  // message.value = msg;
  console.log('iiiii',message.value)
};
const handleClick = ()=>{
  router.push('/')
}
</script>

<style lang="scss" scoped>
 .version-item {
    padding: 16px;
    margin-bottom: 12px;
    background: #ecf2ff;
    border-radius: 8px;
    transition: all 0.2s;
    margin: 16px;

    &:hover {
      transform: translateX(5px);
    }
  }
</style>
