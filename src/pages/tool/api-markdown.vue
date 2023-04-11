<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { createMd } from '~/tools/md-tool'

const code = ref('')

const apiContent = ref('')

const extensions = [javascript(), oneDark]
const onChange = (val: string) => {
  apiContent.value = !val ? '' : createMd(val)
}
</script>

<template>
  <mu-box size="auto" class="flex height100">
    <mu-box flex="1" class="width50">
      <Codemirror
        v-model="code"
        placeholder="将api.js 文件复制进来"
        :style="{ height: '100%' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        @change="onChange"
      />
    </mu-box>
    <mu-box flex="1" class="width50">
      <Markdown class="h100" mode="ir" height="100%" :value="apiContent" />
    </mu-box>
  </mu-box>
</template>

<style lang="css">
  .height100{
    height: 100%;
  }
  .width50{
    width: 50%;
  }
</style>

<route lang="yaml">
meta:
  title: api文档转换
  parentId: tool
  name: api-markdown
  layout: index
  description: api文档转换
</route>
