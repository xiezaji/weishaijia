import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import CanteenPage from './pages/CanteenPage.vue'
import WindowPage from './pages/WindowPage.vue'
import FilterPage from './pages/FilterPage.vue'
import ShopPage from './pages/ShopPage.vue'
import AboutPage from './pages/AboutPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage, meta: { title: '首页', hideTopbar: true } },
    { path: '/canteen/:canteenId', name: 'canteen', component: CanteenPage, meta: { title: '食堂' } },
    {
      path: '/canteen/:canteenId/window/:windowId',
      name: 'window',
      component: WindowPage,
      meta: { title: '窗口' },
    },
    { path: '/filter', name: 'filter', component: FilterPage, meta: { title: '筛选' } },
    { path: '/shop/:shopId', name: 'shop', component: ShopPage, meta: { title: '周边店铺' } },
    { path: '/about', name: 'about', component: AboutPage, meta: { title: '关于' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.path === from.path) return false
    return savedPosition ?? { top: 0 }
  },
})

export default router
