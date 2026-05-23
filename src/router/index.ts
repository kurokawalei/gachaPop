import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/gachaPop/'),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/products', name: 'products', component: () => import('../views/ProductsView.vue') },
    { path: '/product-detail', name: 'product-detail', component: () => import('../views/ProductDetailView.vue') },
    { path: '/gacha', name: 'gacha', component: () => import('../views/GachaView.vue') },
    { path: '/cart', name: 'cart', component: () => import('../views/CartView.vue') },
    { path: '/warehouse', name: 'warehouse', component: () => import('../views/WarehouseView.vue') },
    { path: '/account', name: 'account', component: () => import('../views/AccountView.vue') },
  ],
})

export default router
