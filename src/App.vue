<script setup lang="ts">
import type { FormSchema } from './components/KForm/src/types'

const schema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    value: 'admin',
    component: 'Input', // Ensure this matches the union type
    rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  },
]
</script>

<template>
  <KForm :schema="schema"></KForm>
</template>
