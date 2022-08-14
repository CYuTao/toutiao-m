<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      success-duration="500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";
export default {
  //  created(){

  // },
  components: {
    ArticleItem,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: "",
      error: false,
      refreshing: false,
      refreshSuccessText: "刷新成功",
    };
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      try {
        var res = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
        });
        console.log(res);
        console.log(res.data.data.results);
        this.loading = false;
        this.list.push(...res.data.data.results);
        // 4. 判断数据是否全部加载完成
        if (res.data.data.results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = res.data.data.pre_timestamp;
        } else {
          // 没有数据了，将 finished 设置为 true，不再 load 加载更多了
          this.finished = true;
        }
      } catch (err) {
        //   console.log(369);
        //   console.log(err);
        this.loading = false;
        this.error = true;
      }
    },

    async onRefresh() {
      try {
        var res = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
        });
        console.log(res);
        console.log(res.data.data.results);
        console.log("666666666");
        this.list.unshift(...res.data.data.results);
        this.refreshing = false;
        this.refreshSuccessText = `刷新成功，更新了${res.data.data.results.length}条数据`;
      } catch (err) {
        this.refreshSuccessText = "刷新失败";
        this.isreFreshLoading = false;
      }
    },
  },
};
</script>

<style>
.article-list {
  /* height: 100%; */
  height: 530px;
  overflow-y: auto;
}
</style>