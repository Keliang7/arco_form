import type { ColProps, FormInstance } from '@arco-design/web-vue'

export interface FormSchema {
  /**
   * 唯一标识
   */
  field: string

  /**
   * 标题
   */
  label?: string

  /**
   * col组件属性
   */
  colProps?: ColProps

  /**
   * 表单组件属性，具体可以查看element-plus文档
   */
  componentProps?:
    | InputComponentProps
    | AutocompleteComponentProps
    | InputNumberComponentProps
    | SelectComponentProps
    | SelectV2ComponentProps
    | CascaderComponentProps
    | SwitchComponentProps
    | RateComponentProps
    | ColorPickerComponentProps
    | TransferComponentProps
    | RadioGroupComponentProps
    | RadioButtonComponentProps
    | DividerComponentProps
    | DatePickerComponentProps
    | DateTimePickerComponentProps
    | TimePickerComponentProps
    | InputPasswordComponentProps
    | TreeSelectComponentProps
    | UploadComponentProps
    | JsonEditorProps
    | IAgreeProps
    | any

  /**
   * formItem组件属性，具体可以查看element-plus文档
   */
  formItemProps?: FormInstance['$props']

  /**
   * 渲染的组件名称
   */
  component?: ComponentName

  /**
   * 初始值
   */
  value?: any

  /**
   * 是否隐藏，如果为true，会连同值一同删除，类似v-if
   */
  remove?: boolean

  /**
   * 样式隐藏，不会把值一同删掉，类似v-show
   */
  hidden?: boolean

  /**
   * @returns 远程加载下拉项
   */
  optionApi?: any
}
