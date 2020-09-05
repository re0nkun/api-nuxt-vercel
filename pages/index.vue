<template>
  <div>
    hello
    <!-- {{ lists }} -->
    <!-- <v-app-bar app>
      <v-toolbar-title>
        <span>Vuetify Pagination</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <div class="text-center">
        <v-list>
          <v-list-item v-for="item in viewLists" :key="item.id">
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-pagination
          v-model="page"
          :length="length"
          @input="pageChange"
        />
      </div>
    </v-main> -->
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  // async asyncData ({ $axios }) {
  //   const lists = await $axios.$get('https://api-nuxt-vercel.vercel.app/api')

  //   return { lists }
  // }

  // data () {
  //   return {
  //     lists: [],
  //     url: 'https://graph.facebook.com/v8.0/17843623015059128/recent_media?access_token=EAAEeA6V2QgwBAJvLF9hUj7gWXJt7ARZCMdg89JX316QUC8XyGJZBynUxZBHayhKqZBLgPdS1HURfVZBdeycfY37ahZA1J7z7lnlhqKiAZC1RyPOsaygZACOXKdLFwP6areZBzEmW68MGzvjI805Eg7WJSSBegDzV9LJARtSC8PXalFAZDZD&pretty=1&fields=id,permalink,timestamp&user_id=17841403161058462&limit=50'
  //   }
  // },
  // created () {
  //   this.searchApi()
  // },
  // methods: {
  //   searchApi (n = this.url) {
  //     axios.get(n)
  //       .then((res) => {
  //         if (!res.data.data.length) {
  //           return 0
  //         } else if (res.data.data.length) {
  //           if (res.data.paging.next === null) {
  //             return 0
  //           }

  //           for (const d of res.data.data) {
  //             this.lists.push(d)
  //           }

  //           this.searchApi(res.data.paging.next.replace(/\u00252C/g, ','))
  //         } else {
  //           return 0
  //         }
  //       })
  //   }
  // }
}
</script>
