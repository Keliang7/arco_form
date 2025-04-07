import KForm from './src/KForm.vue'
import type { FormSchema } from './src/types/'

export interface FormExpose {
  setValues: (data: Recordable) => void
  setProps: (props: Recordable) => void
  delSchema: (field: string) => void
  addSchema: (formSchema: FormSchema, index?: number) => void
  // setSchema: (schemaProps: FormSetProps[]) => void
  formModel: Recordable
  getComponentExpose: (field: string) => any
  getFormItemExpose: (field: string) => any
}

export { KForm }
