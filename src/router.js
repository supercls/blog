const Index = r => require.ensure([], () => r(require('@/views/Home.vue')), 'Index')
const login = r => require.ensure([], () => r(require('@/views/login.vue')), 'login')
const register = r => require.ensure([], () => r(require('@/views/register.vue')), 'register')

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
  	component:Index,
  	name:'Index',
        meta: {
            title: '首页'
        }  
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
