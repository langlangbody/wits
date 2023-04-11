/*
 * @Author: xll
 * @Date: 2021-05-24 14:39:58
 * @LastEditors: xll
 * @LastEditTime: 2021-05-28 11:03:50
 * @FilePath: /vue3-page/tools/md-tool/ast.ts
 */

import program from 'ast-query'

const attribute = (properties) => {
  return properties.reduce((a, i) => {
    if (i.value.properties)
      a[i.key.name] = attribute(i.value.properties)

    else
      a[i.key.name] = i.value.value

    return a
  }, {})
}

export const ApiAstParse = (sourceCode: sring) => {
  const tree = program(sourceCode)
  const parse = tree.body.node
  const apiNode = parse.find(i => (!!['api', 'Api'].includes(i.declarations?.[0]?.id?.name)))
  if (apiNode) {
    return apiNode.declarations[0].init.elements.reduce((acc, item) => {
      const obj = attribute(item.properties)
      acc.push(obj)
      return acc
    }, [])
  }
  else {
    const ast = parse.find(s => s.type === 'ExpressionStatement').expression
    const left = ast.left
    const right = ast.right
    if (ast.operator !== '=' || left.object.name !== 'module' || !right.elements)
      return false
    return right.elements.reduce((acc, item) => {
      const obj = attribute(item.properties)
      acc.push(obj)
      return acc
    }, [])
  }
}
