<script setup lang="ts">
import { ref } from 'vue'
import type { FormSchema } from './components/KForm/src/types'

const schema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input', // Ensure this matches the union type
    formItemProps: {
      rules: {
        required: true,
        validator(value, callback) {
          if (!value) {
            callback('请输入用户名')
          } else if (value.includes('\\')) {
            callback('用户名不能包含反斜杠')
          } else {
            callback()
          }
        },
      },
    },
  },
  {
    field: 'test',
    value: 'admin',
    component: 'Select',
    componentProps: {
      allowClear: true,
      options: [
        { label: '选项1', value: 'option1' },
        { label: '选项2', value: 'option2' },
      ],
      showCancelButton: true,
    },
    formItemProps: {
      rules: {
        required: true,
      },
    },
    colProps: {
      span: 24,
    },
  },
]

const formRef = ref()
const register = (...form: any) => {
  formRef.value = form[1]
  console.log('formRef', formRef.value)
}

const validator = async () => {
  await formRef.value.validate()
}
</script>

<template>
  <KForm :schema="schema" @register="register"></KForm>
  <button @click="validator">111</button>
</template>
