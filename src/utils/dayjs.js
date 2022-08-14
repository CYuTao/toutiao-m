import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// dayjs 默认语言是英文，我们这里配置为中文
dayjs.locale('zh-cn') // 全局使用
import relativeTime from 'dayjs/plugin/relativeTime'


// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
// console.log(dayjs().to(dayjs('2015'))) // 2 年以前
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})