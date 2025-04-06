<script setup lang="tsx">
import { ref } from 'vue'
import type { FormSchema } from './types'
/**
 * arcodesign的form
 * 1.model必填，是form的数据
 * 2.size: 'mini' | 'small' | 'default' | 'large' 样式的大小
 * 3.关于layout的问题
 *    涉及到相关的属性
 *        label-col-props
 *        wrapper-col-props
 *        auto-col-props
 *        label-align
 *    这些仅仅在 layout="horizontal" 下生效
 * 4.scroll-to-first-error
 *   是否滚动到第一个错误的表单项
 */

const formModel = ref({
  name: '',
  age: '',
  sex: '',
})
const props = defineProps<FormSchema>()
</script>
<template>
  <AForm
    :model="formModel"
    :size="'mini'"
    scroll-to-first-error
    :label-col-props="{ span: 5, offset: 0 }"
    :wrapper-col-props="{ span: 19, offset: 0 }"
    :auto-label-width="true"
  >
    <ARow :justify="'start'" :align="'start'">
      <ACol :span="12">
        <AFormItem field="name" label="Username" validate-trigger="input" required>
          <AInput v-model="formModel.name" placeholder="please enter your username..." />
          <template #extra>
            <div>Used to login</div>
          </template>
        </AFormItem>
      </ACol>
      <ACol :span="12">
        <AFormItem field="age" label="Age" validate-trigger="input" required>
          <AInput v-model="formModel.age" placeholder="please enter your age..." />
          <template #extra>
            <div>Used to login</div>
          </template>
        </AFormItem>
      </ACol>
      <ACol>
        <AFormItem field="sex" label="Sex" validate-trigger="input" required>
          <AInput v-model="formModel.sex" placeholder="please enter your sex..." />
          <template #extra>
            <div>Used to login</div>
          </template>
        </AFormItem>
      </ACol>
    </ARow>
  </AForm>
</template>
<style scoped></style>
