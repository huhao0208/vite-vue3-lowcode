<script setup>
const props = defineProps({
  config: {
    type: Object,
    default: () => {
      return {}
    }
  },
  columns: {
    type: Object,
    default: () => {
    }
  },

})
const emit = defineEmits()
const tableConfig = computed(()=>{
  return {

    pageNumKey: 'pageNum',
    pageSizeKey: 'pageSize',
    totalKey: 'total',
    listKey: 'list',
    pageNum: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 40, 50],
    layout: 'total, sizes, prev, pager, next, jumper', //sizes, prev, pager, next,->,total
    ...props.config
  }
})

const defaultTableData = {
  list: [],
  total: 0,
  loading: false,
  pageNum: 1,
  pageSize: 10,
}
const tableData = reactive(defaultTableData)

const getList = async () => {
  tableData.loading = true
  const {pageNum,pageSize } = pagination
  const {pageNumKey, pageSizeKey,listApi} = tableConfig.value
  const queryData = {
    ...toRaw(searchData.value),
     [pageNumKey]: pageNum,
     [pageSizeKey]: pageSize,
  }
  console.log(tableConfig,queryData)

  try {
    const result = await listApi(queryData) || {}
    console.log('getList', result)
    const {listKey,totalKey} = tableConfig.value
    tableData.list = result[listKey] || []
    tableData.pageNum = pagination.pageNum
    tableData.total = result[totalKey] || 0
    tableData.pageSize = pagination.pageSize
    tableData.loading = false
  } catch (e) {
    Object.assign(tableData, defaultTableData);
  }

  console.log(tableData, 'tableData')
}


const handleCurrentChange = (val) => {
  emit('current-change', val)
}


const pagination = reactive({
  pageSize: 10,
  pageNum: 1
})



const sData = ref({})

const searchData = computed(() => {
  return {
    ...props.config?.searchData,
    ...toRaw(sData.value)
  }
})
watch(() => searchData.value, (val, old) => {
  if (JSON.stringify(val) === JSON.stringify(old)) return
 nextTick(() => {
   pagination.pageNum = 1
   // pagination.pageSize = 10
   getList()
 })

}, {
  deep: true,
  immediate: true
})
// 暴露方法
defineExpose({
  getList,
  searchData,
  pagination,
  tableData
});
</script>

<template>
  <div style="width:100%">
    <el-table
        v-bind="$attrs"
        ref="singleTableRef"
        :data="tableData?.list"
        highlight-current-row
        style="width: 100%"
        fit
        @current-change="handleCurrentChange"
    >
      <template v-for="item in columns" :key="item.prop">
        <el-table-column       align="center" :prop="item.prop" v-bind="item.attrs">
          <template #default="scope" >
            <slot v-if="item.slot" :name="item.slot" :scope="scope?.row"></slot>
            <div v-else>
            {{scope.row[item.prop]}}
          </div>
          </template>

        </el-table-column>
      </template>
    </el-table>
    <el-pagination
        v-model:current-page="pagination.pageNum"
        v-model:page-size="pagination.pageSize"
        :page-sizes="tableConfig.pageSizes"
        :background="true"
        :layout="tableConfig.layout"
        :total="tableData.total"
        @size-change="getList"
        @current-change="getList"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
