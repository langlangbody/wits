<script setup lang="ts">
</script>

<template>
  <nav text-xl mt-6>
    <RouterLink class="icon-btn mx-2" to="/" title="首页">
      <div i-carbon-campsite />
    </RouterLink>

    <button class="icon-btn mx-2 !outline-none" title="黑色" @click="toggleDark()">
      <div i="carbon-sun dark:carbon-moon" />
    </button>

    <RouterLink class="icon-btn mx-2" to="/about" title="关于">
      <div i-carbon-dicom-overlay />
    </RouterLink>

    <RouterLink class="icon-btn mx-2" to="/mussel-doc/demo" title="demo">
      <span>demo</span>
    </RouterLink>
  </nav>
</template>
