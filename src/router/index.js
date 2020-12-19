import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login/index'
import mainpage from '@/view/mainpage/index'
import page1 from '@/view/page/page1'
import page2 from '@/view/page/page2'
import page3 from '@/view/page/page3'
import page4 from '@/view/page/page4'
import page5 from '@/view/page/page5'
import page6 from '@/view/page/page6'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainpage',
      component: mainpage,
      children:[
        {
          path: 'page1',
          name: 'page1',
          component: page1
        },
        {
          path: 'page2',
          name: 'page2',
          component: page2
        },
        {
          path: 'page3',
          name: 'page3',
          component: page3
        },        {
          path: 'page4',
          name: 'page4',
          component: page4
        },
        {
          path: 'page5',
          name: 'page5',
          component: page5
        },
        {
          path: 'page6',
          name: 'page6',
          component: page6
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
