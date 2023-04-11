<script setup lang="ts">
import gridList from '@mctech/kaka-grid'
import { getMenuOptions } from '~/utils/generateRouterOption'
const grid = ref(null)
const router = useRouter()

const routes = router.getRoutes().filter(i => i.name)

const menuOptions = getMenuOptions(routes)
const gridOptions = reactive({
  columns: [
    {
      caption: '导航',
      type: 'tree',
      field: 'title',
      width: 'auto',
      style: {
        appearance: (rec) => {
          return {
            className: rec.iconClassName, // 会使用css的class样式
            name: rec.iconClassName,
          }
        },
      },
    },

  ],
  records: menuOptions,
})
const userTheme = {
  borderColor: (args: any) => {
    const { row } = args
    if (row === 0)
      return [null, null, '#EBECF0', null]

    return ['#EBECF0', null, '#EBECF0', null]
  },
  highlightBorderColor: 'transparent',
}
const cellclick = (data: any, vm: any) => {
  const rec = toRaw(vm.kakaGrid.getRowRecord(data.row))
  vm.kakaGrid.currentSelectId = rec?.id || data.row
  vm.invalidate()
  if (rec.isLeaf)
    router.push(rec.path)
  console.log(router)
}
const load = (vm) => {
  vm.kakaGrid.currentSelectId = null
}
</script>

<template>
  <mu-box class="h-screen">
    <kaka-grid
      ref="grid"
      key-field="id"
      parent-key-field="parentId"
      :hide-header="true"
      :theme="userTheme"
      :columns="gridOptions.columns"
      :records="gridOptions.records"
      :check-cascade="false"
      @load="load"
      @cellclick="cellclick"
    />
  </mu-box>
</template>
