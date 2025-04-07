import type { Component } from 'vue'
import {
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  InputTag,
  Mention,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  Textarea,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
} from '@arco-design/web-vue'
import type { ComponentName } from '../types'

type Recordable<T = unknown, K extends string | number | symbol = string> = Record<K extends null | undefined ? string : K, T>

const componentMap: Recordable<Component, ComponentName> = {
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  InputTag,
  Mention,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  Textarea,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
}

export { componentMap }
