<template>
  <main>
    <div class="container">
      <div class="breadcrumb">
        <router-link to="/">首頁</router-link>
        <span>/</span>
        <span>商品一覽</span>
      </div>
    </div>

    <div class="page-header">
      <div class="container">
        <h1>商品一覽</h1>
        <p>共18種商品。公仔、鑰匙圈、玩偶、靠墊… 快來找到你的最愛。</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="filter-bar">
          <select v-model="category">
            <option value="">全部分類</option>
            <option>公仔</option>
            <option>鑰匙圈</option>
            <option>玩偶</option>
            <option>靠墊</option>
            <option>居家</option>
            <option>文具</option>
            <option>時鐘</option>
            <option>穿戴</option>
            <option>配件</option>
          </select>
          <select v-model="sort">
            <option value="">最新上架</option>
            <option value="price-asc">價格由低到高</option>
            <option value="price-desc">價格由高到低</option>
          </select>
          <input type="text" class="search-input" v-model="search" placeholder="搜尋商品…">
        </div>

        <div class="filter-loading-bar" :class="{ active: filterLoading }"></div>

        <div class="grid-4">
          <div class="product-card" v-for="p in filteredProducts" :key="p.name">
            <div class="product-card-image">
              <img :src="p.image" :alt="p.name" style="width:100%;height:100%;object-fit:cover" loading="lazy">
            </div>
            <div class="product-card-body">
              <span v-if="p.tag" class="tag tag-accent" style="margin-bottom:var(--space-xs)">{{ p.tag }}</span>
              <h3>{{ p.name }}</h3>
              <div class="series">{{ p.series }}</div>
              <div class="price">NT$ {{ p.price.toLocaleString() }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Product } from '../types'

const category = ref('')
const sort = ref('')
const search = ref('')
const filterLoading = ref(false)

watch(category, () => {
  filterLoading.value = true
  setTimeout(() => { filterLoading.value = false }, 400)
})

const products: Product[] = [
  { id: 'p01', name: '三花貓鑰匙圈', series: '春季系列', price: 120, image: '/mpbzfcpd-cat_product_01.png', category: '鑰匙圈' },
  { id: 'p02', name: '白貓公仔', series: '春季系列', price: 120, image: '/mpbzfcpp-cat_product_02.png', category: '公仔' },
  { id: 'p03', name: '黑貓夜燈公仔', series: '春季系列', price: 480, image: '/mpbzfcq0-cat_product_03.png', tag: '限定', category: '公仔' },
  { id: 'p04', name: '貓掌肉球玩偶', series: '春季系列', price: 120, image: '/mpbzfcq9-cat_product_04.png', category: '玩偶' },
  { id: 'p05', name: '虎斑貓鑰匙圈', series: '春季系列', price: 120, image: '/mpbzfcqj-cat_product_05.png', category: '鑰匙圈' },
  { id: 'p06', name: '摺耳貓公仔', series: '春季系列', price: 280, image: '/mpbzfcqr-cat_product_06.png', category: '公仔' },
  { id: 'p07', name: '貓尾巴筆', series: '文具系列', price: 150, image: '/mpbzfcqz-cat_product_07.png', category: '文具' },
  { id: 'p08', name: '貓咪手帳筆記本（3冊組）', series: '文具系列', price: 190, image: '/mpbzfcr7-cat_product_08.png', category: '文具' },
  { id: 'p09', name: '貓肉球原子筆（3色組）', series: '文具系列', price: 170, image: '/mpbzfcrh-cat_product_09.png', category: '文具' },
  { id: 'p10', name: '夜光鑰匙圈', series: '夜森林系列', price: 180, image: '/mpbzfcrq-cat_product_10.png', category: '鑰匙圈' },
  { id: 'p11', name: '夜光森林貓咪杯墊（4入）', series: '夜森林系列', price: 220, image: '/mpbzfcs2-cat_product_11.png', category: '居家' },
  { id: 'p12', name: '夜光貓手機掛繩', series: '夜森林系列', price: 250, image: '/mpbzfcsa-cat_product_12.png', category: '穿戴' },
  { id: 'p13', name: '貓咪造型小時鐘', series: '派對系列', price: 220, image: '/mpbzfct5-cat_product_13.png', category: '時鐘' },
  { id: 'p14', name: '貓耳造型隨身鏡', series: '派對系列', price: 350, image: '/mpbzfcte-cat_product_14.png', category: '配件' },
  { id: 'p15', name: '貓掌肉球靠墊', series: '人氣周邊', price: 350, image: '/mpbzfctn-cat_product_15.png', category: '靠墊' },
  { id: 'p16', name: '貓耳毛絨髮帶', series: '人氣周邊', price: 160, image: '/mpbzfctv-cat_product_16.png', category: '穿戴' },
  { id: 'p17', name: '貓咪環保購物袋（摺疊款）', series: '人氣周邊', price: 240, image: '/mpbzfcu5-cat_product_17.png', category: '配件' },
  { id: 'p18', name: '流體貓吊飾（隨機款）', series: '人氣周邊', price: 150, image: '/mpbzfcue-cat_product_18.png', category: '配件' },
]


const filteredProducts = computed(() => {
  let result = [...products]
  if (category.value) {
    result = result.filter(p => p.category === category.value)
  }
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(p => p.name.toLowerCase().includes(q) || p.series.toLowerCase().includes(q))
  }
  if (sort.value === 'price-asc') result.sort((a, b) => a.price - b.price)
  if (sort.value === 'price-desc') result.sort((a, b) => b.price - a.price)
  return result
})
</script>

<style scoped>
.filter-loading-bar {
  height: 3px;
  background: var(--accent);
  width: 0%;
  border-radius: 0 0 3px 3px;
  margin-top: -1px;
  transition: width 0.35s ease;
}
.filter-loading-bar.active {
  width: 100%;
}
</style>
