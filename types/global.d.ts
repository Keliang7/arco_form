export {}
declare global {
  declare type Recordable<T = unknown, K extends string | number | symbol = string> = Record<
    K extends null | undefined ? string : K,
    T
  >
}
