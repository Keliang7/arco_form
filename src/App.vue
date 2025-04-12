<script setup lang="ts">
import { ref } from 'vue'
import type { FormSchema } from './components/KForm/src/types'
import { useKForm } from './hooks/useKForm'

const isHidden = ref(false)
const schema = ref<FormSchema[]>([
  {
    field: 'username',
    label: '用户名',
    component: 'Input', // Ensure this matches the union type
    hidden: isHidden.value,
    formItemProps: {
      labelColStyle: {
        backgroundColor: 'rgb(202,203,205)',
      },
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
    componentProps: {
      placeholder: '请输入用户名',
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
      labelColStyle: {
        backgroundColor: 'rgb(242,243,245)',
      },
      rules: {
        required: true,
      },
    },
    colProps: {
      span: 12,
    },
  },
])

const { formRegister, formMethods } = useKForm()
const {
  getFormExpose,
  getAFormExpose,
  setValues,
  setProps,
  addSchema,
  setSchema,
  delSchema,
  getComponentExpose,
  getFormItemExpose,
  getFormData,
} = formMethods

const getForm = async () => {
  const form = await getFormExpose()
  console.log('form', form)
}
const getAFrom = async () => {
  const aform = await getAFormExpose()
  console.log('aform', aform)
}
const setFormValues = async () => {
  await setValues({
    username: 'admin',
    test: 'option1',
  })
}
const setFormProps = async () => {
  await setProps({
    labelWidth: '200px',
  })
}
const addFormSchema = async () => {
  await addSchema(
    {
      field: '1111',
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
        labelColStyle: {
          backgroundColor: 'rgb(242,243,245)',
        },
        rules: {
          required: true,
        },
      },
      colProps: {
        span: 12,
      },
    },
    1,
  )
}
const setFormSchema = async () => {
  await setSchema([
    {
      field: 'username',
      path: 'label',
      value: '200px',
    },
  ])
}
const delFormSchema = async () => {
  await delSchema('username')
}

const getComponentExposeFn = async () => {
  const fieldComponent = await getComponentExpose('username')
  console.log('fieldComponent', fieldComponent)
}

const getFormItemExposeFn = async () => {
  const formItemComponent = await getFormItemExpose('username')
  console.log('formItemComponent', formItemComponent)
}

const getFormValues = async () => {
  const formValues = await getFormData()
  console.log('formValues', formValues)
}
</script>

<template>
  <div class="test app">
    <KForm :schema="schema" :auto-set-placeholder="true" @register="formRegister"></KForm>
    <button @click="getForm">getForm</button>
    <button @click="getAFrom">getAFrom</button>
    <button @click="setFormValues">setFormValues</button>
    <button @click="setFormProps">setFormProps</button>
    <button @click="addFormSchema">addFormSchema</button>
    <button @click="setFormSchema">setFormSchema</button>
    <button @click="delFormSchema">delFormSchema</button>
    <button @click="getComponentExposeFn">getComponentExposeFn</button>
    <button @click="getFormItemExposeFn">getFormItemExposeFn</button>
    <button @click="getFormValues">getFormValues</button>
  </div>
</template>
