import requests from '@/utils/requests'
export const getComments = params => {
    return requests({
        method: 'GET',
        url: '/v1_0/comments',
        // GET 参数使用 params 进行传递
        // 我们写的时候是对象，但是最终发给后端的数据是？
        // axios 会把 params 对象转为 key=value?key=value 的格式放到 url 中发送
        params
    })
}

/**
 * 评论点赞
 */
export const addCommentLike = target => {
    return requests({
        method: 'POST',
        url: '/v1_0/comment/likings',
        data: {
            target
        }
    })
}

/**
 * 取消评论点赞
 */
export const deleteCommentLike = target => {
    return requests({
        method: 'DELETE',
        url: `/v1_0/article/likings/${target}`
    })
}

/**
* 发布文章评论或评论回复
*/
export const addComment = data => {
    return requests({
        method: 'POST',
        url: '/v1_0/comments',
        data
    })
}
