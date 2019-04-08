import Vue from "vue";
import App from "./App.vue";
import VueRouter from 'vue-router'
import routersList from './router.js'
import store from "./store/index.js";
// import './styles/mint-ui.styl'
 // import 'element-ui/lib/theme-chalk/index.css';
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

// 获取openId  并直接存储到 localStorage
let openId = '123456';
let userType = '1';  // 1 代表家长 2 代表医生

setDstoken(openId)
localStorage.setItem('userType', userType)
const needRoot= ['Parent','Doctor']   //不需要权限的路由  白名单
let wxData = [] // 接收返回数据

//  判断路由权限
function getRouter() {
  router.beforeEach((to,from,next) => {
    let wxData = JSON.parse(localStorage.getItem('wxData'))
    let isNext = needRoot.indexOf(to.name)
         NProgress.start();
      if (isNext !== -1) {
        next()
      } else {
        if (wxData.length > 0 ) {
          next()
        }else {
          if(to.name == 'User'){
            next();
          }else{
            next({name:'User'});
          }
        }
      }
     
    })
  
  router.afterEach((to,from,next) =>{
    if(to.meta.title){
      document.title=to.meta.title
    }
    NProgress.done() // 结束Progress
  })
  
}


// 获取权限验证并跳转
async function getVerify() {
    let data = {
        openId
    }
    let verifyData = await getUser(data);

    if (verifyData.isSuccess) {
        wxData = verifyData.dtData
        localStorage.setItem('wxData', JSON.stringify(wxData))
        getRouter()
    }
  
}
//getVerify()

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
