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
        item-text="txt"
        item-value="val"
        label="category"
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

          <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler" />
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
      items: [
        { txt: '---', val: '' },
        { txt: 'hakodate', val: 'hakodate' },
        { txt: '北海道', val: '北海道' },
        { txt: 'hokkaido', val: 'hokkaido' }
      ],
      hashtag: '',
      infiniteId: +new Date(),
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
        params: {
          hashtag: this.hashtag,
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
      this.next = ''
      this.list = []
      this.infiniteId += 1
    }
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
