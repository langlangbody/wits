import { ApiAstParse } from './ast'

const apiTempl = ({
  index,
  description,
  url,
  method,
  paramsStr,
  resDataStr = '',
  resFieldsStr = '',
}) => {
  return `
### ${index}. ${description}

#### ${index}.1 请求URL: 

<font color=#A52A2A > ${method}:</font>  <font color=#A52A2A >${url}</font> 

#### ${index}.2 参数:

| 参数名             | 必选 | 类型   | 说明             |
| --------------     | ---- | ------ | ---------------- |
${
  paramsStr
    ? Object.keys(paramsStr)
        .map((i) => {
          const item = paramsStr[i]
          return `|${i}|${!!item?.required}|${item?.type}|${item?.comment || item?.description || ''}  ${
            item?.from ? `传参方式：${item.from}` : ''
          }|
`
        })
        .join('')
    : ''
}

#### ${index}.3 返回示例:

${resDataStr}

#### ${index}.4 返回数据说明:

| 字段           | 类型   | 说明             |
| --------------   | ------ | ---------------- |
${resFieldsStr}

****
`
}

const retTempl = () => {
  return `
\`\`\`json
\`\`\`
`
}

const parseParams = (req = {}) => {
  const params = {}
  if (!Object.keys(req).length)
    return {}
  Object.keys(req).forEach((key) => {
    if (key === '$body') {
      for (const val of Object.keys(req.$body.properties)) {
        if (val)
          req.$body.properties[val].from = req.$body.properties[val].from || 'body'
      }

      Object.assign(params, req.$body.properties)
    }
    else { params[key] = req[key] }
  })
  return params
}

function start(config) {
  // const fileName = `./${name}.md`;
  let apiDoc = ''
  config.forEach((i, index) => {
    apiDoc += apiTempl({
      index: index + 1,
      description: i.description,
      url: i.url,
      method: i.method.toUpperCase(),
      paramsStr: Object.keys(parseParams(i.req)).length ? parseParams(i.req) : '',
      resDataStr: retTempl(),
    })
  })
  return apiDoc
}

export const createMd = (cfg) => {
  return start(ApiAstParse(cfg))
}
