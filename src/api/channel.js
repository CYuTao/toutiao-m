import requests from '@/utils/requests'
/**
 * 获取所有频道列表
 */
export const getAllChannels = () => {
    return requests({
        method: 'GET',
        url: '/v1_0/channels'
    })
}

// 添加频道
export const addUserChannel = channel => {
    return requests({
      method: 'PATCH',
      url: '/v1_0/user/channels',
      data: {
        channels: [channel]
      }
    })
  }
  /**
 * 删除用户指定频道
 */
export const deleteUserChannel = channelId => {
    return requests({
      method: 'DELETE',
      url: `/v1_0/user/channels/${channelId}`
    })
  }