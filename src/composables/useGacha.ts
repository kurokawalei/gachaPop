import { ref } from 'vue'
import type { GachaPoolItem, GachaResult } from '../types'

export const GACHA_POOL: GachaPoolItem[] = [
  { id: 'cat01', name: '三花貓吊飾', rarity: 3, icon: '🐱', img: 'mpbzfcpd-cat_product_01.png', odds: 0.50 },
  { id: 'cat02', name: '白貓公仔', rarity: 3, icon: '🐱', img: 'mpbzfcpp-cat_product_02.png', odds: 0.25 },
  { id: 'cat03', name: '虎斑貓磁鐵', rarity: 3, icon: '🐱', img: 'mpbzfcqj-cat_product_05.png', odds: 0.15 },
  { id: 'cat04', name: '黑貓夜燈（隱藏版）', rarity: 4, icon: '🐈‍⬛', img: 'mpbzfcq0-cat_product_03.png', odds: 0.08 },
  { id: 'cat05', name: '貓掌肉球鑰匙圈（超隱藏）', rarity: 4, icon: '🐾', img: 'mpbzfcq9-cat_product_04.png', odds: 0.02 },
]

export function useGacha() {
  const lastResults = ref<GachaResult[]>([])
  const processedIndexes = ref<Set<number>>(new Set())
  const isSpinning = ref(false)
  const gachaCount = ref(1)

  function gachaPull(count: number): GachaResult[] {
    const results: GachaResult[] = []
    for (let i = 0; i < count; i++) {
      const rand = Math.random()
      let cumulative = 0
      let selected = GACHA_POOL[0]
      for (const item of GACHA_POOL) {
        cumulative += item.odds
        if (rand <= cumulative) { selected = item; break }
      }
      results.push({ ...selected, pullIndex: i })
    }
    return results
  }

  function setGachaCount(count: number) {
    gachaCount.value = count
  }

  function resetProcessed() {
    processedIndexes.value = new Set()
  }

  function markProcessed(pullIndex: number) {
    processedIndexes.value.add(pullIndex)
  }

  return {
    lastResults,
    processedIndexes,
    isSpinning,
    gachaCount,
    gachaPull,
    setGachaCount,
    resetProcessed,
    markProcessed,
  }
}
