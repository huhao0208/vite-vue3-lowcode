<script setup>
import {MoreFilled, Plus, Delete, Edit, View, Hide, InfoFilled} from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from 'element-plus'
import TableItemEdit from "views/page-manager/components/TableItemEdit.vue";
const pStore = useCustomPage()
const emit = defineEmits()
const props = defineProps({
  details: {
    type: Object,
    default: () => {
      return {}
    }
  },
})

const emitUpdate = () => {
  ElMessage({
    type: "success",
    message: "操作成功"
  });
  emit('success', true)
}

const deleteConfirm = () => {
  ElMessageBox.confirm(
      '删除后不可恢复，是否删除？',
      '删除',
      {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        customStyle: {
          width: '250px'
        }
      }
  )
      .then(async () => {
        console.log(props.details, '删除确认了')
        await deleteThemeEditorClass({
          id: props.details.id
        })
        // 判断当前是否为选中状态 如果为选中状态 则移除classDetail
        if (props.details.id === pStore.classId){
          pStore.setClassDetail('')
        }
        emitUpdate()

      })
      .catch(() => {

      })
}

// 操作列表
const actions = [
  {
    label: '删除',
    icon: Delete,
    disabled: false,
    action: 'delete',

  },
  {
    label: '编辑',
    icon: Edit,
    disabled: true,
    action: 'edit'
  },

  // {
  //   label: '显示',
  //   icon: View,
  //   disabled: true,
  //   action: 'on'
  // }
]
const handleCommand = function (e) {
  switch (e) {
    case 'create':
      console.log('新建')
      break;
    case 'delete':
      deleteConfirm()
      break;
    case 'edit':
      console.log('编辑')
      break;

    default:
      break;
  }
}

const dialogVisible = ref(false)

const tableUpdate = function (e) {
  emit('updateTable', e)
}

</script>


<template>
  <div>
    <div class="catalog_btns">
      <el-dropdown size="large" trigger="click" @command="handleCommand">

        <div class="el_icon" @click.stop="" v-if="details.id!==0">
          <MoreFilled style="width: 1em; height: 1em;transform: rotate(90deg)"/>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :ref="item.action+'Ref'" v-for="item in actions" :key="item.action" :command="item.action"
                              :disabled="item.disabled" :icon="item.icon">
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div class="el_icon" @click="dialogVisible=true">
        <Plus style="width: 1em; height: 1em;"/>
      </div>
    </div>
    <TableItemEdit destroy-on-close
                   @success="tableUpdate"
                   :classId="details.id"
                   type="add" title="新增" width="500" v-model="dialogVisible"></TableItemEdit>
  </div>
</template>

<style scoped lang="scss">
.catalog_btns {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .el_icon {
    padding: 10px;
    border: 1px solid transparent;
    border-radius: 5px;
    //color: red;

    &:hover {
      border: 1px solid #ccc;
      background-color: rgba(74, 87, 89, 0.11);
    }
  }
}
</style>
