import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store';

const routes = [
  {
    path: '/',
    alias: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'AddProduct',
    component: () => import('../views/AddProduct.vue')
  },
  {
    path: '/bonus',
    name: 'Bonus',
    component: () => import('../views/Bonus.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue')
  },
  {
    path: '/order-complete',
    name: 'OrderComplete',
    component: () => import('../views/OrderComplete.vue')
  },
  {
    path: '/publish-complete',
    name: 'PublishComplete',
    component: () => import('../views/PublishComplete.vue')
  },
  {
    path: '/manage-products',
    name: 'ManageProducts',
    component: () => import('../views/ManageProducts.vue')
  }]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active"
})

const waitForStorageToBeReady = async (to, from, next) => {
  await store.restored;
  next();
};

router.beforeEach(waitForStorageToBeReady)

export default router
