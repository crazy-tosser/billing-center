import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import main from '../pages/MainPage.vue'
import NotFound from '../pages/404.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: main
  },
  {
    path: '/edit/:id',
    name: 'edit',
    props: true,
    component: () => import('@/pages/EditPage.vue')
  },
  { 
    path: '/404', 
    name: '404', 
    component: NotFound, 
  }, { 
    path: '*', 
    redirect: '/404' 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
