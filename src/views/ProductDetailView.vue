<template>
  <main>
    <div class="container">
      <div class="breadcrumb">
        <router-link to="/">首頁</router-link>
        <span>/</span>
        <router-link to="/products">商品一覽</router-link>
        <span>/</span>
        <span>黑貓夜燈公仔</span>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="detail-grid">
          <div class="detail-gallery">
            <div class="detail-gallery-main">
              <img src="/mpbzfcq0-cat_product_03.png" alt="Black cat night light figure" style="width:100%;height:100%;object-fit:cover" loading="lazy">
            </div>
            <div class="detail-gallery-thumbs">
              <div class="active"><img src="/mpbzfcq0-cat_product_03.png" alt="正面" style="width:100%;height:100%;object-fit:cover" loading="lazy"></div>
              <div><img src="/mpbzfcpd-cat_product_01.png" alt="夜光效果" style="width:100%;height:100%;object-fit:cover" loading="lazy"></div>
              <div><img src="/mpbzfcq9-cat_product_04.png" alt="包裝" style="width:100%;height:100%;object-fit:cover" loading="lazy"></div>
              <div><img src="/mpbzfcqr-cat_product_06.png" alt="尺寸對比" style="width:100%;height:100%;object-fit:cover" loading="lazy"></div>
            </div>
          </div>

          <div class="detail-info">
            <span class="tag tag-accent" style="margin-bottom:var(--space-sm)">限定</span>
            <h1>黑貓夜燈公仔</h1>
            <div style="color:var(--muted);font-size:var(--text-sm);margin-bottom:var(--space-md)">春季系列 ｜ 隱藏版</div>
            <div class="price-large">NT$ 480</div>

            <div class="meta-row">
              <span>庫存：僅剩3件</span>
              <span>分類：公仔</span>
            </div>

            <p style="color:var(--muted);margin:var(--space-md) 0">
              在黑暗中微微發光，特別的夜光仕樣公仔。春季系列的隱藏版商品。尺寸：約7cm。材質：ATBC-PVC。
            </p>

            <div style="margin:var(--space-md) 0">
              <span style="font-family:var(--font-mono);font-size:var(--text-sm);display:block;margin-bottom:var(--space-xs)">數量</span>
              <div class="qty-selector">
                <button @click="qty = Math.max(1, qty - 1)">−</button>
                <span>{{ qty }}</span>
                <button @click="qty = Math.min(10, qty + 1)">+</button>
              </div>
            </div>

            <div class="action-group">
              <button class="btn btn-primary" @click="handleAddToCart">加入購物車</button>
              <router-link to="/gacha" class="btn">用扭蛋抽</router-link>
            </div>

            <div style="font-size:var(--text-sm);color:var(--muted);border-top:1px solid var(--border);padding-top:var(--space-md)">
              <div>滿NT$1,000免運費</div>
              <div>一般3~5個工作天內出貨</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="border-top:1px solid var(--border)">
      <div class="container">
        <div class="kicker">You May Also Like</div>
        <h2 style="margin-bottom:var(--space-lg)">相關商品</h2>
        <div class="grid-4">
          <div class="product-card" v-for="item in relatedProducts" :key="item.name">
            <div class="product-card-image">
              <img :src="item.image" :alt="item.name" style="width:100%;height:100%;object-fit:cover" loading="lazy">
            </div>
            <div class="product-card-body">
              <h3>{{ item.name }}</h3>
              <div class="series">{{ item.series }}</div>
              <div class="price">NT$ {{ item.price.toLocaleString() }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { useToast } from '../composables/useToast'

const qty = ref(1)
const cartStore = useCartStore()
const { showToast } = useToast()

const relatedProducts = [
  { name: '白貓公仔', series: '春季系列', price: 120, image: '/mpbzfcpp-cat_product_02.png' },
  { name: '貓掌肉球玩偶', series: '春季系列', price: 120, image: '/mpbzfcq9-cat_product_04.png' },
  { name: '夜光鑰匙圈', series: '夜森林系列', price: 180, image: '/mpbzfcrq-cat_product_10.png' },
  { name: '貓咪造型小時鐘', series: '派對系列', price: 220, image: '/mpbzfct5-cat_product_13.png' },
]

function handleAddToCart() {
  const name = '黑貓夜燈公仔'
  for (let i = 0; i < qty.value; i++) {
    cartStore.addToCart('dtl-night-cat', name, 480, '/mpbzfcq0-cat_product_03.png')
  }
  showToast(`已加入購物車：${name} x${qty.value}`)
}
</script>
