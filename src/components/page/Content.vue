<template>
  <div class="content">
    <div class="header">
      <h2 class="title">{{ contentConfig.header.title }}</h2>
      <div class="right">
        <el-button type="primary" @click="onCreate" v-if="pms.isCreate">{{ contentConfig.header.btnText }}</el-button>
      </div>
    </div>

    <div class="table">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        @selection-change="onSelectionChange"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.tableColumns" :key="item.prop">
          <template v-if="item.type === 'date'">
            <el-table-column v-bind="item" align="center" #default="{ row }">
              {{ formatUTC(row[item.prop]) }}
            </el-table-column>
          </template>

          <template v-else-if="item.type === 'operate'">
            <el-table-column class="operate-column" v-bind="item" align="center" #default="{ row }">
              <el-button type="primary" link icon="Edit" size="small" @click="onEdit(row)" v-if="pms.isUpdate"
                >编辑</el-button
              >
              <el-button type="danger" link icon="Delete" size="small" @click="onRemove(row)" v-if="pms.isDelete"
                >删除</el-button
              >
            </el-table-column>
          </template>

          <template v-else-if="item.type === 'custom'">
            <el-table-column #default="scope" v-bind="item" align="center">
              <slot :name="item.slotName" v-bind="scope"></slot>
            </el-table-column>
          </template>

          <template v-else>
            <el-table-column v-bind="item" align="center" />
          </template>
        </template>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        small
        layout="sizes, prev, pager, next, jumper, total"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

import { formatUTC } from '@/utils/format-date'
import useSystemStore from '@/store/system'
import isPermission from '@/utils/isPermission'

interface IProps {
  contentConfig: {
    pageName: string
    header: {
      title: string
      btnText: string
    }
    tableColumns: any[]
    childrenTree?: any
  }
}
const props = defineProps<IProps>()
defineExpose({ fetchPageList })
const emit = defineEmits(['createClick', 'editClick'])

// 获取权限
interface IPms {
  isCreate: boolean
  isDelete: boolean
  isUpdate: boolean
  isQuery: boolean
}
const pms = reactive<IPms>({
  isCreate: isPermission(`${props.contentConfig.pageName}:create`),
  isDelete: isPermission(`${props.contentConfig.pageName}:delete`),
  isUpdate: isPermission(`${props.contentConfig.pageName}:update`),
  isQuery: isPermission(`${props.contentConfig.pageName}:query`)
})

const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSizes = [10, 15, 20]
const pageSize = ref(pageSizes[0])

// 监听storeAction，重置currentPage
systemStore.$onAction(({ name, after }) => {
  const watchActions = ['deletePageByIdAction', 'createPageAction', 'updatePageByIdAction']
  if (watchActions.includes(name)) {
    after(() => (currentPage.value = 1))
  }
})

fetchPageList()
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 多选事件
const selectionList = ref<any[]>([])
function onSelectionChange(val: any[]) {
  selectionList.value = val
}

// 分页事件
function handleSizeChange() {
  fetchPageList()
}
function handleCurrentChange() {
  fetchPageList()
}

// 用户操作
async function onRemove(row: any) {
  currentPage.value = 1

  const { code, msg } = await systemStore.deletePageByIdAction(props.contentConfig.pageName, row.id)
  if (code === 1) {
    ElMessage.success(msg)
  } else {
    ElMessage.error(msg)
  }
  fetchPageList()
}
function onCreate() {
  emit('createClick')
}
function onEdit(row: any) {
  emit('editClick', row)
}

// 请求页面列表
function fetchPageList(formData: any = {}) {
  if (!pms.isQuery) return

  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const options = { size, offset, ...formData }

  systemStore.postPageListAction(props.contentConfig.pageName, options)
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
