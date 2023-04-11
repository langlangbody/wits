<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import service from '~/utils/api/index'
import MD5 from '~/utils/md5'
const query = ref('')
const outPut: any = ref([])
const to = 'auto'
const from = 'auto'
const appid = '20221230001513544'
const key = '2ppQCZZpUupgD4rPwJ8k'

const extensions = [javascript(), oneDark]
const onChange = useDebounceFn(async (val) => {
  const salt = (new Date()).getTime()
  const str1 = appid + val + salt + key
  const sign = MD5(str1)
  console.log(val)
  if (!val)
    return
  const result = await service.get('/baidu/api/trans/vip/translate', {
    q: val,
    appid,
    salt,
    from,
    to,
    sign,
  })
  if (result.error_code)
    await onChange(val)
  else
    outPut.value = result.trans_result || []
})

const synth = window.speechSynthesis
const u: any = new SpeechSynthesisUtterance()
u.rate = 0.8
const speak = (lang: string) => {
  if (!outPut.value[0])
    return
  u.text = lang === 'l' ? outPut.value[0].src : outPut.value[0].dst
  synth.speak(u)
}
</script>

<template>
  <mu-box class="flex p-1">
    <mu-button @click="speak('r')">
      朗读右侧
    </mu-button>
    <mu-button @click="speak('l')">
      朗读左侧
    </mu-button>
  </mu-box>
  <mu-box size="auto" class="flex height100">
    <mu-box flex="1" class="width50">
      <Codemirror
        v-model="query"
        placeholder="输入需要翻译的文字..."
        :style="{ height: '100%' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        @change="onChange"
      />
    </mu-box>
    <div class="mu-splitter" />
    <mu-box flex="1" class="width50">
      <p v-for="i in outPut" :key="i.src" class="text-size-[2em]">
        {{ i.dst }}
      </p>
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
  .mu-space {
  flex: 1 1 0%;
}

[direction="row"][flex-wrap] > .mu-space {
  flex: none;
  width: 100%;
}
</style>

<route lang="yaml">
meta:
  title: 在线翻译
  parentId: tool
  name: translation
  layout: index
  description: 在线翻译
</route>
