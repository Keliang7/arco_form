<script setup lang="ts">
import { ref } from 'vue'
import type { FormSchema } from './components/KForm/src/types'
import { useKForm } from './hooks/useKForm'

const isHidden = ref(false)

const model = ref<Recordable>({
  username: 'test',
  test: '123',
  // img: [
  //   {
  //     uid: '-1',
  //     name: 'hahhahahahaha.png',
  //     url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
  //   },
  // ],
})
const schema = ref<FormSchema[]>([
  {
    field: 'username',
    label: '用户名',
    component: 'Input', // Ensure this matches the union type
    hidden: isHidden.value,
    formItemProps: {
      extra: '123',

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
  {
    field: 'img',
    label: '考试图片：',
    component: 'Upload',
    formItemProps: {
      rules: {
        required: true,
      },
      extra: '只支持.jpg .png .gif格式',
    },
    componentProps: {
      // v-model:file-list="fileList"
      listType: 'picture-card',
      autoUpload: false,
      imagePreview: true,
      accept: '.jpg,.png,.gif',
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

const log = () => {
  console.log('model', model.value)
}

const setmodelvalue = () => {
  model.value.username = '123'
}

const slot = {
  prepend: 'prepend',
  append: 'append',
  prefix: 'prefix',
  suffix: 'suffix',
}
</script>

<template>
  <div class="test app">
    <AInput v-bind="slot">
      <!-- <template #append>append</template>
      <template #prepend>prepend</template>
      <template #suffix>suffix</template>
      <template #prefix>perfix</template> -->
    </AInput>
    <KForm
      :schema="schema"
      :model="model"
      :auto-set-placeholder="true"
      @register="formRegister"
    ></KForm>
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

    <button @click="log">clog model</button>
    <button @click="setmodelvalue">setmodelvalue</button>
  </div>
</template>
