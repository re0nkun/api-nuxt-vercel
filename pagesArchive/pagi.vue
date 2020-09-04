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
    </v-main>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const items = await $axios.$get('https://qiita.com/api/v2/items?query=tag:javascript&per_page=10&page=2')

    return { lists: items }
  },
  data () {
    return {
      page: 1,
      length: 0,
      lists: [],
      viewLists: [],
      pageSize: 10
    }
  },
  mounted () {
    this.length = Math.ceil(this.lists.length / this.pageSize)

    this.viewLists = this.lists.slice(this.pageSize * (this.page - 1), this.pageSize * this.page)
  },
  methods: {
    pageChange (pageNum) {
      this.viewLists = this.lists.slice(this.pageSize * (pageNum - 1), this.pageSize * pageNum)
    }
  }
}
</script>
