<template>
  <main class="w-[300px] px-4 py-5 text-center text-gray-700">
    <Logo />
    <h3>Fugon11's Chrome Extension</h3>

    <div class="mt-4">
      <p class="mb-2">Youtube Downloader</p>
      <input v-model="url" type="text" placeholder="v?=" class="focus:outline-none border-gray-300 rounded px-3 py-1.5 border-1 mr-2" />
      <button class="bg-violet-900 text-white rounded px-3 py-1.5" @click="download()">Download</button>
    </div>
  </main>
</template>

<script setup lang="ts">
const url = ref('')

// eslint-disable-next-line space-before-function-paren
const download = async () => {
  window.open(`https://fugon11-youtube-downloader.herokuapp.com/watch?v=${url.value}`)
}
</script>
