<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="onSearchItemClick(item, index)"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
import { setItem, getItem ,removeItem} from "@/utils/storage";
export default {
  data() {
    return {
      isDeleteShow: false, // 控制删除显示状态
    };
  },
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    //   重新搜索
    onSearchItemClick(item, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1);
        setItem("TOUTIAO_SEARCH_HISTORIES", this.searchHistories);
      } else {
        this.$emit("search", item);
      }
    },
  },
};
</script>

<style scoped lang="less">
</style>