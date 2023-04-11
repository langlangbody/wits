import { compileTemplate, parse } from '@vue/compiler-sfc'

export const demoCode = `
<script lang="ts">
export default {
  name: 'demo123'
}
</script>
<script setup lang="ts">
const data = 123
</script>
<template>
<div>
  {{ data }}
</div>
</template>
`

export const parseVue = (code: string) => {
  const { descriptor } = parse(code, { pad: true })
  const templateStr = compileTemplate(descriptor)
  console.log(transform(templateStr.code))

  return templateStr.code
}

