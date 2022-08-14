<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        slot="default"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :column-num="4" :border="false">
      <van-grid-item
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          class="my-grid"
          v-show="isEdit && !fiexdChannels.includes(channel.id)"
        ></van-icon>
        <span class="text" :class="{ active: index === active }" slot="text">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <van-cell class="van-cell2">
      <div slot="title" class="title-text title-text2">频道推荐</div>
    </van-cell>
    <van-grid :column-num="4" :border="false">
      <van-grid-item
        v-for="(channel, index) in recommendChannels"
        icon="plus"
        :key="index"
        :text="channel.name"
        class="recommend-grid"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from "@/api/channel";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  created() {
    this.loadAllChannels();
  },
  data() {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态的显示
      fiexdChannels: [0], // 固定频道，不允许删除
    };
  },
  computed: {
    ...mapState(["user"]),
    recommendChannels() {
      return this.allChannels.filter((channel) => {
        return !this.myChannels.find((myChannel) => {
          return channel.id === myChannel.id;
        });
      });
    },
  },
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels();
        this.allChannels = data.data.channels;
      } catch (err) {
        this.$toast("数据获取失败");
      }
    },

    async onAddChannel(channel) {
      this.myChannels.push(channel);
      if (this.user) {
        // 用户已登录
        try {
          await addUserChannel({
            id: channel.id, // 频道ID
            seq: this.myChannels.length, // 序号
          });
        } catch (err) {
          this.$toast("保存失败，请稍后重试");
        }
      } else {
        // 未登录，把数据存储到本地
        setItem("TOUTIAO_CHANNELS", this.myChannels);
      }
    },

    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        // 1. 如果是固定频道，则不删除
        if (this.fiexdChannels.includes(channel.id)) {
          return;
        }

        // 2. 删除频道项
        this.myChannels.splice(index, 1);

        // 3. 如果删除的激活频道之前的频道，则更新激活的频道项
        // 参数1：要删除的元素的开始索引（包括）
        // 参数2：删除的个数，如果不指定，则从参数1开始一直删除到最后
        if (index <= this.active) {
          // 让激活频道的索引 - 1
          this.$emit("update-active", this.active - 1, true);
        }
        this.deleteChannel(channel);
      } else {
        this.$emit("update-active", index, false);
      }
    },
    async deleteChannel(channel) {
      try {
        if (this.user) {
          // 已登录，则将数据更新到线上
          console.log("调接口");
          await deleteUserChannel(channel.id);
        } else {
          // 未登录，将数据更新到本地
          setItem("TOUTIAO_CHANNELS", this.myChannels);
        }
      } catch (err) {
        this.$toast("操作失败，请稍后重试");
      }
    },
  },
};
</script>

<style scoped lang='less'>
.channel-edit {
  padding: 44px 0;
  .edit-btn {
    width: 50px;
    height: 23px;
    font-size: 14px;
  }
  .van-cell2 {
    margin-top: 28px;
  }
  .title-text .text {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 18px;
    letter-spacing: 1px;
    color: #333333;
    // &:nth-of-type(2n){
    //     margin-top: 14px;
    // }
  }
  .active {
    color: red;
  }
  .van-cell {
    line-height: normal;
    // vertical-align:text-top ;
  }
  .title-text {
    margin-bottom: 14px;
  }
  /deep/ .van-grid {
    //   justify-content: space-between;
    .van-grid-item {
      max-width: 80px;
      height: 43px;
      margin-left: 11px;
      //   &:nth-of-type(2n){
      //       margin-top: 15px;
      //   }

      margin-top: 15px;
      .van-grid-item__content {
        background-color: #f4f5f6;
        border-radius: 3px;
        white-space: nowrap;
      }
    }
  }

  /deep/.my-grid {
    position: absolute;
    right: -46px;
    top: -19px;
    font-size: 15px;
    color: #cacaca;
    z-index: 2;
  }

  /deep/ .recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      .van-icon-plus {
        font-size: 14px;
        margin-right: 3px;
      }
      .van-grid-item__text {
        margin-top: 0px;
      }
    }
  }
}
</style>