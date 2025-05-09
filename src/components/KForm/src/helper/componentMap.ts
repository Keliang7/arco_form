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
