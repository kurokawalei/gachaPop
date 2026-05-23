<template>
  <main>
    <div class="container">
      <div class="breadcrumb">
        <router-link to="/">首頁</router-link>
        <span>/</span>
        <span>我的帳戶</span>
      </div>
    </div>

    <div class="page-header">
      <div class="container">
        <h1>我的帳戶</h1>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="account-layout">
          <aside class="account-sidebar">
            <nav>
              <router-link to="/warehouse">個人倉庫</router-link>
              <a href="#" class="active">訂單記錄</a>
              <a href="#">收藏清單</a>
              <a href="#">會員資料</a>
              <a href="#">通知設定</a>
              <a href="#">登出</a>
            </nav>
          </aside>

          <div>
            <div class="kicker" style="margin-bottom:var(--space-md)">Order History</div>
            <h2 style="margin-bottom:var(--space-lg)">訂單記錄</h2>

            <div class="order-card" v-for="order in orders" :key="order.id">
              <div class="order-header">
                <div>
                  <div style="font-weight:600">{{ order.id }}</div>
                  <div style="font-size:var(--text-sm);color:var(--muted)">{{ order.date }}</div>
                </div>
                <span class="order-status" :class="order.status">{{ statusLabel(order.status) }}</span>
              </div>
              <div class="order-products">
                <div class="order-product-thumb" v-for="(img, i) in order.images" :key="i">
                  <img :src="img" alt="Product" style="width:100%;height:100%;object-fit:cover" loading="lazy">
                </div>
              </div>
              <div style="margin-top:var(--space-sm);font-size:var(--text-sm);color:var(--muted)">
                合計：NT$ {{ order.total.toLocaleString() }}（{{ order.items }}件）
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { Order } from '../types'
import { img } from '../utils/img'

const orders: Order[] = [
  {
    id: 'GP-20260515-001', date: '2026年5月15日', status: 'shipped',
    total: 2400, items: 3,
    images: [img('/mpbzfcpd-cat_product_01.png'), img('/mpbzfcpp-cat_product_02.png')],
  },
  {
    id: 'GP-20260510-003', date: '2026年5月10日', status: 'processing',
    total: 120, items: 1,
    images: [img('/mpbzfcq9-cat_product_04.png')],
  },
  {
    id: 'GP-20260428-007', date: '2026年4月28日', status: 'delivered',
    total: 520, items: 3,
    images: [img('/mpbzfcte-cat_product_14.png'), img('/mpbzfctn-cat_product_15.png'), img('/mpbzfcqj-cat_product_05.png')],
  },
]

function statusLabel(s: string) {
  const map: Record<string, string> = { shipped: '已出貨', processing: '準備中', delivered: '已送達' }
  return map[s] || s
}
</script>
