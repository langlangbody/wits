<script setup lang="ts">
import { log } from 'console'
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import service from '~/utils/api/index'
const query = ref('')
const params = ref('')
const apiPath = ref('')
const host = ref('https://test.mctech.vip')
const hostOptions = [{
  label: '测试环境',
  value: 'https://test.mctech.vip',
}, {
  label: '正式环境',
  value: 'http://dev.mctech.vip',
}, {
  label: '开发环境',
  value: 'https://i.mctech.vip',
}]
const extensions = [json(), oneDark]
const queryData = async () => {

}

const submit = async () => {
  const data = {
    host: host.value,
    api: apiPath.value,
    params: JSON.parse(params.value),
  }
  console.log(data)
}
</script>

<template>
  <mu-box size="auto" class="flex height100">
    <mu-box flex="1" class="width50">
      <mu-form form-style="normal">
        <mu-form-row>
          <mu-form-field>
            <mu-combo-box
              v-model="host"
              class="mu-box"
              width="300"
              label="GET"
              :clear-button="false"
              placeholder="选择环境"
              :options="hostOptions"
            />
          </mu-form-field>
        </mu-form-row>
        <mu-form-row>
          <mu-form-field label="path" width="300">
            <mu-editor :value="apiPath" />
          </mu-form-field>
        </mu-form-row>
        <mu-form-row>
          <mu-form-field required flex="1 auto">
            <Codemirror
              v-model="params"
              placeholder="请求参数"
              :style="{ height: '300px', width: '100%' }"
              :autofocus="true"
              :indent-with-tab="true"
              :tab-size="2"
              :extensions="extensions"
            />
          </mu-form-field>
        </mu-form-row>
      </mu-form>
      <mu-button danger @click="submit">
        查询
      </mu-button>
    </mu-box>
    <mu-box flex="1" class="width50">
      <Codemirror
        v-model="query"
        placeholder=""
        :disabled="true"
        :style="{ height: '100%' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
      />
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
  title: 对外接口测试
  parentId: tool
  name: mcApiTest
  layout: index
  description: 对外接口测试
</route>
