<script setup>
import { ref } from 'vue'
const msg = ref('Hello World!123')
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg">
</template>
