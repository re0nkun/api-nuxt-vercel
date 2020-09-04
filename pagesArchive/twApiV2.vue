<template>
  <div>
    {{ datas }}
  </div>
  <!-- <v-container fluid class="grey lighten-5">
    <v-row no-gutters>
      <v-col v-for="(d, i) in datas" :key="i">
        <v-card
          class="ma-12 pa-12"
          tile
          outlined
        >
          {{ d.id_str }}
        </v-card>
      </v-col>
    </v-row>
  </v-container> -->
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    try {
      // const keyword = encodeURIComponent('#函館 -filter:retweets')
      const keyword = encodeURIComponent('#函館')

      await $axios.setToken('AAAAAAAAAAAAAAAAAAAAAJlcGAEAAAAAqIR1q9F54yuoPBUT7lz%2FS08w0Uw%3D2qaTende0yfTeVO7F68eK4w589vdFf6ePMG6wxqdvaxGlWocmd', 'Bearer')

      const datas = await $axios.$get(
        `https://api.twitter.com/2/tweets/search/recent?query=${keyword}
        &tweet.fields=created_at&expansions=author_id
        &user.fields=created_at`
      )

      // await $axios.setToken('AAAAAAAAAAAAAAAAAAAAANBiCwEAAAAA5V3TGfdXnK0QDvkISdEDpcJWyxs%3DN4jAdGGhYqTMW2ORWoSXUOoYVSRXCuWawMPQiE8k3WkWcqKHff', 'Bearer')

      // const datas = await $axios.$get(`https://api.twitter.com/1.1/search/tweets.json?q=${keyword}&count=10`)

      return { datas }
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
