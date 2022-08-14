<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @input="closeshow"
        background="#3296fa"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="SearchResult" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :searchHistories="searchHistories"
      @search="onSearch"
      @clear-search-histories="deleteHistories"
    />
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from "./components/search-history";
import SearchSuggestion from "./components/search-suggestion";
import SearchResult from "./components/search-result";
import { setItem, getItem ,removeItem} from "@/utils/storage";
export default {
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  data() {
    return {
      searchText: "",
      SearchResult: "",
      isResultShow: false, // 控制搜索结果的展示
      searchHistories: getItem("TOUTIAO_SEARCH_HISTORIES") || [], // 搜索的历史记录数据
    };
  },
  methods: {
    onSearch(val) {
      // console.log(val);
      this.searchText = val;
      this.SearchResult = val;
      const index = this.searchHistories.indexOf(val);
      this.isResultShow = true;
      if (index != -1) {
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(val);
      setItem("TOUTIAO_SEARCH_HISTORIES", this.searchHistories);
    },
    onCancel() {},
    // 关闭搜索结果
    closeshow() {
      console.log(66666666666);
      this.isResultShow = false;
    },

    deleteHistories(){
      this.searchHistories=[],
      removeItem("TOUTIAO_SEARCH_HISTORIES")


    }
  },
};
</script>

<style scoped lang='less'>
.search-container {
  padding-top: 54px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>