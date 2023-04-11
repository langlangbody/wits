import { useDateFormat, useNow } from '@vueuse/core'
const fixedData = {
  releationId: 100001,
  sceneId: 10007,
  isSystem: 1,
  isEnabled: 1
}

const hearder =
  'INSERT INTO`config_pci`.`tenant_sync_relation_scene_config`(`id`, `relation_id`, `scene_id`, `org_id`, `is_enabled`, `is_system`, `created_at`, `updated_at`) VALUES'

const date = `${useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss').value}`
const initId = 200023
const data = `
1433781267636224
`
const dataColumns = data.split(/\r|\n/).filter(item => !!item)

const hearder2 =
  'INSERT INTO `config_pci`.`tenant_sync_config_feature_ref` (`id`, `config_id`, `feature_id`) VALUES'

let cid = 300054

const list = [20002, 20003, 20005]

const sqlList = []
const sqlList2 = []
dataColumns.forEach((i, index) => {
  const id = initId + index
  sqlList.push(
    `(${id}, ${fixedData.releationId}, ${fixedData.sceneId}, ${parseInt(
      i
    )}, 1, 1, '${date}', '${date}')`
  )
  list.forEach(item => {
    cid += 1
    sqlList2.push(`(${cid}, ${id}, ${item})`)
  })
})
console.log(`${hearder} ${sqlList.join(', ')};`)

console.log(`${hearder2} ${sqlList2.join(', ')};`)
