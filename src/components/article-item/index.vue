<template>
  <div>
    <van-cell class="article-item" :to="`/article/${article.art_id}`">
      <div slot="title" class="title van-multi-ellipsis--l2">
        {{ article.title }}
      </div>
      <div slot="label">
        <div v-if="article.cover.type === 3" class="cover-wrap">
          <div
            class="cover-item"
            v-for="(img, index) in article.cover.images"
            :key="index"
          >
            <van-image class="cover-item-img" fit="cover" :src="img" />
          </div>
        </div>
        <div>
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>
      <van-image
        v-if="article.cover.type === 1"
        slot="default"
        fit="cover"
        :src="article.cover.images[0]"
        class="right-cover"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="less" >
.article-item {
  .title {
    font-family: ArialMT;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #3a3a3a;
  }
  .cover-wrap {
    display: flex;
    padding: 15px 0px;
    .cover-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 73px;
      }
    }
  }
  span {
    margin-left: 12px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    font-weight: normal;
    letter-spacing: 1px;
    color: #b4b4b4;
  }
  /deep/ .van-cell__value {
    max-width: 116px;
    height: 73px;
    .right-cover {
      max-width: 116px;
      height: 73px;
      margin-right: 13px;
    }
  }
}
</style>