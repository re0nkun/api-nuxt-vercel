<template>
  <div>
    <v-app-bar app>
      <v-toolbar-title>
        <span>Vuetify Pagination</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <div class="text-center">
        <v-list>
          <v-list-item v-for="item in lists" :key="item.id">
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-pagination
          v-model="page"
          :length="length"
          :total-visible="11"
          @input="pageChange"
        />
      </div>
    </v-main>
  </div>
</template>

<script>
export default {
  async asyncData (context) {
    try {
      const page = Number(context.params.id) || 1

      await context.$axios.setToken('1e29b9f2e3798ad141bd236990a1c98f49be7ab5', 'Bearer')

      const lists = await context.$axios.$get(`https://qiita.com/api/v2/items?query=tag:javascript&per_page=10&page=${page}`)

      return {
        lists,
        page,
        length: page + 5
      }
    } catch (err) {
      console.log(err)
    }
  },
  watchQuery: ['p'],
  data () {
    return {
      page: 1
      // length: 4
      // pageSize: 10,
      // lists: [],
      // viewLists: [],
    }
  },
  // created () {
  //   // this.length = Math.ceil(this.lists.length / this.pageSize)
  //   // this.viewLists = this.lists.slice(this.pageSize * (this.page - 1), this.pageSize * this.page)
  // },
  methods: {
    pageChange (n) {
      // this.$router.push({ query: { p: this.page } })
      this.$router.push({ name: 'id', params: { id: n } })
    }
  }
}
</script>
