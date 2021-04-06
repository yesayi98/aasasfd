import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Account from '@/components/Account'
import Update from '@/components/Update'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Register from '@/components/Register'
import store from '../store'
import auth from './middleware/auth'

Vue.use(Router)
const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        layout: 'main',
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        layout: 'main',
        middleware: [
            auth
        ]
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        layout: 'main',
        middleware: [
            auth
        ]
      },
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      meta: {
        layout: 'main',
        middleware: [
              auth
          ]
      },
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
      meta: {
        layout: 'main',
        middleware: [
              auth
          ]
      },
    },
    {
      path: '/update',
      name: 'Update',
      component: Update,
      meta: {
          layout: 'main',
          middleware: [
              auth
          ]
      },
    }
  ],
})
router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
        return next()
    }
   const middleware = to.meta.middleware;
   const context = {
       to,
       from,
       next,
       store
   }

   return middleware[0]({
       ...context
   })
});
export default router
