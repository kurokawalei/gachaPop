<template>
  <main>
    <div class="container">
      <div class="breadcrumb">
        <router-link to="/">首頁</router-link>
        <span>/</span>
        <span>開始扭蛋</span>
      </div>
    </div>

    <div class="page-header">
      <div class="container">
        <h1>開始扭蛋</h1>
        <p>「春季系列」共5種＋隱藏版。每次NT$120，隨時隨地享受扭蛋體驗。</p>
      </div>
    </div>

    <section class="section gacha-section">
      <div class="container container-narrow">
        <div class="gacha-machine">
          <div class="gacha-machine-visual">
            <div class="gacha-orb" :class="{ spinning: isSpinning }">{{ orbEmoji }}</div>
            <div style="font-family:var(--font-mono);font-size:var(--text-sm);color:var(--muted);letter-spacing:0.08em;text-transform:uppercase;margin-top:var(--space-sm)">
              春季系列 扭蛋機
            </div>
            <div style="margin-top:var(--space-sm);font-family:var(--font-mono);font-size:var(--text-sm);color:var(--accent);letter-spacing:0.03em">
              每次 NT$ 120
            </div>
          </div>
        </div>

        <div class="gacha-controls">
          <button :class="gachaCount === 1 ? 'btn btn-primary' : 'btn'" @click="gachaCount = 1">單抽</button>
          <button :class="gachaCount === 10 ? 'btn btn-primary' : 'btn'" @click="gachaCount = 10">十連抽</button>
        </div>

        <div style="display:flex;gap:var(--space-md);justify-content:center;margin-bottom:var(--space-lg)">
          <button class="btn btn-primary" @click="performGacha" :disabled="isSpinning">
            開始扭蛋！
          </button>
        </div>

        <div v-if="showPaidBadge" class="gacha-paid-badge" style="display:flex;gap:var(--space-sm);justify-content:center;align-items:center;margin-bottom:var(--space-md);font-family:var(--font-mono);font-size:var(--text-sm);color:var(--accent)">
          <span>已付款</span>
        </div>

        <div id="gacha-results" class="gacha-results">
          <template v-if="results.length === 0">
            <div style="grid-column:1/-1;padding:var(--space-xl);color:var(--muted);font-size:var(--text-sm)">
              還沒開始扭蛋。選擇單抽或十連抽，按「開始扭蛋」後付款，抽到的商品可免費加入購物車。
            </div>
          </template>
          <template v-else>
            <div class="gacha-result-item" v-for="r in results" :key="r.pullIndex" :class="{ rare: r.rarity === 4 }">
              <div class="result-icon" style="overflow:hidden">
                <img :src="r.img" :alt="r.name" style="width:100%;height:100%;object-fit:cover" loading="lazy">
              </div>
              <div class="result-name">{{ r.name }}</div>
              <div style="font-family:var(--font-mono);font-size:11px;color:var(--muted);margin-top:2px">
                {{ r.rarity === 4 ? '★ 稀有' : '一般' }}
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;align-items:center;margin-top:6px">
                <button class="btn btn-sm" @click="addToCart(r.pullIndex)" :disabled="isProcessed(r.pullIndex)" style="width:100%">
                  {{ isProcessed(r.pullIndex) ? '已處理' : '加入購物車' }}
                </button>
                <button class="btn btn-sm" @click="moveToWarehouse(r.pullIndex)" :disabled="isProcessed(r.pullIndex)" style="width:100%">
                  {{ isProcessed(r.pullIndex) ? '已處理' : '移至倉庫' }}
                </button>
              </div>
            </div>
            <div style="grid-column:1/-1;text-align:center;margin-top:var(--space-lg);padding-top:var(--space-md);display:flex;gap:var(--space-md);justify-content:center">
              <button class="btn btn-primary" @click="addAllToCart">全部加入購物車</button>
              <button class="btn" @click="moveAllToWarehouse">全部移至倉庫</button>
            </div>
          </template>
        </div>

        <div class="gacha-cost-display" style="font-family:var(--font-mono);font-size:var(--text-sm);color:var(--muted);margin:var(--space-md) 0">{{ costDisplay }}</div>

        <div class="gacha-odds-bar" style="margin-top:var(--space-2xl)">
          <div class="kicker" style="margin-bottom:var(--space-sm)">出現機率</div>
          <div class="odds-row" v-for="item in GACHA_POOL" :key="item.id">
            <span class="odds-label" :style="item.rarity === 4 ? 'color:var(--accent)' : ''">{{ item.name }}</span>
            <div class="odds-track"><div class="odds-fill" :style="{ width: (item.odds * 100) + '%' }"></div></div>
            <span class="odds-pct">{{ (item.odds * 100) }}%</span>
          </div>
          <div style="margin-top:var(--space-md);font-size:var(--text-sm);color:var(--muted);padding:var(--space-md);border:1px solid var(--border)">
            ※十連抽隱藏版出現率2倍提升！
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { GACHA_POOL, useGacha } from '../composables/useGacha'
import { useCartStore } from '../stores/cartStore'
import { useWarehouseStore } from '../stores/warehouseStore'
import { useToast } from '../composables/useToast'

const { lastResults, processedIndexes, isSpinning, gachaCount, gachaPull, markProcessed } = useGacha()
const cartStore = useCartStore()
const warehouseStore = useWarehouseStore()
const { showToast } = useToast()

const results = ref<ReturnType<typeof gachaPull>>([])
const showPaidBadge = ref(false)
const costDisplay = ref('')
const orbEmoji = ref('🎰')

function isProcessed(pullIndex: number) {
  return processedIndexes.value.has(pullIndex)
}

function performGacha() {
  const count = gachaCount.value
  const totalCost = count * 120

  if (results.value.length > 0) {
    const unprocessed = results.value.filter(r => !isProcessed(r.pullIndex))
    for (const item of unprocessed) {
      warehouseStore.addToWarehouse(item)
    }
    if (unprocessed.length > 0) {
      showToast(`已將 ${unprocessed.length} 件未處理的商品移至個人倉庫`)
    }
  }

  costDisplay.value = `已付款 NT$ ${totalCost.toLocaleString()}，扭蛋中⋯`
  showPaidBadge.value = true
  results.value = gachaPull(count)
  processedIndexes.value = new Set()
  isSpinning.value = true
  orbEmoji.value = '🎰'

  setTimeout(() => {
    isSpinning.value = false
    orbEmoji.value = '🎉'
    costDisplay.value = `獲得 ${count} 件商品！點擊「加入購物車」即可免費帶走。`
  }, 1500)
}

function addToCart(pullIndex: number) {
  const item = results.value.find(r => r.pullIndex === pullIndex)
  if (!item || isProcessed(pullIndex)) return
  const cartId = 'gacha_' + item.id + '_' + pullIndex
  cartStore.addToCart(cartId, item.name, 0, item.img, { gachaReward: true })
  markProcessed(pullIndex)
  showToast(`已加入購物車：${item.name}`)
}

function addAllToCart() {
  let count = 0
  for (const item of results.value) {
    if (isProcessed(item.pullIndex)) continue
    const cartId = 'gacha_' + item.id + '_' + item.pullIndex
    cartStore.addToCart(cartId, item.name, 0, item.img, { gachaReward: true })
    markProcessed(item.pullIndex)
    count++
  }
  showToast(`已將 ${count} 件扭蛋商品加入購物車`)
}

function moveToWarehouse(pullIndex: number) {
  const item = results.value.find(r => r.pullIndex === pullIndex)
  if (!item || isProcessed(pullIndex)) return
  warehouseStore.addToWarehouse(item)
  markProcessed(pullIndex)
  showToast(`已移至個人倉庫：${item.name}`)
}

function moveAllToWarehouse() {
  let count = 0
  for (const item of results.value) {
    if (isProcessed(item.pullIndex)) continue
    warehouseStore.addToWarehouse(item)
    markProcessed(item.pullIndex)
    count++
  }
  showToast(`已將 ${count} 件商品移至個人倉庫`)
}
</script>
