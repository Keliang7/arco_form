import type { FormSchema, PlaceholderModel } from '../types'
import { ComponentNameEnum } from '../types'

/**
 *
 * @param schema 对应组件数据
 * @returns 返回提示信息对象
 * @description 用于自动设置placeholder
 */
export const setTextPlaceholder = (schema: FormSchema): PlaceholderModel => {
  const textMap = [
    ComponentNameEnum.INPUT,
    ComponentNameEnum.AUTO_COMPLETE,
    ComponentNameEnum.INPUT_NUMBER,
  ]
  const selectMap = [
    ComponentNameEnum.SELECT,
    ComponentNameEnum.TIME_PICKER,
    ComponentNameEnum.DATE_PICKER,
  ]
  if (textMap.includes(schema?.component as ComponentNameEnum)) {
    return {
      placeholder: '请输入',
    }
  }
  if (selectMap.includes(schema?.component as ComponentNameEnum)) {
    // 一些范围选择器
    const twoTextMap = ['datetimerange', 'daterange', 'monthrange', 'datetimerange', 'daterange']
    if (
      twoTextMap.includes(
        ((schema?.componentProps as any)?.type ||
          (schema?.componentProps as any)?.isRange) as string,
      )
    ) {
      return {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        rangeSeparator: '-',
      }
    } else {
      return {
        placeholder: '请选择',
      }
    }
  }
  return {}
}

export type Recordable<T = any, K extends string | number | symbol = string> = Record<
  K extends null | undefined ? string : K,
  T
>
