<script setup lang="tsx">
import { ref, onMounted } from 'vue'
import type { PropType } from 'vue'
import type { FormSchema } from './types'
import { componentMap } from './helper/componentMap'
import type { FormInstance } from '@arco-design/web-vue'

const props = defineProps({
  schema: {
    type: Array as PropType<FormSchema[]>,
    default: () => [],
  },
  isCol: {
    type: Boolean,
    default: true,
  },
  model: {
    type: Object,
    default: () => ({}),
  },
})

const formModel = ref(
  props.schema.reduce(
    (acc: Record<string, unknown>, item) => {
      acc[item.field] = item.value || null
      return acc
    },
    {} as Record<string, unknown>,
  ),
)
const formRef = ref<FormInstance>()
onMounted(() => {
  console.log(props.schema)
})
</script>

<template>
  <AForm
    ref="formRef"
    :model="formModel"
    :size="'large'"
    scroll-to-first-error
    :label-col-props="{ span: 5, offset: 0 }"
    :wrapper-col-props="{ span: 19, offset: 0 }"
    :auto-label-width="true"
  >
    <ARow :justify="'start'" :align="'start'">
      <ACol v-for="item in props.schema" :key="item.field" :span="item.colProps?.span || 12">
        <AFormItem
          :style="{ marginBottom: '0' }"
          :label-col-style="{ backgroundColor: 'yellow' }"
          :field="item.field"
          :label="item.label"
          :rules="item.rules"
        >
          <component
            :is="item.component ? componentMap[item.component] : 'Input'"
            v-model="formModel[item.field]"
            v-bind="item.componentProps"
          />
        </AFormItem>
      </ACol>
    </ARow>
  </AForm>
</template>
