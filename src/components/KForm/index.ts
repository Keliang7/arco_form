import KForm from './src/KForm.vue'
import type { FormSchema, FormSetProps } from './src/types'
export type { FormProps, FormSchema, FormSetProps } from './src/types'

export interface KFormExpose {
  formModel: Recordable
  setValues: (data: Recordable) => void
  setProps: (props: Recordable) => void
  addSchema: (formSchema: FormSchema, index?: number) => void
  setSchema: (schemaProps: FormSetProps[]) => void
  delSchema: (field: string) => void
  getComponentExpose: (field: string) => any
  getFormItemExpose: (field: string) => any
}

export { KForm }
