<script setup lang="tsx">
import { ref, computed, onMounted } from 'vue'
import type { PropType } from 'vue'
import type { FormSchema } from './types'
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
})

const formModel = ref(
  props.schema.reduce(
    (acc: Record<string, any>, item) => {
      acc[item.field] = item.value || null
      return acc
    },
    {} as Record<string, any>,
  ),
)

const formRules = computed(() =>
  props.schema.reduce(
    (acc: Record<string, any>, item) => {
      if (item.rules) {
        acc[item.field] = item.rules
      }
      return acc
    },
    {} as Record<string, any>,
  ),
)
onMounted(() => {
  console.log(props.schema)
})
</script>

<template>
  <AForm
    :model="formModel"
    :rules="formRules"
    :size="'mini'"
    scroll-to-first-error
    :label-col-props="{ span: 5, offset: 0 }"
    :wrapper-col-props="{ span: 19, offset: 0 }"
    :auto-label-width="true"
  >
    <ARow :justify="'start'" :align="'start'">
      <ACol v-for="item in props.schema" :key="item.field" :span="item.colProps?.span || 12">
        <AFormItem
          :field="item.field"
          :label="item.label"
          :validate-trigger="item.validateTrigger || 'input'"
          :required="item.required || false"
        >
          <component
            :is="componentMap['Select']"
            v-model="formModel[item.field]"
            v-bind="item.componentProps"
          />
          <template #extra>
            <div v-if="item.extra">{{ item.extra }}</div>
          </template>
        </AFormItem>
      </ACol>
    </ARow>
  </AForm>
</template>
<!--
<style scoped>
.AFormItem {
  margin-bottom: 16px;
}
</style> -->
