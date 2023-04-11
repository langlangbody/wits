<script setup lang="ts">
import { useDateFormat, useNow } from '@vueuse/core'
import Menu from './default/menu/index.vue'
import service from '~/utils/api/index'

const result = ref(null)

onMounted(async () => {
  result.value = await service.get('/index.php', {
    c: 'dailysentence',
    m: 'getdetail',
    title: `${useDateFormat(useNow(), 'YYYY-MM-DD').value}`,
  })
})
</script>

<template>
  <mu-h-box position="fixed fit">
    <mu-box flex="1" class="flex items-center justify-center mc-page-header h-60px flex-col">
      <p class="font-600 text-5">
        {{ result ? result.note : '二营长，你他娘的意大利炮给老子拉上来' }}
      </p>
      <p>
        {{ result ? result.content : '' }}
      </p>
    </mu-box>
    <mu-box size="1" class="mc-page-body flex">
      <mu-box width="200" class="shadow-md mr">
        <Menu size="1" />
      </mu-box>
      <mu-box flex="1">
        <RouterView />
      </mu-box>
    </mu-box>
  </mu-h-box>
</template>

<style>
  .mc-page-header {
    box-shadow: 0 6px 12px rgb(0 0 0 / 23%);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .mc-page-body{
    position: absolute;
    top: 66px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .h-50px {
    height: 60px;
  }
</style>
