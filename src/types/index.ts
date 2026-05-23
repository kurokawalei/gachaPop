export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  qty: number
  gachaReward: boolean
}

export interface GachaPoolItem {
  id: string
  name: string
  rarity: number
  icon: string
  img: string
  odds: number
}

export interface GachaResult extends GachaPoolItem {
  pullIndex: number
}

export interface WarehouseItem extends GachaPoolItem {
  wId: string
  pullTime: number
}

export interface Product {
  id: string
  name: string
  series: string
  price: number
  image: string
  tag?: string
  description?: string
  category?: string
}

export interface Order {
  id: string
  date: string
  status: 'shipped' | 'processing' | 'delivered'
  total: number
  items: number
  images: string[]
}
