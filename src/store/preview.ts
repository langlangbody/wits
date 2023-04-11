import { acceptHMRUpdate, defineStore } from 'pinia'

export const previewStore = defineStore('preview', () => {
  /* state */
  const savedName = ref('')
  const importMap = ref(
    {
      imports: {
        'vue': 'https://unpkg.com/@vue/runtime-dom@3.2.45/dist/runtime-dom.esm-browser.js',
        'vue/server-renderer': 'https://unpkg.com/@vue/server-renderer@3.2.45/dist/server-renderer.esm-browser.js',
      },
    },
  )
  /* getter */
  const usedNames = computed(() => Array.from(importMap.value))
  const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))

  /* action */
  function setImportMap(key: string, value: string) {
    importMap.value[key] = value
  }

  return {
    setImportMap,
    otherNames,
    savedName,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(previewStore, import.meta.hot))
