<template>
  <div class="my-container">
    <!-- 登录成功 -->
    <div class="header user-info">
      <div class="base-info" v-if="user">
        <div class="left">
          <van-image round   :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>

        <div class="right">
          <van-button size="mini" round><span>编辑资料</span></van-button>
        </div>
      </div>

      <div class="header not-login" v-else>
        <div class="login-btn" @click="$router.push('/login')">
          <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
          <span class="text">登录 / 注册</span>
        </div>
      </div>

      <div class="data-stats">
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <van-grid :column-num="2" class="grid-nav mb-9" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell-group>
      <van-cell title="信息通知" is-link />
      <van-cell title="小智同学" is-link />
      <van-cell
        v-if="user"
        class="logout-cell"
        clickable
        title="退出登录"
        @click="onLogout"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo } from "@/api/user";
export default {
  data() {
    return {
      userInfo: {}, // 用户信息
    };
  },
  computed: {
    ...mapState(["user"]),
  },

  // watch: {
  //   user: {
  //     immediate: true, // 立即执行
  //     deep: true, // 深度监听复杂类型内变化
  //     handler(newVal, oldVal) {
  //       this.loadUserInfo();
  //     },
  //   },
  // },
  created() {
    // 如果用户登录了，则请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo();
    }
  },
  methods: {
    onLogout() {
      this.$dialog
        .confirm({
          title: "确认退出吗",
          // message: "弹窗内容",
        })
        .then(() => {
          // on confirm
          this.$store.commit("setUser", null);
          this.$router.push('/login')
          // alert('61616161')
        })
        .catch(() => {
          // on cancel
        });
    },

    // 获取用户资料
    async loadUserInfo() {
      const res = await getUserInfo();
      this.userInfo = res.data.data;
      console.log(res);
      try {
        const res = await getUserInfo();
        this.userInfo = res.data.data;
        console.log(res.data.data);
      } catch (err) {
        this.$toast("获取数据失败，请稍后重试");
      }
    },
  },
};
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 180.5px;
    background: url("~@/assets/banner.png");
    // background: #000;
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      .mobile-img {
        display: block;
        width: 66px;
        height: 66px;
      }
      .text {
        width: 73px;
        height: 14px;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
  }

  .user-info {
    .base-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 115.5px;
      // background-color: black;
      padding-left: 16px;
      padding-right: 16px;

      .left {
        display: flex;
        align-items: center;

        .van-image {
          height: 66px;
          width: 66px;
          border: 1px solid #fff;
        }
        .name {
          margin-left: 7px;
          width: 77px;
          height: 15px;
          font-family: MicrosoftYaHei;
          font-size: 15px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
    }

    .data-stats {
      display: flex;
      .data-item {
        height: 65px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          margin-bottom: 10px;
          width: 20px;
          height: 13px;
          font-family: ArialMT;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
        }
        .text {
          width: 24px;
          height: 11px;
          font-family: MicrosoftYaHei;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 71px;
      .toutiao {
        font-size: 23px;
      }
      .text {
        font-size: 14px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
    }
  }

  .van-cell {
    height: 50px;
    box-sizing: border-box;
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
    margin-top: 9px;
  }
}
</style>