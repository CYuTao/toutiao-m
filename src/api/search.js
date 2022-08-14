import requests from '@/utils/requests'
export const getSearchSuggestions = q => {
    return requests({
        method: 'GET',
        url: "/v1_0/suggestion",
        params: {
            q
        }
    })
}

// 获取搜索结果
export const getSearchResult = params => {
    return requests({
        method: 'GET',
        url: '/v1_0/search',
        params
    })
}