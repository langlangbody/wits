import drop from 'lodash.drop'
import dropRight from 'lodash.dropright'
import { camel } from '../until'

export const sqlTool = (str: string) => {
  const dataColumns = (str || '').split(/\r|\n/).filter(item => !!item)
  const cn = dataColumns[dataColumns.length - 1]
  const en = dataColumns[0]

  // const tableStr_split = _split_1.split('(')
  // const tableStr = tableStr_split[tableStr_split.length]

  const tableCnName = cn
    .substring(cn.indexOf('COMMENT') + 'COMMENT'.length, cn.indexOf('STORED'))
    .trim()
    .replace(/\'/g, '')

  let tableEnName = `${en.substring(
    en.indexOf('EXISTS') + 'EXISTS'.length,
    en.indexOf('('),
  )}`.trim()

  let moduleName = camel(tableEnName)

  const sqlColumns = drop(dropRight(dataColumns, 2), 1)

  const columns = sqlColumns.reduce((acc, item) => {
    item = item.replace('` ', '')
    item = item.replace(' `', '')
    const column = item.trim().split(/\s+/)
    acc.push({
      key: camel(column[0]),
      name: column[column.length - 1].replace(/[\,|\'|\"]/g, ''),
      type: column[1],
    })
    return acc
  }, [])
  tableEnName = (`${tableEnName}`).replace('` ', '')
  tableEnName = (`${tableEnName}`).replace(' `', '')
  moduleName = (`${moduleName}`).replace('` ', '')
  moduleName = (`${moduleName}`).replace(' `', '')
  return {
    columns,
    tableCnName,
    tableEnName,
    moduleName,
  }
}

// module.exports = {
//   tableCnName,
//   tableEnName
// }
