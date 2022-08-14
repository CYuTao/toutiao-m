<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <template #title>
        <van-button type="info" class="search-btn" icon="search" to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" animated swipeable color="#3296fa">
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <ArticleList :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChennelEditShow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道列表 -->
    <van-popup
      v-model="isChennelEditShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
    >
      <ChannelEdit
        :myChannels="channels"
        :active="active"
        @update-active="onUpdateActive"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import { mapState } from "vuex";
import ArticleList from "./components/article-list";
import ChannelEdit from "./components/channel-edit.vue";
import { getItem } from "@/utils/storage";
export default {
  created() {
    this.loadChannels();
  },
  data() {
    return {
      active: 0,
      channels: [], // 频道列表
      isChennelEditShow: false,
    };
  },
  components: {
    ArticleList,
    ChannelEdit,
  },
  computed: {
    ...mapState(["user"]),
  },

  methods: {
    async loadChannels() {
      if (this.user) {
        try {
          const { data } = await getUserChannels();
          this.channels = data.data.channels;
        } catch (err) {
          this.$toast("获取频道数据失败");
        }
      } else {
        // 未登录，判断是否有本地的频道列表数据
        const localChannels = getItem("TOUTIAO_CHANNELS");
        //    有，拿来使用
        if (localChannels) {
          this.channels = localChannels;
        } else {
          try {
            const { data } = await getUserChannels();
            this.channels = data.data.channels;
          } catch (err) {
            this.$toast("获取频道数据失败");
          }
        }
      }
    },

    onUpdateActive(index, isChennelEditShow = true) {
      this.active = index;
      this.isChennelEditShow = isChennelEditShow;
    },
  },
};
</script >


<style scoped  lang="less">
.home-container {
  padding-top: 87px;
  padding-bottom: 49px;
}
.home-container {
  // padding-top: 87px;
  // padding-bottom: 50px;
  /deep/.van-nav-bar__title {
    max-width: unset;

    .search-btn {
      border: none;
      width: 278px;
      height: 32px;
      // background-color: #ffffff;
      background-color: #5babfb;
      border-radius: 16px;
      font-size: 14px;
      .van-icon {
        font-size: 16px;
      }
    }
  }
}
/deep/ .van-tabs__wrap {
  height: 42px;
  position: fixed;
  top: 46px;
  left: 0px;
  right: 0px;
  z-index: 1;
  van-tab--active {
    font-family: MicrosoftYaHei;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
  }
  .van-tabs {
    // margin-right: 33px;
    // padding-right: 33px !important;
    .van-tab {
      min-width: 100px;
      // height: 42px;
      border-right: 1px solid #edeff3;
      font-family: MicrosoftYaHei;
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #777777;
    }
  }
  .van-tabs__line {
    width: 16px !important;
    height: 3px;
    background-color: #3296fa;
    border-radius: 2px;
    bottom: 19px;
  }
  .placeholder {
    // flex-shrink: 0;
    // width: 33px;
    min-width: 33px;
    height: 82px;
  }
  .hamburger-btn {
    position: fixed;
    // left: 356.25px;
    right: 0px;
    // top: 57px;
    width: 33px;
    height: 41px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;

    i {
      width: 20px;
      height: 17px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 58px;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>