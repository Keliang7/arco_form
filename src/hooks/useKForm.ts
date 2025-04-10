import { ref, unref, nextTick } from 'vue'
import type { ComponentInternalInstance } from 'vue'
import type { Form as AForm, FormItem as AFormItem } from '@arco-design/web-vue'
import type { FormProps, FormSchema, FormSetProps, KFormExpose } from '@/components/KForm'
import { isEmptyVal, isObject } from '@/utils/is'

export const useKForm = () => {
  // From实例
  const formRef = ref<ComponentInternalInstance & { exposed: KFormExpose }>()

  // AForm实例
  const aFormRef = ref<InstanceType<typeof AForm>>()

  /**
   * @param KFormInternal KForm组件内部实例
   * @param aRef AForm实例
   */
  const register = (
    KFormInternal: ComponentInternalInstance & { exposed: KFormExpose },
    aRef: InstanceType<typeof AForm>,
  ) => {
    formRef.value = KFormInternal
    aFormRef.value = aRef
  }

  const getForm = async () => {
    await nextTick()
    const form = unref(formRef)
    if (!form) {
      console.error('The KForm is not registered. Please use the register method to register')
    }
    return form
  }

  // 一些内置的方法
  const methods = {
    /**
     * @description 设置form组件的props
     * @param props form组件的props
     */
    setProps: async (props: FormProps = {}) => {
      const form = await getForm()
      form?.exposed?.setProps(props)
      if (props.model) {
        form?.exposed?.setValues(props.model)
      }
    },

    /**
     * @description 设置form的值
     * @param data 需要设置的数据
     */
    setValues: async (data: Recordable) => {
      const form = await getForm()
      form?.exposed?.setValues(data)
    },

    /**
     * @description 新增schema
     * @param formSchema 需要新增数据
     * @param index 在哪里新增
     */
    addSchema: async (formSchema: FormSchema, index?: number) => {
      const form = await getForm()
      form?.exposed?.addSchema(formSchema, index)
    },

    /**
     * @description 设置schema
     * @param schemaProps 需要设置的schemaProps
     */
    setSchema: async (schemaProps: FormSetProps[]) => {
      const form = await getForm()
      form?.exposed?.setSchema(schemaProps)
    },

    /**
     * @description 删除schema
     * @param field 删除哪个数据
     */
    delSchema: async (field: string) => {
      const form = await getForm()
      form?.exposed?.delSchema(field)
    },

    /**
     * @description 获取表单数据
     * @returns form data
     */
    getFormData: async <T = Recordable>(filterEmptyVal = true): Promise<T> => {
      const form = await getForm()
      console.log(form)
      const model = form?.exposed?.formModel as any
      console.log(model)
      if (filterEmptyVal) {
        // 使用reduce过滤空值，并返回一个新对象
        return Object.keys(model).reduce((prev, next) => {
          const value = model[next]
          if (!isEmptyVal(value)) {
            if (isObject(value)) {
              if (Object.keys(value).length > 0) {
                ;(prev as Record<string, any>)[next] = value
              }
            } else {
              ;(prev as Record<string, any>)[next] = value
            }
          }
          return prev
        }, {}) as T
      } else {
        return model as T
      }
    },

    /**
     * @description 获取表单组件的实例
     * @param field 表单项唯一标识
     * @returns component instance
     */
    getComponentExpose: async (field: string) => {
      const form = await getForm()
      return form?.exposed?.getComponentExpose(field)
    },

    /**
     * @description 获取formItem组件的实例
     * @param field 表单项唯一标识
     * @returns formItem instance
     */
    getFormItemExpose: async (field: string) => {
      const form = await getForm()
      return form?.exposed?.getFormItemExpose(field) as InstanceType<typeof AFormItem>
    },

    /**
     * @description 获取AForm组件的实例
     * @returns AForm instance
     */
    getAFormExpose: async () => {
      await getForm()
      return unref(aFormRef)
    },

    getFormExpose: async () => {
      await getForm()
      return unref(formRef)
    },
  }

  return {
    formRegister: register,
    formMethods: methods,
  }
}
