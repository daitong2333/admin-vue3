<template>

<el-table
        ref="dataTableRef"
        :data="pageData"
        highlight-current-row
      >
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column label="通知标题" prop="title" min-width="200" />
        <el-table-column align="center" label="通知类型" width="150">
          <template #default="scope">
            <DictLabel v-model="scope.row.type" :code="'notice_type'" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="发布人" prop="publisherName" width="150" />
        <el-table-column align="center" label="通知等级" width="100">
          <template #default="scope">
            <DictLabel v-model="scope.row.level" code="notice_level" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="通告目标类型" prop="targetType" min-width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.targetType == 1" type="warning">全体</el-tag>
            <el-tag v-if="scope.row.targetType == 2" type="success">指定</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发布状态" min-width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.publishStatus == 0" type="info">未发布</el-tag>
            <el-tag v-if="scope.row.publishStatus == 1" type="success">已发布</el-tag>
            <el-tag v-if="scope.row.publishStatus == -1" type="warning">已撤回</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作时间" width="250">
          <template #default="scope">
            <div class="flex-x-start">
              <span>创建时间：</span>
              <span>{{ scope.row.createTime || "-" }}</span>
            </div>

            <div v-if="scope.row.publishStatus === 1" class="flex-x-start">
              <span>发布时间：</span>
              <span>{{ scope.row.publishTime || "-" }}</span>
            </div>
            <div v-else-if="scope.row.publishStatus === -1" class="flex-x-start">
              <span>撤回时间：</span>
              <span>{{ scope.row.revokeTime || "-" }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
</template>

<script setup lang="ts">
  let pageData = ref([{title:'444'}])
</script>