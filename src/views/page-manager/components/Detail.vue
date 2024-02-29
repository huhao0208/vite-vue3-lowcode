<script setup>

import {deleteThemeEditorDetail, updateThemeEditorDetail} from "api";

const pStore = useCustomPage()
// 表格配置
const columns = [
  {
    prop: 'name',
    attrs: {
      label: '页面名称',
      // width: '120',
    }
  },
  {
    prop: 'url',
    slot: 'url',
    attrs: {
      label: '页面链接',
      // width: '120',
    }
  },
  {
    prop: 'address',
    slot: 'handler',
    attrs: {
      label: '操作',
      // width: '120',
    }
  }
]
// 删除数据
const deleteHandler = async (id) => {
  await deleteThemeEditorDetail({
    id: id
  })
  ElMessage.success('操作成功')
  tableReload()
}
// 更新table数据
const tableRef = ref(null)
const tableReload = function () {
  console.log(tableRef.value.getList, 'tableRef')
  tableRef.value?.getList()
}
// 更新数据
const updateHandler = async (item) => {
  await updateThemeEditorDetail(item)
  ElMessage.success('操作成功')
  tableReload()
}

const clientPageLink = (row) => {
  return `https://pre-qiyue.cmread.com/client/standalone/index.html#/theme-page/${row.url}`
}


defineExpose({
  tableReload
})
</script>

<template>
  <div class="detail_container">
    <ProTable
        v-if="!!pStore.classId ||pStore.classId === 0"
        ref="tableRef"
        :config="{
            listApi:listThemeEditorDetail,
            searchData:{classId:pStore.classId},
            listKey:'voList',
            totalKey:'total',
            key:'id'
        }"
        :columns="columns"
    >
      <template #url="{scope}">
        <div>
          {{clientPageLink(scope)}}
          <el-button v-copy="clientPageLink(scope)">复制</el-button>
        </div>
      </template>
      <template #handler="{scope={}}">

        <el-button link type="primary" @click="updateHandler({
        ...scope,
        status:scope.status === 1 ? 0 : 1
        })">
          {{ scope.status === 1 ? '下架' : '上架' }}
        </el-button>
        <el-button link type="primary">复制</el-button>
        <el-button link type="primary">查看</el-button>
        <el-button link type="primary" @click="router.push(`/visual-editor/${scope.url}?id=${scope.id}`)">编辑
        </el-button>
        <el-popconfirm title="删除后无法恢复，是否删除？" confirm-button-text="是"
                       cancel-button-text="否"
                       @confirm="deleteHandler(scope.id)">
          <template #reference>
            <el-button link type="primary">删除</el-button>
          </template>
        </el-popconfirm>

      </template>

    </ProTable>
  </div>
</template>

<style scoped lang="scss">
.detail_container {

  padding: 10px;
}
</style>
