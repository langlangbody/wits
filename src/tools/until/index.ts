/**
 * 下划线转驼峰
 * @param {*} name 名称
 */
export const camel = (name: string) => name.trim().replace(/_(\w)/g, ($0, $1) => $1.toUpperCase())

/**
 * 驼峰转下划线
 * @param {*} name 名称
 */
export const unCamel = (name: string) => name.trim().replace(/[A-Z]/g, $0 => `_${$0.toLowerCase()}`)

export default {
  camel,
  unCamel,
}
