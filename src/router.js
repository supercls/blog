const Index = r => require.ensure([], () => r(require('@/views/Home.vue')), 'Index')
const login = r => require.ensure([], () => r(require('@/views/login.vue')), 'login')
const register = r => require.ensure([], () => r(require('@/views/register.vue')), 'register')
const article = r => require.ensure([], () => r(require('@/views/article.vue')), 'article')
const articleInfo = r => require.ensure([], () => r(require('@/views/articleInfo.vue')), 'articleInfo')
import layout from '@/views/layout'

export default [
  {
    path: '*',
  },
  {
    path: '/', //首页
    redirect: '/Index',
    meta: {
      title: '首页'
    }
  },
  {
  	path:'/Index',
  	component:layout,
  	name:'Index',
    meta: {
        title: '首页'
    },
    children:[
      {
        path:'/Index/article',
        component:article
      },
			{
			  path:'/Index/articleInfo',
			  component:articleInfo
			}
    ]  
  },
  {
    path:'/login',
    component:login,
    name:'login',
    meta: {
        title: '登录'
    }  
  },
  {
    path:'/register',
    component:register,
    name:'register',
    meta: {
        title: '注册'
    }  
  }
]
