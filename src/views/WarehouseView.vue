<template>
  <main>
    <div class="container">
      <div class="breadcrumb">
        <router-link to="/">首頁</router-link>
        <span>/</span>
        <span>個人倉庫</span>
      </div>
    </div>

    <div class="page-header">
      <div class="container">
        <h1>個人倉庫</h1>
        <p>從扭蛋獲得的商品暫存處。已加入購物車的商品將從此處移除。</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div id="warehouse-empty" class="empty-state" v-if="store.items.length === 0">
          <div class="empty-icon">🏪</div>
          <h3>倉庫是空的</h3>
          <p style="color:var(--muted);margin:var(--space-sm) 0">去扭蛋機抽些商品吧！</p>
          <router-link to="/gacha" class="btn" style="margin-top:var(--space-md)">開始扭蛋</router-link>
        </div>

        <div id="warehouse-items" class="warehouse-grid" v-if="store.items.length > 0">
          <div class="warehouse-item" v-for="item in store.items" :key="item.wId" :class="{ rare: item.rarity === 4 }">
            <div class="warehouse-item-image">
              <img :src="item.img" :alt="item.name" style="width:100%;height:100%;object-fit:cover" loading="lazy">
            </div>
            <div class="warehouse-item-body">
              <h4>{{ item.name }}</h4>
              <div style="font-size:var(--text-sm);color:var(--muted)">
                {{ item.rarity === 4 ? '★ 稀有' : '一般' }} ｜ 取得: {{ formatTime(item.pullTime) }}
              </div>
            </div>
            <div class="warehouse-item-actions">
              <button class="btn btn-sm" @click="addToCart(item.wId)">加入購物車</button>
              <button class="btn btn-sm" @click="store.removeFromWarehouse(item.wId)" >刪除</button>
            </div>
          </div>
        </div>

        <div id="warehouse-actions" style="text-align:center;margin-top:var(--space-lg)" v-if="store.items.length > 0">
          <button class="btn btn-primary" @click="addAllToCart">全部加入購物車</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
import { useWarehouseStore } from '../stores/warehouseStore'
import { useToast } from '../composables/useToast'

const store = useWarehouseStore()
const cartStore = useCartStore()
const { showToast } = useToast()

function formatTime(ts: number) {
  return new Date(ts).toLocaleString('zh-TW', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function addToCart(wId: string) {
  const idx = store.items.findIndex(w => w.wId === wId)
  if (idx === -1) return
  const item = store.items[idx]
  const cartId = 'wh_' + item.id + '_' + item.pullTime
  cartStore.addToCart(cartId, item.name, 0, item.img, { gachaReward: true })
  store.removeFromWarehouse(wId)
  showToast(`已加入購物車：${item.name}（扭蛋轉出）`)
}

function addAllToCart() {
  if (store.items.length === 0) return
  const count = store.items.length
  for (const item of store.items) {
    const cartId = 'wh_' + item.id + '_' + item.pullTime
    cartStore.addToCart(cartId, item.name, 0, item.img, { gachaReward: true })
  }
  store.clearWarehouse()
  showToast(`已將 ${count} 件倉庫商品全部加入購物車`)
}
</script>
