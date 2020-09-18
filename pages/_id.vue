<template>
  <div class="app">
    <v-app-bar
      class="pt-3"
      app
      hide-on-scroll
    >
      <nuxt-link to="/" class="toolbar-title mx-5">
        <!-- <v-toolbar-title v-text="title" /> -->
      </nuxt-link>
      <v-select
        v-model="hashtag"
        :items="items"
        color="grey"
        @change="changeHashtag"
      />
    </v-app-bar>
    <v-main>
      <v-container fluid class="py-1">
        <client-only>
          <div v-masonry transition-duration="0" item-selector=".item" class="masonry-container">
            <div
              v-for="(item, $index) in list"
              :key="$index"
              v-masonry-tile
              class="item"
            >
              <tweetCard :tw="item" />

              <!-- <span v-for="(h, i) in item.entities.hashtags" :key="i">
                [{{ h.tag }}]
              </span> -->
            </div>
          </div>

          <infinite-loading @infinite="infiniteHandler" />
        </client-only>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import tweetCard from '~/components/tweetCard'
export default {
  components: {
    tweetCard
  },
  data () {
    return {
      items: ['...', 'hakodate', '北海道', 'hokkaido'],
      hashtag: this.$route.params.id,
      next: '',
      list: []
    }
  },
  mounted () {
    if (typeof this.$redrawVueMasonry === 'function') {
      this.$redrawVueMasonry()
    }
  },
  methods: {
    infiniteHandler ($state) {
      this.$axios.$get('https://api-nuxt-vercel.vercel.app/api', {
      // this.$axios.$get('/api', {
        params: {
          hashtag: this.$route.params.id || '',
          next: this.next
        }
      }).then((res) => {
        if (res.data.length) {
          if (res.meta.next_token) {
            this.next = res.meta.next_token
          } else {
            $state.complete()
          }
          this.list.push(...res.data)
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    },
    changeHashtag () {
      if (this.hashtag === '...') {
        this.$router.push({ name: 'id' })
      } else {
        this.$router.push({ name: 'id', params: { id: this.hashtag } })
      }
    }
    // ,
    // beforeRouteUpdate (to, from, next) {
    //   next()
    // }
  }
}
</script>

<style scoped>
.item {
  width: 100%;
  animation: fadeIn 2s ease 0s 1 normal;
}
@media screen and (min-width:600px) {
  .item {
    width: calc(100% / 2 );
  }
}
@media screen and (min-width:960px) {
  .item {
    width: calc(100% / 4 );
  }
}
@keyframes fadeIn {
  0% { opacity: 0 }
  100% { opacity: 1 }
}
</style>
