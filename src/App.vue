<script setup lang="ts">
useHead({
  title: '小知识',
  meta: [
    { name: 'description', content: '知识库' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
const self = getCurrentInstance()
provide('messageBox', self.appContext.app.config.globalProperties.$mussel.messageBox)
</script>

<template>
  <RouterView />
</template>
