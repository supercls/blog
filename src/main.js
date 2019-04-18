import Vue from "vue";
import App from "./App.vue";
import VueRouter from 'vue-router'
import routersList from './router.js'
import store from "./store/index.js";
import NProgress from 'nprogress'
import ElementUI from 'element-ui';
import "./registerServiceWorker";
import "./styles/npgroress.css"
import "./styles/reset.scss"
import 'element-ui/lib/theme-chalk/index.css';
import "./styles/index.less"
import FastClick from 'fastclick'   //fastclick
import { getUser } from '@/api/user.js' 
import {setDstoken} from '@/utils/auth'

Vue.use(ElementUI)
Vue.use(VueRouter)
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}
const router = new VueRouter({           //滚动行为监测，返回是否回到原来位置，模拟app端数据缓存
  routes:routersList,
  mode:'hash',                  //默认行为
  //strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {         //路由配置时候meta，参数设置为keeplive,数据不会重新请求
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 } 
    }
  }
})
/*路由钩子*/

router.beforeEach((to,from,next) => {
   NProgress.start();
   next()
})

router.afterEach((to,from,next) =>{
  if(to.meta.title){
    document.title=to.meta.title
  }
  NProgress.done() // 结束Progress
})
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
