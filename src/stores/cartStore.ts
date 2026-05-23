import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem } from '../types'

const CART_KEY = 'gachapop_cart'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(JSON.parse(localStorage.getItem(CART_KEY) || '[]'))

  const totalQty = computed(() => items.value.reduce((sum, item) => sum + item.qty, 0))
  const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.price * item.qty, 0))
  const shipping = computed(() => subtotal.value >= 1000 ? 0 : 60)
  const total = computed(() => subtotal.value + shipping.value)

  function save() {
    localStorage.setItem(CART_KEY, JSON.stringify(items.value))
  }

  function addToCart(id: string, name: string, price: number, image: string, options?: { gachaReward?: boolean }) {
    const gachaReward = !!options?.gachaReward
    const existing = items.value.find(item => item.id === id && item.gachaReward === gachaReward)
    if (existing) {
      existing.qty += 1
    } else {
      items.value.push({ id, name, price, image, qty: 1, gachaReward })
    }
    save()
  }

  function removeFromCart(id: string) {
    items.value = items.value.filter(item => item.id !== id)
    save()
  }

  function updateQty(id: string, delta: number) {
    const item = items.value.find(item => item.id === id)
    if (!item) return
    item.qty = Math.max(1, item.qty + delta)
    save()
  }

  function clearCart() {
    items.value = []
    save()
  }

  return { items, totalQty, subtotal, shipping, total, addToCart, removeFromCart, updateQty, clearCart }
})
