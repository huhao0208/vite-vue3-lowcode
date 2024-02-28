<script setup>
// import {updateThemeEditorDetail} from "api";
const emit = defineEmits()
const props = defineProps({
  type: {
    type: String,
    default: 'add'
  },
  classId: {
    type: [String, Number],
    default: ''
  },

})

const form = ref({})
const formRef = ref()
const rules = {
  name: [
    {required: true, message: '请输入名称', trigger: 'blur'},
    {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
  ],
  url: [
    {required: true, message: '请输入描述', trigger: 'blur'},
    {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'},
  ]
}

const closeHandler = () => {
  emit('update:modelValue', false)
}
const submit = () => {

  formRef.value.validate((valid) => {

    if (!valid) return
    const api = props.type === 'add' ? saveThemeEditorDetail : updateThemeEditorDetail

    api({
      classId: props.classId,
      ...toRaw(form.value),

    })
    emit('success',true)
    closeHandler()
  })
}




</script>

<template>
  <el-dialog v-bind="$attrs">
    <el-form ref="formRef" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称"/>
      </el-form-item>
      <el-form-item label="路径" prop="url">
        <el-input @input="value=> value.replace(/[^a-zA-Z-]/g, '')" v-model="form.url" placeholder="请输入路径"/>
      </el-form-item>

    </el-form>

    <template #footer>
      <el-button @click="closeHandler">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </template>

  </el-dialog>
</template>

<style scoped lang="scss">

</style>
