import type {
  ColProps,
  AutoCompleteInstance,
  CascaderInstance,
  CheckboxInstance,
  DatePickerInstance,
  InputInstance,
  InputNumberInstance,
  InputTagInstance,
  MentionInstance,
  RadioInstance,
  RateInstance,
  SelectInstance,
  SliderInstance,
  SwitchInstance,
  TextareaInstance,
  TimePickerInstance,
  TransferInstance,
  TreeSelectInstance,
  UploadInstance,
  FormItemInstance,
} from '@arco-design/web-vue'

export interface PlaceholderModel {
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  rangeSeparator?: string
}

export enum ComponentNameEnum {
  AUTO_COMPLETE = 'AutoComplete',
  CASCADER = 'Cascader',
  CHECKBOX = 'Checkbox',
  DATE_PICKER = 'DatePicker',
  INPUT = 'Input',
  INPUT_NUMBER = 'InputNumber',
  INPUT_TAG = 'InputTag',
  MENTION = 'Mention',
  RADIO = 'Radio',
  RATE = 'Rate',
  SELECT = 'Select',
  SLIDER = 'Slider',
  SWITCH = 'Switch',
  TEXTAREA = 'Textarea',
  TIME_PICKER = 'TimePicker',
  TRANSFER = 'Transfer',
  TREE_SELECT = 'TreeSelect',
  UPLOAD = 'Upload',
}

export interface FormSetProps {
  field: string
  path: string
  value: any
}

type CamelCaseComponentName = keyof typeof ComponentNameEnum extends infer K
  ? K extends string
    ? K extends `${infer A}_${infer B}`
      ? `${Capitalize<Lowercase<A>>}${Capitalize<Lowercase<B>>}`
      : Capitalize<Lowercase<K>>
    : never
  : never

export type ComponentName = CamelCaseComponentName

export interface FormSetProps {
  field: string
  path: string
  value: any
}
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
   * 初始值
   */
  value?: unknown

  /**
   * 渲染的组件名称
   */
  component?: ComponentName

  /**
   * 表单组件属性，具体可以查看element-plus文档
   */
  componentProps?:
    | AutoCompleteInstance['$props']
    | CascaderInstance['$props']
    | CheckboxInstance['$props']
    | DatePickerInstance['$props']
    | InputInstance['$props']
    | InputNumberInstance['$props']
    | InputTagInstance['$props']
    | MentionInstance['$props']
    | RadioInstance['$props']
    | RateInstance['$props']
    | SelectInstance['$props']
    | SliderInstance['$props']
    | SwitchInstance['$props']
    | TextareaInstance['$props']
    | TimePickerInstance['$props']
    | TransferInstance['$props']
    | TreeSelectInstance['$props']
    | UploadInstance['$props']

  /**
   * formItem组件属性，具体可以查看arco-design文档
   */
  formItemProps?: FormItemInstance['$props']

  /**
   * col组件属性
   * row组件固定24格
   */
  colProps?: ColProps

  /**
   * 是否隐藏，如果为true，会连同值一同删除，类似v-if
   */
  remove?: boolean

  /**
   * 样式隐藏，不会把值一同删掉，类似v-show
   */
  hidden?: boolean
}
export interface FormProps {
  schema?: FormSchema[]
  isCol?: boolean
  model?: Recordable
  autoSetPlaceholder?: boolean
  labelWidth?: string
  [key: string]: any
}
