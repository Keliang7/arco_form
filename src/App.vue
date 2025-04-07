<script setup lang="ts">
import type { FormSchema } from './components/KForm/src/types'

const schema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input', // Ensure this matches the union type
    rules: [
      {
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
    ],
  },
  {
    field: 'test',
    label: '用户名',
    value: 'admin',
    component: 'Select',
    componentProps: {
      options: [
        { label: '选项1', value: 'option1' },
        { label: '选项2', value: 'option2' },
      ],
      showCancelButton: true,
    },
    rules: [
      {
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
    ],
    colProps: {
      span: 24,
    },
  },
]
</script>

<template>
  <KForm :schema="schema"></KForm>
</template>
