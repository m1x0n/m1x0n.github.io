<template>
<div class="content">
  <img
      :src="catImage.src"
      @load="catImage.onLoad"
      id="cat-animation"
      alt="Cat"
  >
  <button
      id="more-cats-button"
      class="big-button fit-cats"
      @click="loadImage"
      :disabled="loading"
      title="Load new cat"
  >More cats &#x1f43e;
  </button>
  <button
      class="big-button fit-cats"
      @click="viewProjects"
      title="View Github profile"
  >View projects
  </button>
</div>
</template>

<script>
import catProviderPool from "../cats"
import catLoading from "../assets/kitty.gif"
import catPlaceholder from "../assets/placeholder.gif"

const profileUrl = "https://github.com/m1x0n"

export default {
  name: "CatsViewer",
  methods: {
    async loadImage() {
      this.loading = true
      this.catImage.src = catLoading
      this.catImage.onLoad = null
      let cat = await catProviderPool.getCat()
      this.catImage.src = cat.content()
      this.catImage.onLoad = () => this.loading = false
    },
    viewProjects() {
      window.location.href = profileUrl
    },
  },
  data() {
    return {
      loading: false,
      catImage: {
        src: catPlaceholder,
        onLoad: null
      }
    }
  }
}
</script>

<style scoped>

</style>
