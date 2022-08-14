<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar">
       <van-icon
        slot="left"
        name="cross"
        @click="$router.back()"
      />
    </van-nav-bar>

    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        placeholder="请输入手机号码"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="60 * 1000"
            format="ss秒"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            size="small"
            type="default"
            round
            class="send-sms-btn"
            native-type="button"
            @click="onSendSms"
            v-else
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>

    <div class="yinsi">
      <span>隐私条款</span>
    </div>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";
export default {
  data() {
    return {
      user: {
        // mobile: "13911111111", // 手机号
        mobile: "13911111111",
        code: "246810", // 验证码
      },
      // 校验规则
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      isCountDownShow: false, // 是否展示倒计时
    };
  },
  methods: {
    async onSubmit() {
      //   console.log(this.user);
      //   console.log(values);
      //   await login(this.login)
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 持续时间，默认 2000，0 表示持续展示不关闭
      });
      try {
        const res = await login(this.user);
        console.log(res);
        console.log(this.user.mobile);
        this.$store.commit("setUser", res.data.data);
        this.$toast.success("登录成功");
        this.$router.push('/')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("登录失败，请稍后重试");
        }
      }
    },
    // 发送验证码
    async onSendSms() {
      // 校验手机号格式
      this.$refs.loginForm.validate("mobile");
      this.isCountDownShow = true;

      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile);
        this.$toast("发送成功");
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false;
        if (err.response.status === 429) {
          this.$toast("发送太频繁了，请稍后重试");
        } else {
          this.$toast("发送失败，请稍后重试");
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 18px;
  }
  .send-sms-btn {
    border: 0px;
    width: 76px;
    height: 23px;
    background-color: #ededed;
    border-radius: 12px;
    font-size: 3px;
    // line-height: 23px;
    // letter-spacing: 1px;
    color: #666666;
    background-color: #ededed;
  }
  .login-btn {
    background-color: #6db4fb;
    border-radius: 5px;
    border: none;
  }
  .yinsi {
    width: 100%;
    position: absolute;
    left: 0px;
    bottom: 27px;
    // margin: 0 auto;
    font-family: MicrosoftYaHei;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 18px;
    letter-spacing: 1px;
    color: #666666;
    text-align: center;
  }
}
</style>