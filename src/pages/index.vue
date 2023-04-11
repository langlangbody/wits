<script setup lang="ts">
const router = useRouter()

const routes = router.getRoutes().filter(i => i.name)
const go = (routerUrl: string) => {
  router.push(routerUrl)
}
</script>

<template>
  <div>
    <div>
      <mu-button
        v-for="item in routes"
        :key="item.path"
        primary
        button-style="text"
        @click="go(item.path)"
      >
        {{ item.path }}{{ item.name }}
      </mu-button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  title: 首页
  parentId: -1
  layout: index
  description: 首页
</route>
