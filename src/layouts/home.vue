<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <RouterView />
    <TheFooter />
    <div class="mt-5 mx-auto text-center opacity-75 dark:opacity-50 text-sm">
      [Home Layout]
    </div>
  </main>
</template>

<style>
  .mc-page-body{
    position:absolute;
    top: 56px;
    left: 0;
    right: 0;
  }
</style>
