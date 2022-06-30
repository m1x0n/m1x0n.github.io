<template>
<div class="content">
  <video
      autoplay
      loop
      muted
      playsinline
      v-if="catImage.isFallback()"
      width="320"
      height="240"
  >
    <source :src="catImage.src" type="video/webm" @load="catImage.onLoad">
  </video>
  <img
      :src="catImage.src"
      @load="catImage.onLoad"
      id="cat-animation"
      alt="Cat"
      v-if="!catImage.isFallback()"
      height="320"
      width="240"
  >
  <button
      id="more-cats-button"
      class="big-button"
      @click="loadImage"
      :disabled="loading"
      title="Load new cat"
  >{{this.label}}
  </button>
  <button
      class="big-button"
      @click="viewProjects"
      title="View Github profile"
  >View projects
  </button>
</div>
</template>

<script>
import catProviderPool from "../cats"
import PawsProgressBar from "../paws"

const profileUrl = "https://github.com/m1x0n"

export default {
  name: "CatsViewer",
  methods: {
    async loadImage() {
      this.loading = true
      this.progressBar.start()

      this.catImage.onLoad = null
      let cat = await catProviderPool.getCat()
      this.catImage.src = cat.content()
      this.catImage.onLoad = () => {
        this.loading = false
        this.progressBar.end()
      }
    },
    viewProjects() {
      window.location.href = profileUrl
    },
  },
  data() {
    return {
      loading: false,
      catImage: {
        src: catProviderPool.getFallbackCat().content(),
        onLoad: null,
        isFallback: function() {
          return this.src.includes('placeholder')
        },
      },
      progressBar: null
    }
  },
  created() {
    this.progressBar = new PawsProgressBar()
  },
  computed: {
    label: function() {
      return this.progressBar.val()
    }
  }
}
</script>

<style scoped>

</style>
