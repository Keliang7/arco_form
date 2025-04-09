<script setup lang="tsx">
import { ref, unref, computed, onMounted, getCurrentInstance } from 'vue'
import type { PropType } from 'vue'
import type { FormInstance as AFormInstance } from '@arco-design/web-vue'
import type { FormProps, FormSchema } from './types'
import type { Recordable } from './helper'
import { componentMap } from './helper/componentMap'

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
    // default: '100px',
  },
})

const emit = defineEmits(['register'])

const formModel = ref(props.model)

const mergeProps = ref<FormProps>({})

const getProps = computed(() => {
  const propsObj = { ...props }
  Object.assign(propsObj, unref(mergeProps))
  return propsObj
})

const aFormRef = ref<AFormInstance>()

onMounted(() => {
  const instance = getCurrentInstance()
  emit('register', unref(instance), unref(aFormRef))
})

// 对表单赋值
const setValues = (data: Recordable = {}) => {
  formModel.value = Object.assign(unref(formModel), data)
}

// 设置KForm属性
const setProps = (props: FormProps = {}) => {
  mergeProps.value = Object.assign(unref(mergeProps), props)
}

// add schema
const addSchema = (formSchema: FormSchema, index?: number) => {
  const { schema } = unref(getProps)
  if (index !== void 0) {
    schema.splice(index, 0, formSchema)
    return
  }
  schema.push(formSchema)
}

defineExpose({
  setValues,
  setProps,
  addSchema,
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
    :auto-label-width="getProps.labelWidth ? false : true"
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
