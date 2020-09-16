<template>
  <div>
    {{ lists }}
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      lists: null
    }
  },
  mounted () {
    const keyword = encodeURIComponent('#函館')

    this.$axios.setToken('AAAAAAAAAAAAAAAAAAAAAJlcGAEAAAAAqIR1q9F54yuoPBUT7lz%2FS08w0Uw%3D2qaTende0yfTeVO7F68eK4w589vdFf6ePMG6wxqdvaxGlWocmd', 'Bearer')

    this.$axios.$get(`/api/recent?query=${keyword}&tweet.fields=created_at&expansions=author_id&user.fields=created_at`)
      .then((res) => {
        this.lists = res
      })
  }
}
</script>
