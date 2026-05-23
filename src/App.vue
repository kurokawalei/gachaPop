<template>
  <SiteHeader />
  <router-view />
  <SiteFooter />
  <Teleport to="body">
    <div v-if="toastVisible" class="toast show">{{ toastMessage }}</div>
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import { useToast } from './composables/useToast'
import { useCartStore } from './stores/cartStore'
import { useWarehouseStore } from './stores/warehouseStore'

const { toastMessage, toastVisible } = useToast()
const cartStore = useCartStore()
const warehouseStore = useWarehouseStore()

watch(() => cartStore.totalQty, () => {
  cartStore.items
})
</script>
