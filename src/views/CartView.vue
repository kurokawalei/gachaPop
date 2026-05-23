<template>
  <main>
    <div class="container">
      <div class="breadcrumb">
        <router-link to="/">首頁</router-link>
        <span>/</span>
        <span>購物車</span>
      </div>
    </div>

    <div class="page-header">
      <div class="container">
        <h1>購物車</h1>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div id="cart-empty" class="empty-state" v-if="store.items.length === 0">
          <div class="empty-icon">🛒</div>
          <h3>購物車是空的</h3>
          <p style="color:var(--muted);margin:var(--space-sm) 0">請加入你喜愛的商品。</p>
          <router-link to="/products" class="btn" style="margin-top:var(--space-md)">繼續購物</router-link>
        </div>

        <div class="cart-layout" v-if="store.items.length > 0">
          <div>
            <div id="cart-items-container" class="cart-items">
              <div class="cart-item" v-for="item in store.items" :key="item.id" :class="{ 'cart-item-gacha': item.gachaReward }">
                <div class="cart-item-image">
                  <img v-if="item.image" :src="item.image" :alt="item.name" style="width:100%;height:100%;object-fit:cover">
                  <div v-else class="placeholder-icon">🐱</div>
                </div>
                <div class="cart-item-info">
                  <h4>{{ item.name }}</h4>
                  <span v-if="item.gachaReward" class="tag tag-gacha" style="margin-top:4px">扭蛋轉出</span>
                  <div class="item-price">{{ item.gachaReward ? '免費' : 'NT$ ' + item.price.toLocaleString() }}</div>
                </div>
                <div class="cart-item-qty">
                  <button @click="store.updateQty(item.id, -1)">−</button>
                  <span>{{ item.qty }}</span>
                  <button @click="store.updateQty(item.id, 1)">+</button>
                </div>
                <div class="cart-item-total">
                  {{ item.gachaReward ? '免費' : 'NT$ ' + (item.price * item.qty).toLocaleString() }}
                  <br><button class="cart-item-remove" @click="store.removeFromCart(item.id)">刪除</button>
                </div>
              </div>
            </div>
            <div style="margin-top:var(--space-md)">
              <router-link to="/products" style="font-size:var(--text-sm);color:var(--muted)">← 繼續購物</router-link>
            </div>
          </div>
          <div id="cart-summary-container">
            <div class="cart-summary">
              <h3>訂單摘要</h3>
              <div class="summary-row">
                <span>小計</span>
                <span>NT$ {{ store.subtotal.toLocaleString() }}</span>
              </div>
              <div class="summary-row">
                <span>運費</span>
                <span>{{ store.shipping === 0 ? '免費' : 'NT$ ' + store.shipping }}</span>
              </div>
              <div v-if="store.subtotal < 1000" class="summary-row" style="font-size:var(--text-sm);color:var(--muted)">※ 滿NT$1,000免運費</div>
              <div class="summary-total">
                <span>合計</span>
                <span>NT$ {{ store.total.toLocaleString() }}</span>
              </div>
              <button class="btn btn-primary btn-full" @click="showCheckout = true" style="margin-top:var(--space-md)">
                前往結帳
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Teleport to="body">
      <div id="checkout-overlay" v-if="showCheckout" style="position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,0.3);backdrop-filter:blur(4px);overflow-y:auto">
        <div style="max-width:600px;margin:60px auto;background:var(--surface);border:1px solid var(--border)">
          <div style="padding:var(--space-lg)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-lg)">
              <h3 style="font-family:var(--font-mono);font-size:var(--text-sm);text-transform:uppercase;letter-spacing:0.08em">前往結帳</h3>
              <button @click="showCheckout = false" style="border:none;background:none;cursor:pointer;font-size:1.5rem;line-height:1">&times;</button>
            </div>

            <div class="checkout-steps">
              <div class="checkout-step active">收件資訊</div>
              <div class="checkout-step">付款方式</div>
              <div class="checkout-step">確認訂單</div>
            </div>

            <form @submit.prevent="submitOrder">
              <div class="form-group">
                <label>姓名</label>
                <input type="text" required v-model="checkoutForm.name" placeholder="例：王小明">
              </div>
              <div class="form-group">
                <label>電子郵件</label>
                <input type="email" required v-model="checkoutForm.email" placeholder="example@email.com">
              </div>
              <div class="form-group">
                <label>電話號碼</label>
                <input type="tel" v-model="checkoutForm.phone" placeholder="0912-345-678">
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>郵遞區號</label>
                  <input type="text" v-model="checkoutForm.zip" placeholder="100">
                </div>
                <div class="form-group">
                  <label>縣市</label>
                  <select v-model="checkoutForm.city">
                    <option>台北市</option><option>新北市</option><option>台中市</option><option>高雄市</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label>地址</label>
                <input type="text" required v-model="checkoutForm.address" placeholder="例如：大安區忠孝東路四段">
              </div>
              <div class="form-group">
                <label>配送備註</label>
                <textarea rows="2" v-model="checkoutForm.note" placeholder="例如指定送貨時間"></textarea>
              </div>

              <div style="display:flex;gap:var(--space-md);margin-top:var(--space-lg)">
                <button type="submit" class="btn btn-primary btn-full">確認訂單</button>
                <button type="button" class="btn btn-full" @click="showCheckout = false">取消</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { useToast } from '../composables/useToast'

const store = useCartStore()
const { showToast } = useToast()

const showCheckout = ref(false)
const checkoutForm = reactive({
  name: '',
  email: '',
  phone: '',
  zip: '',
  city: '台北市',
  address: '',
  note: '',
})

function submitOrder() {
  showToast('感謝您的訂購！我們將寄送訂單確認郵件給您。')
  store.clearCart()
  showCheckout.value = false
}
</script>
