<script lang="ts">
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { getTheme } from './getTheme'
import { onMountedOrActivated } from '~/utils/onMountedOrActivated'

export default defineComponent({
  inheritAttrs: false,
  props: {
    height: {
      type: [String, Number],
      default: 'auto',
    },
    value: { type: String, default: '' },
  },
  emits: ['change', 'get', 'update:value'],
  setup(props, { attrs, emit }) {
    const wrapRef = ref()
    const vditorRef = ref()
    const initedRef = ref(false)

    const getDarkMode = ref('light')
    const valueRef = ref(props.value || '')

    watch(
      [() => getDarkMode.value, () => initedRef.value],
      ([val, inited]) => {
        if (!inited)
          return

        instance
          .getVditor()
          ?.setTheme(getTheme(val) as any, getTheme(val, 'content'), getTheme(val, 'code'))
      },
      {
        immediate: true,
        flush: 'post',
      },
    )

    watch(
      () => props.value,
      (v) => {
        if (v !== valueRef.value)
          instance.getVditor()?.setValue(v)

        valueRef.value = v
      },
    )

    function init() {
      const wrapEl = unref(wrapRef)
      if (!wrapEl)
        return
      const bindValue = { ...attrs, ...props }
      const insEditor = new Vditor(wrapEl, {
        // 设置外观主题
        theme: getTheme(getDarkMode.value) as any,
        lang: 'zh_CN',
        mode: 'sv',
        fullscreen: {
          index: 520,
        },
        preview: {
          theme: {
            // 设置内容主题
            current: getTheme(getDarkMode.value, 'content'),
          },
          hljs: {
            // 设置代码块主题
            style: getTheme(getDarkMode.value, 'code'),
          },
          actions: [],
        },
        input: (v) => {
          valueRef.value = v
          emit('update:value', v)
          emit('change', v)
        },
        after: () => {
          nextTick(() => {
            insEditor.setValue(valueRef.value)
            vditorRef.value = insEditor
            initedRef.value = true
            emit('get', instance)
          })
        },
        blur: () => {
          // unref(vditorRef)?.setValue(props.value);
        },
        ...bindValue,
        cache: {
          enable: false,
        },
      })
    }

    const instance = {
      getVditor: (): Vditor => vditorRef.value!,
    }

    function destroy() {
      const vditorInstance = unref(vditorRef)
      if (!vditorInstance)
        return
      try {
        vditorInstance?.destroy?.()
      }
      catch (error) {}
      vditorRef.value = null
      initedRef.value = false
    }

    onMountedOrActivated(init)

    onBeforeUnmount(destroy)
    onDeactivated(destroy)
    return {
      wrapRef,
      ...instance,
    }
  },
})
</script>

<template>
  <div ref="wrapRef" />
</template>
