<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import Preview from './preview/index.vue'
import { ReplStore } from '~/utils/store'
export interface Props {
  store?: Store
  autoResize?: boolean
  showCompileOutput?: boolean
  showImportMap?: boolean
  clearConsole?: boolean
  sfcOptions?: SFCOptions
  layout?: string
  ssr?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  store: () => new ReplStore(),
  autoResize: true,
  showCompileOutput: true,
  showImportMap: true,
  clearConsole: true,
  ssr: false,
})
props.store.init()
const demo = `
<template>
  <p> demo </p>
</template>
`
const code = `
<script setup>
import { ref } from 'vue'
import demo from './demo.vue'
const msg = ref('Hello World!123')
<\/script>

<template>
  <demo />
  <h1>{{ msg }}</h1>
  <input v-model="msg">
</template>
`.trim()

onMounted(async () => {
  await props.store.setFiles({
    'index.vue': code,
    'demo.vue': demo,
  }, 'index.vue')
})

provide('store', props.store)
provide('autoresize', props.autoResize)
provide('import-map', toRef(props, 'showImportMap'))
provide('clear-console', toRef(props, 'clearConsole'))
const extensions = [javascript(), oneDark]
const onChange = (val: string) => {
  props.store.state.activeFile.code = val
}
</script>

<template>
  <mu-box>
    <Codemirror
      v-model="code"
      placeholder="Code goes here..."
      :style="{ height: '400px' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @change="onChange"
    />
    <Preview :show="true" :ssr="false" />
  </mu-box>
</template>

<route lang="yaml">
meta:
  title: vue模版
  parentId: -1
  layout: index
  description: codeView
</route>
