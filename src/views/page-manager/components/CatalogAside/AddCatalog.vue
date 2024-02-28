<script setup>
import {saveThemeEditorClass} from "api";

const formRef = ref()
const dialogVisible = ref(false)
const form = reactive({})
const rules = {
  className: [
    {required: true, message: '请输入分类名称', trigger: 'blur'},
  ],
}
const emit = defineEmits(['addSuccess'])
const submit = () => {
  formRef&& formRef.value?.validate(async (valid) => {
    if (valid) {
     const result = await saveThemeEditorClass(toRaw(form))
      emit('addSuccess',{
        ...form,
        ...result
      })
      cancel()
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const cancel = () => {

  formRef?.value?.resetFields()
  dialogVisible.value = false
}
</script>

<template>
  <el-button type="primary" style="width: 70%" @click="dialogVisible=true">
    新增分类
  </el-button>
  <!--  弹窗-->
  <el-dialog title="新增分类" v-model="dialogVisible" width="500">
    <el-form ref="formRef" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="分类名称" prop="className">
        <el-input v-model="form.className" placeholder="请输入分类名称"></el-input>

      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel(formRef)">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
