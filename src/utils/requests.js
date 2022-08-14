import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store'
axios.defaults.baseURL = 'http://toutiao.itheima.net'
axios.transformResponse = [function (data) {
    // 对接收的 data 进行任意转换处理
    try {
        return JSONbig.parse(data)

    } catch (err) {
        return data;

    }
}],

    // 请求拦截器
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        // console.log(store.state);
        const user = store.state.user
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`
        }
        return config
    }, function (error) {
        // Do something with request error
        return Promise.reject(error)
    });
export default axios