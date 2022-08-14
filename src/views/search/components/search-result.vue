<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false,
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  watch: {
    searchText: {
      handler(newName, oldName) {
        this.list = [];
        this.page = 1;
        this.perPage = 20;
        this.onLoad();

        // ...
        // this.loadSearchSuggestions(newName);
      },
      immediate: true,
    },
  },
  methods: {
    async onLoad() {
      try {
        const res = await getSearchResult({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.searchText, // 查询关键词
        });
        console.log(res);
        this.list.push(...res.data.data.results);
        this.loading = false;
        if (res.data.data.results.length) {
          // 如果有，则更新获取下一个数据的页码
          this.page++;
        } else {
          // 如果没有，则将加载状态 finished 设置为结束
          this.finished = true;
        }
      } catch (err) {
        this.loading = false;
        this.error = true;
      }
    },
  },
};
</script>

<style scoped lang='less'>
</style>