<template>
  <header class="site-header">
    <div class="header-inner">
      <router-link to="/" class="logo">Gacha<span>Pop</span></router-link>
      <nav class="nav">
        <router-link to="/products">商品一覽</router-link>
        <router-link to="/gacha">開始扭蛋</router-link>
        <router-link to="/warehouse">
          個人倉庫
          <span class="warehouse-count cart-badge" :style="{ display: warehouseCount > 0 ? 'inline-flex' : 'none' }">{{ warehouseCount }}</span>
        </router-link>
        <router-link to="/cart" class="nav-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span class="cart-badge cart-count" :style="{ display: cartCount > 0 ? 'inline-flex' : 'none' }">{{ cartCount }}</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { useWarehouseStore } from '../stores/warehouseStore'

const cartStore = useCartStore()
const warehouseStore = useWarehouseStore()

const cartCount = computed(() => cartStore.totalQty)
const warehouseCount = computed(() => warehouseStore.count)
</script>
