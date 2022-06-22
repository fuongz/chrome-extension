<script setup lang="ts">
interface Coin {
  key: string
  usd: string
}

const url = ref('')
const errors = ref('')
const data = ref<Coin[]>([])

onMounted(async () => {
  try {
    const arrCoins = ['calo-app', 'beamswap', 'harmony', 'binancecoin', 'defi-kingdoms', 'babyswap']
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${arrCoins.join(',')}&vs_currencies=usd`)
    const resJson = await res.json()

    const resData: Coin[] = Object.keys(resJson).map((key: any) => ({
      key,
      ...resJson[key],
    }))
    if (!data) throw new Error('No data')

    data.value = resData
  } catch (err: any) {
    errors.value = err.message
  }
})

const download = async () => {
  window.open(`https://fugon11-youtube-downloader.herokuapp.com/watch?v=${url.value}`)
}
</script>

<template>
  <main class="w-[300px] px-4 py-3 text-gray-700">
    <div>
      <input v-model="url" type="text" placeholder="v?=" class="focus:outline-none border-gray-300 rounded px-3 py-1.5 border-1 mr-2">
      <button class="bg-violet-900 text-white rounded px-3 py-1.5" @click="download()">Download</button>
    </div>

    <div class="mt-4 border-t pt-4 border-gray-150">
      <div v-if="data && data.length > 0">
        <table class="w-full table">
          <tr v-for="item in data" :key="item.key">
            <td class="text-left">
              {{ item.key }}
            </td>
            <td class="text-left">
              <span class="font-semibold text-emerald-600">{{ item.usd }}</span>
            </td>
          </tr>
        </table>
      </div>

      <div v-else>
        <div class="text-center text-gray-600">No data.</div>
      </div>
    </div>
  </main>
</template>
