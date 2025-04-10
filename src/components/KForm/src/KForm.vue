<script setup lang="tsx">
import { ref, unref, computed, onMounted, getCurrentInstance } from 'vue'
import type { PropType } from 'vue'
import type { FormInstance as AFormInstance } from '@arco-design/web-vue'
import type { FormProps, FormSchema, FormSetProps } from './types'
import { ComponentNameEnum } from './types'
import { get, set } from 'lodash-es'
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

// AForm实例
const aFormRef = ref<AFormInstance>()

const formModel = ref(props.model)

// 用于合并和管理porps的变量
const mergeProps = ref<FormProps>({})

const getProps = computed(() => {
  const propsObj = { ...props }
  Object.assign(propsObj, unref(mergeProps))
  return propsObj
})

// 存储表单实例(Input,Select等)
const fieldComponents = ref<{ [key: string]: any }>({})

// 存储AFormItem实例
const aFormItemComponents = ref<{ [key: string]: any }>({})

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

// set schema
const setSchema = (schemaProps: FormSetProps[]) => {
  const { schema } = unref(getProps)
  for (const v of schema) {
    for (const item of schemaProps) {
      if (v.field === item.field) {
        set(v, item.path, item.value)
      }
    }
  }
}

// delete schema
const delSchema = (field: string) => {
  const { schema } = unref(getProps)

  const index = schema.findIndex((v: FormSchema) => v.field === field)
  if (index > -1) {
    schema.splice(index, 1)
  }
}

// get options from tree_select and transfer
// const getOptions = async (fn: () => Promise<any>, item: FormSchema) => {
//   const options = await fn()
//   setSchema([
//     {
//       field: item.field,
//       path:
//         item.component === ComponentNameEnum.TREE_SELECT ||
//         item.component === ComponentNameEnum.TRANSFER
//           ? 'componentProps.data'
//           : 'componentProps.options',
//       value: options,
//     },
//   ])
// }

// 设置表单实例(Input,Select等)
const setComponentRefMap = (ref: any, field: string) => {
  fieldComponents.value[field] = ref
}

/**
 * @description: 获取表单组件实例
 * @param field 表单字段
 */
const getComponentExpose = (field: string) => {
  return unref(fieldComponents)[field]
}

// 设置formItem实例
const setFormItemRefMap = (ref: any, filed: string) => {
  aFormItemComponents.value[filed] = ref
}

/**
 * @description: 获取formItem实例
 * @param field 表单字段
 */
const getFormItemExpose = (field: string) => {
  return unref(aFormItemComponents)[field]
}

defineExpose({
  formModel,
  setValues,
  setProps,
  addSchema,
  setSchema,
  delSchema,
  getComponentExpose,
  getFormItemExpose,
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
            :ref="(el: any) => setFormItemRefMap(el, item.field)"
            :label="item.label || item.field"
            v-bind="item.formItemProps"
          >
            <component
              :is="item.component ? componentMap[item.component] : 'Input'"
              :ref="(el:any) => setComponentRefMap(el, item.field)"
              v-model="formModel[item.field]"
              v-bind="item.componentProps"
            />
          </AFormItem>
        </ACol>
      </template>
    </ARow>
  </AForm>
</template>
