import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/icon.less'
import './styles/index.less'
import 'lib-flexible'
// 加载 dayjs 初始化配置
import './utils/dayjs'
import {
  NavBar, Form, Field, Button, CountDown, Toast, Tabbar, TabbarItem,
  Image as VanImage, Icon, Grid, GridItem, Cell, CellGroup, Dialog,
  Tab, Tabs,List,PullRefresh,Popup,Search ,Loading ,Divider,ImagePreview  
} from 'vant'
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(CountDown)
Vue.use(Toast)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(VanImage)
Vue.use(Icon)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)
Vue.use(PullRefresh)
// Vue.use(Cell)
Vue.use(Popup)
Vue.use(Search)
Vue.use(Loading)
Vue.use(Divider)
Vue.use(ImagePreview)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
