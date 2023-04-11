import fs from 'fs-extra'
import $ from 'gogocode'
// const packageName = require('../src/views/temp/data.ts');

const sourceCode = fs.readFileSync('./src/views/temp/data.ts', 'utf8')
const fileConfigs = fs.readFileSync('./src/views/temp/filesCode.ts', 'utf8')

interface Item {
  type: string
  title: string
  key: string
  parentKey?: string
  isLeaf?: boolean
  children: any[]
}

const filesCode = {}

const treeData: Item[] = []

const genMap = (arr, acc = {}) => {
  for (let index = 0; index < arr.length; index++) {
    const item = arr[index]
    acc[item.key] = item
    if (item.children?.length)
      genMap(item.children, acc)
  }
  return acc
}
const fileIconMap = {
  js: 'vscode-icons:file-type-light-js',
  ts: 'vscode-icons:file-type-typescript',
  tsx: 'vscode-icons:file-type-typescript',
  vue: 'vscode-icons:file-type-vue',
  md: 'vscode-icons:file-type-light-mdx',
  pcss: 'vscode-icons:file-type-css',
  css: 'vscode-icons:file-type-css',
  html: 'vscode-icons:file-type-html',
}
const recursiveFiles = (path1, sourceTree) => {
  const files = fs.readdirSync(path1)
  if (!files.length)
    return
  files.forEach((file) => {
    const regex = /.(js|vue|pcss|css|html)$/
    const isFile = regex.test(file)
    if (isFile) {
      const findParentItem = sourceTree.find(i => i.key === `${path1}/${file}`)
      if (!findParentItem) {
        const fileSuffix = file.split('.')
        const suffix = fileSuffix[fileSuffix.length - 1]
        sourceTree.push({
          isLeaf: true,
          parentKey: path1,
          title: file,
          icon: fileIconMap[suffix] ? fileIconMap[suffix] : 'vscode-icons:file-type-yang',
          type: 'file',
          key: `${path1}/${file}`,
        })
        filesCode[`${path1}/${file}`] = fs.readFileSync(`${path1}/${file}`, 'utf8')
      }
    }
    else if (
      fs.existsSync(`${path1}/${file}`)
      && fs.lstatSync(`${path1}/${file}`).isDirectory()
    ) {
      sourceTree.push({
        type: 'directory',
        isLeaf: false,
        parentKey: path1,
        title: file,
        key: `${path1}/${file}`,
        children: [],
      })
      recursiveFiles(`${path1}/${file}`, genMap(treeData)[`${path1}/${file}`].children)
    }
  })
}
recursiveFiles('./mc-temp', treeData)

const code = $(sourceCode)
  .replace('const treeData = $_$', `const treeData = ${JSON.stringify(treeData)}`)
  .root()
  .generate()

const files = $(fileConfigs)
  .replace('const fileCode = $_$', `const fileCode = ${JSON.stringify(filesCode)}`)
  .root()
  .generate()

$.writeFile(code, './src/utils/temp/data.ts')
$.writeFile(files, './src/utils/temp/filesCode.ts')
