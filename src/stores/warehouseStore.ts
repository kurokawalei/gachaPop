import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { WarehouseItem } from '../types'

const WAREHOUSE_KEY = 'gachapop_warehouse'

export const useWarehouseStore = defineStore('warehouse', () => {
  const items = ref<WarehouseItem[]>(JSON.parse(localStorage.getItem(WAREHOUSE_KEY) || '[]'))

  const count = computed(() => items.value.length)

  function save() {
    localStorage.setItem(WAREHOUSE_KEY, JSON.stringify(items.value))
  }

  function removeFromWarehouse(wId: string) {
    items.value = items.value.filter(w => w.wId !== wId)
    save()
  }

  function addToWarehouse(item: { id: string; name: string; icon: string; img: string; rarity: number }) {
    const wId = 'wh_' + item.id + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6)
    items.value.push({ ...item, wId, pullTime: Date.now() })
    save()
  }

  function clearWarehouse() {
    items.value = []
    save()
  }

  return { items, count, removeFromWarehouse, addToWarehouse, clearWarehouse, save }
})
