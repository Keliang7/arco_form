<script setup lang="tsx">
import { ref, unref, onMounted, getCurrentInstance } from 'vue'
import type { PropType } from 'vue'
import type { FormSchema } from './types'
import { componentMap } from './helper/componentMap'
import type { FormInstance as AFormInstance } from '@arco-design/web-vue'

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
  autoSetPlaceholder: {
    type: Boolean,
    default: true,
  },
  labelWidth: {
    type: String,
    default: '100px',
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
const aFormRef = ref<AFormInstance>()

const emit = defineEmits(['register'])
onMounted(() => {
  const instance = getCurrentInstance()
  emit('register', unref(instance), unref(aFormRef))
})
</script>

<template>
  <AForm
    ref="aFormRef"
    :model="formModel"
    :size="'large'"
    scroll-to-first-error
    :label-col-props="{ span: 5, offset: 0 }"
    :wrapper-col-props="{ span: 19, offset: 0 }"
    :auto-label-width="true"
  >
    <ARow :justify="'start'" :align="'start'">
      <template v-for="item in props.schema" :key="item.field">
        <ACol v-if="!item.remove" v-show="!item.hidden" :span="item.colProps?.span || 24">
          <AFormItem
            :style="{ marginBottom: '0' }"
            :field="item.field"
            :label="item.label || item.field"
            v-bind="item.formItemProps"
          >
            <component
              :is="item.component ? componentMap[item.component] : 'Input'"
              v-model="formModel[item.field]"
              v-bind="item.componentProps"
            />
          </AFormItem>
        </ACol>
      </template>
    </ARow>
  </AForm>
</template>
