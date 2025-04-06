<script setup lang="ts">
const schema = [
  {
    field: 'username',
    label: '用户名',
    value: 'admin',
    component: 'AInput',
    rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  },
]
</script>

<template>
  <KForm :schema="schema"></KForm>
</template>
