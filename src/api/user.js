import requests from '@/utils/requests'
import store from '@/store'
export const login = data => {
  return requests({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: data
  })
}

/**
 * 发送验证码
 * 注意：每手机号每分钟1次
 */
export const sendSms = mobile => {
  return requests({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}


/**
 * 获取用户自己的信息
 */
export const getUserInfo = () => {
  return requests({
    method: 'GET',
    url: '/v1_0/user/profile',
    // headers: {
    //   // 注意：该接口需要授权才能访问
    //   //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })

}


/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
  return requests({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}


/**
 * 关注用户
 */
export const addFollow = target => {
  return requests({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}
/**
 * 取消关注用户
 */
export const deleteFollow = target => {
  return requests({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}
