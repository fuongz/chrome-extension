<template>
  <div />
</template>

<script setup lang="ts">
const $style = document.createElement('style')

// eslint-disable-next-line space-before-function-paren
const getCss = async () => {
  const getGist = await fetch('https://api.github.com/gists/eb9fa838e1a1d7fd0608a3473f26c9bd')

  if (getGist.ok) {
    const rawGist = await getGist.json().then((gist: any) => fetch(gist.files['fugon-chrome-extension-config.json'].raw_url).then((res: any) => res.json()))

    if (rawGist && Array.isArray(rawGist)) {
      const $head = document.head || document.getElementsByTagName('head')[0]
      const $body = document.body || document.getElementsByTagName('body')[0]

      $body.classList.add('fugon-voz')

      const siteConfig = rawGist.find((site: any) => site.domains.includes(window.location.hostname))

      $style.appendChild(document.createTextNode(siteConfig.css))
      $head.appendChild($style)
    }
  }
}

// eslint-disable-next-line space-before-function-paren
onBeforeMount(async () => {
  await getCss()
})
</script>
