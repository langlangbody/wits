---
title: demo1
---
<route lang="yaml">
meta:
  title: 组件案例
  layout: index
  parentId: mussel-doc
  desc: 组件案例
</route>


### This is {{frontmatter.title}}

## Props

| Props       | Description    |
| ----------- | -------------- |
| msg         | 描述文本  |

## Examples

<script setup>
const msgs = [
  'Hello Peter',
  'Hello John'
]
</script>

<template v-for="msg in msgs">
  <mu-button> {{ msgs[0] }} </mu-button>
</template>



<details>
<summary>代码</summary>

```html
<script setup>
const msgs = [
  'Hello Peter',
  'Hello John'
]
</script>

<template v-for="msg in msgs">
  <mu-button> {{ msgs[0] }} </mu-button>
</template>
```
</details>