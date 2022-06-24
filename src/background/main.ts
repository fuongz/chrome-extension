// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

const isValidPattern = (urlPattern: string) => {
  const validPattern = /^(file:\/\/.+)|(https?|ftp|\*):\/\/(\*|\*\.([^\/*]+)|([^\/*]+))\//g
  return !!urlPattern.match(validPattern)
}

const blockRequest = (details: any) => {
  console.log('[f11] blocked: ', details.url)

  return {
    cancel: true,
  }
}

const youtubeUrlBlocks = ['https://www.youtube.com/youtubei/v1/player/ad_break?key=*', 'https://www.googleadservices.com/pagead/aclk?sa=*']

if (browser.webRequest.onBeforeRequest.hasListener(blockRequest)) browser.webRequest.onBeforeRequest.removeListener(blockRequest)

try {
  browser.webRequest.onBeforeRequest.addListener(blockRequest, { urls: youtubeUrlBlocks.filter(isValidPattern) })
} catch (e) {
  console.error('[f11] errors: ', e)
}
