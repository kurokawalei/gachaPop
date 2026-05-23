import { ref } from 'vue'

const toastMessage = ref('')
const toastVisible = ref(false)
let toastTimer: number | null = null

export function useToast() {
  function showToast(message: string) {
    toastMessage.value = message
    toastVisible.value = true
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = window.setTimeout(() => {
      toastVisible.value = false
    }, 2500)
  }

  return { toastMessage, toastVisible, showToast }
}
