<template>
  <div class="search-suggestion">
    <!-- <div v-if="isshow"> -->
      <van-cell icon="search" v-for="(text, index) in suggestions" :key="index"
      @click="$emit('search',text)"
      >
        <div slot="title" v-html="highlight(text)"></div>
      </van-cell>
    <!-- </div> -->
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
export default {
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [], // 联想建议数据列表
      timer: null,
    //   isshow: 1,
    };
  },
  watch: {
    searchText: {
      handler(newName, oldName) {
        if (this.timer) {
          //   alert('存在')
        //   console.log("存在");
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            // this.$emit('closeresult')
          this.loadSearchSuggestions(newName);
        }, 1000);

        // ...
        // this.loadSearchSuggestions(newName);
      },
      immediate: true,
    },
  },
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q);
        this.suggestions = data.data.options;
      } catch (err) {
        this.$toast("数据获取失败，请稍后重试");
      }
    },
    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`;

      // 正则表达式 // 中间的内容都会当作匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      // RegExp 正则表达式构造函数
      //    参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      //    参数2：匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, "gi");
      if (text != null) {
        // this.isshow = 1;
        console.log(this.isshow);
        return text.replace(reg, highlightStr);
      } else {
        // this.isshow = null
        this.suggestions=[]
        console.log(2);
        return;
      }
    },
  },
};
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>