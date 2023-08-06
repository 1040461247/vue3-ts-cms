<template>
  <div class="content">
    <div class="header">
      <h2 class="title">用户列表</h2>
      <div class="right">
        <el-button type="primary" @click="onCreateUser">新建用户</el-button>
      </div>
    </div>

    <div class="table">
      <el-table :data="userList" border style="width: 100%" @selection-change="onSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />

        <el-table-column prop="name" label="用户名" align="center" />
        <el-table-column prop="realname" label="真实姓名" align="center" />
        <el-table-column prop="cellphone" label="手机号码" align="center" />
        <el-table-column prop="enable" label="状态" width="80" align="center" v-slot="{ row }">
          <el-tag class="ml-2" :type="row.enable ? 'success' : 'danger'">{{ row.enable ? '启用' : '禁用' }}</el-tag>
        </el-table-column>
        <el-table-column prop="createAt" label="创建时间" width="220" align="center" #default="{ row }">
          {{ formatUTC(row.createAt) }}
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" width="220" align="center" #default="{ row }">
          {{ formatUTC(row.updateAt) }}
        </el-table-column>

        <el-table-column class="operate-column" width="130" label="操作" align="center" #default="{ row }">
          <el-button type="primary" link icon="Edit" size="small" @click="onEditUser(row)">编辑</el-button>
          <el-button type="danger" link icon="Delete" size="small" @click="onRemoveUser(row)">删除</el-button>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        small
        layout="sizes, prev, pager, next, jumper, total"
        :total="userTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

import { formatUTC } from '@/utils/format-date'
import useSystemStore from '@/store/system'

defineExpose({ fetchUserList })
const emit = defineEmits(['createUser', 'editUser'])

const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSizes = [10, 15, 20]
const pageSize = ref(pageSizes[0])
fetchUserList()
const { userList, userTotalCount } = storeToRefs(systemStore)

// 多选事件
const selectionList = ref<any[]>([])
function onSelectionChange(val: any[]) {
  selectionList.value = val
}

// 分页事件
function handleSizeChange() {
  fetchUserList()
}
function handleCurrentChange() {
  fetchUserList()
}

// 用户操作
async function onRemoveUser(row: any) {
  const { code, msg } = await systemStore.deleteUserByIdAction(row.id)
  if (code === 1) {
    ElMessage.success(msg)
  } else {
    ElMessage.error(msg)
  }
  fetchUserList()
}
function onCreateUser() {
  emit('createUser')
}
function onEditUser(row: any) {
  emit('editUser', row)
}

// 请求用户列表
function fetchUserList(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const options = { size, offset, ...formData }

  systemStore.postUserListAction(options)
}
</script>

<style lang="less" scoped>
.content {
  margin-bottom: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 3px;
}

.header {
  display: flex;
  margin-bottom: 10px;

  .title {
    flex: 1;
    font-size: 20px;
  }
}

.table {
  margin-bottom: 10px;
}

.pagination {
  display: flex;
  justify-content: end;
}
</style>
