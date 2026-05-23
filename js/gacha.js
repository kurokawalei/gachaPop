/* Gacha machine */
const GACHA_POOL = [
  { id: 'cat01', name: '三花貓吊飾', rarity: 3, icon: '🐱', img: 'mpbzfcpd-cat_product_01.png', odds: 0.50 },
  { id: 'cat02', name: '白貓公仔', rarity: 3, icon: '🐱', img: 'mpbzfcpp-cat_product_02.png', odds: 0.25 },
  { id: 'cat03', name: '虎斑貓磁鐵', rarity: 3, icon: '🐱', img: 'mpbzfcqj-cat_product_05.png', odds: 0.15 },
  { id: 'cat04', name: '黑貓夜燈（隱藏版）', rarity: 4, icon: '🐈‍⬛', img: 'mpbzfcq0-cat_product_03.png', odds: 0.08 },
  { id: 'cat05', name: '貓掌肉球鑰匙圈（超隱藏）', rarity: 4, icon: '🐾', img: 'mpbzfcq9-cat_product_04.png', odds: 0.02 },
];

/* Warehouse */
const WAREHOUSE_KEY = 'gachapop_warehouse';
let warehouse = JSON.parse(localStorage.getItem(WAREHOUSE_KEY) || '[]');

function saveWarehouse() {
  localStorage.setItem(WAREHOUSE_KEY, JSON.stringify(warehouse));
  updateWarehouseBadge();
}

function updateWarehouseBadge() {
  document.querySelectorAll('.warehouse-count').forEach(el => {
    el.textContent = warehouse.length;
    el.style.display = warehouse.length > 0 ? 'inline-flex' : 'none';
  });
}

function removeFromWarehouse(wId) {
  warehouse = warehouse.filter(w => w.wId !== wId);
  saveWarehouse();
  renderWarehousePage();
}

/* Gacha state */
let lastGachaResults = [];
let processedIndexes = new Set();

function gachaPull(count) {
  const results = [];
  for (let i = 0; i < count; i++) {
    const rand = Math.random();
    let cumulative = 0;
    let selected = GACHA_POOL[0];
    for (const item of GACHA_POOL) {
      cumulative += item.odds;
      if (rand <= cumulative) { selected = item; break; }
    }
    results.push({ ...selected, pullIndex: i });
  }
  return results;
}

function performGacha(count) {
  const totalCost = count * 120;
  const costDisplay = document.querySelector('.gacha-cost-display');
  const paidBadge = document.querySelector('.gacha-paid-badge');

  /* Before new roll: auto-move unprocessed items to warehouse */
  if (lastGachaResults.length > 0) {
    const unprocessed = lastGachaResults.filter(r => !processedIndexes.has(r.pullIndex));
    if (unprocessed.length > 0) {
      for (const item of unprocessed) {
        const wId = 'wh_' + item.id + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
        warehouse.push({ ...item, wId, pullTime: Date.now() });
      }
      saveWarehouse();
      showToast(`已將 ${unprocessed.length} 件未處理的商品移至個人倉庫`);
    }
  }

  costDisplay.textContent = `已付款 NT$ ${totalCost.toLocaleString()}，扭蛋中⋯`;
  if (paidBadge) paidBadge.style.display = 'flex';

  lastGachaResults = gachaPull(count);
  processedIndexes = new Set();
  playGachaAnimation(count, () => {
    displayGachaResults(lastGachaResults);
    costDisplay.textContent = `獲得 ${count} 件商品！點擊「加入購物車」即可免費帶走。`;
  });
}

function playGachaAnimation(count, callback) {
  const orb = document.querySelector('.gacha-orb');
  if (!orb) { callback(); return; }
  orb.className = 'gacha-orb spinning';
  orb.textContent = '🎰';
  setTimeout(() => {
    orb.className = 'gacha-orb';
    orb.textContent = '🎉';
    callback();
  }, 1500);
}

function displayGachaResults(results) {
  const container = document.getElementById('gacha-results');
  if (!container) return;
  container.innerHTML = results.map(r => {
    const processed = processedIndexes.has(r.pullIndex);
    return `
    <div class="gacha-result-item ${r.rarity === 4 ? 'rare' : ''}">
      <div class="result-icon" style="overflow:hidden">
        <img src="${r.img}" alt="${r.name}" style="width:100%;height:100%;object-fit:cover" loading="lazy">
      </div>
      <div class="result-name">${r.name}</div>
      <div style="font-family:var(--font-mono);font-size:11px;color:var(--muted);margin-top:2px">
        ${r.rarity === 4 ? '★ 稀有' : '一般'}
      </div>
      <div style="display:flex; flex-wrap: wrap;gap:4px;justify-content:center;margin-top:6px">
        <button style="width:100%" class="btn btn-sm" onclick="addGachaItemToCart(${r.pullIndex})" ${processed ? 'disabled' : ''}>
          ${processed ? '已處理' : '加入購物車'}
        </button>
        <button style="width:100%" class="btn btn-sm" onclick="moveGachaItemToWarehouse(${r.pullIndex})" ${processed ? 'disabled' : ''} >
          ${processed ? '已處理' : '移至倉庫'}
        </button>
      </div>
    </div>
  `}).join('') + `
    <div style="grid-column:1/-1;text-align:center;margin-top:var(--space-lg);padding-top:var(--space-md);display:flex;gap:var(--space-md);justify-content:center">
      <button class="btn btn-primary" onclick="addAllGachaItemsToCart()">
        全部加入購物車
      </button>
      <button class="btn" onclick="moveAllGachaToWarehouse()">
        全部移至倉庫
      </button>
    </div>
  `;
}

function addGachaItemToCart(pullIndex) {
  const item = lastGachaResults.find(r => r.pullIndex === pullIndex);
  if (!item || processedIndexes.has(pullIndex)) return;
  const cartId = 'gacha_' + item.id + '_' + pullIndex;
  addToCart(cartId, item.name, 0, item.img, { gachaReward: true });
  processedIndexes.add(pullIndex);
  displayGachaResults(lastGachaResults);
  showToast(`已加入購物車：${item.name}`);
}

function addAllGachaItemsToCart() {
  let count = 0;
  for (const item of lastGachaResults) {
    if (processedIndexes.has(item.pullIndex)) continue;
    const cartId = 'gacha_' + item.id + '_' + item.pullIndex;
    addToCart(cartId, item.name, 0, item.img, { gachaReward: true });
    processedIndexes.add(item.pullIndex);
    count++;
  }
  displayGachaResults(lastGachaResults);
  showToast(`已將 ${count} 件扭蛋商品加入購物車`);
}

function moveGachaItemToWarehouse(pullIndex) {
  const item = lastGachaResults.find(r => r.pullIndex === pullIndex);
  if (!item || processedIndexes.has(pullIndex)) return;
  const wId = 'wh_' + item.id + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
  warehouse.push({ ...item, wId, pullTime: Date.now() });
  saveWarehouse();
  processedIndexes.add(pullIndex);
  displayGachaResults(lastGachaResults);
  showToast(`已移至個人倉庫：${item.name}`);
}

function moveAllGachaToWarehouse() {
  let count = 0;
  for (const item of lastGachaResults) {
    if (processedIndexes.has(item.pullIndex)) continue;
    const wId = 'wh_' + item.id + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
    warehouse.push({ ...item, wId, pullTime: Date.now() });
    processedIndexes.add(item.pullIndex);
    count++;
  }
  saveWarehouse();
  displayGachaResults(lastGachaResults);
  showToast(`已將 ${count} 件商品移至個人倉庫`);
}

function setGachaCount(count) {
  const btn1 = document.getElementById('gacha-count');
  const btn10 = document.getElementById('gacha-count-10');
  if (btn1) {
    btn1.dataset.count = count;
    btn1.className = count === 1 ? 'btn btn-primary' : 'btn';
  }
  if (btn10) {
    btn10.className = count === 10 ? 'btn btn-primary' : 'btn';
  }
}

/* Warehouse page rendering */
function renderWarehousePage() {
  const container = document.getElementById('warehouse-items');
  const emptyContainer = document.getElementById('warehouse-empty');
  if (!container) return;

  if (warehouse.length === 0) {
    container.innerHTML = '';
    if (emptyContainer) emptyContainer.style.display = 'block';
    return;
  }

  if (emptyContainer) emptyContainer.style.display = 'none';

  container.innerHTML = warehouse.map(item => {
    const pullTime = item.pullTime ? new Date(item.pullTime).toLocaleString('zh-TW', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';
    return `
    <div class="warehouse-item ${item.rarity === 4 ? 'rare' : ''}">
      <div class="warehouse-item-image">
        <img src="${item.img}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover" loading="lazy">
      </div>
      <div class="warehouse-item-body">
        <h4>${item.name}</h4>
        <div style="font-size:var(--text-sm);color:var(--muted)">
          ${item.rarity === 4 ? '★ 稀有' : '一般'} ｜ 取得: ${pullTime}
        </div>
      </div>
      <div class="warehouse-item-actions">
        <button class="btn btn-sm" onclick="addWarehouseToCart('${item.wId}')">加入購物車</button>
        <button class="btn btn-sm" onclick="removeFromWarehouse('${item.wId}')" >刪除</button>
      </div>
    </div>
  `}).join('');
}

function addWarehouseToCart(wId) {
  const idx = warehouse.findIndex(w => w.wId === wId);
  if (idx === -1) return;
  const item = warehouse[idx];
  const cartId = 'wh_' + item.id + '_' + item.pullTime;
  addToCart(cartId, item.name, 0, item.img, { gachaReward: true });
  warehouse.splice(idx, 1);
  saveWarehouse();
  renderWarehousePage();
  showToast(`已加入購物車：${item.name}（扭蛋轉出）`);
}

function addAllWarehouseToCart() {
  if (warehouse.length === 0) return;
  for (const item of warehouse) {
    const cartId = 'wh_' + item.id + '_' + item.pullTime;
    addToCart(cartId, item.name, 0, item.img, { gachaReward: true });
  }
  const count = warehouse.length;
  warehouse = [];
  saveWarehouse();
  renderWarehousePage();
  showToast(`已將 ${count} 件倉庫商品全部加入購物車`);
}

/* Init on page load */
document.addEventListener('DOMContentLoaded', () => {
  updateWarehouseBadge();
  renderWarehousePage();
});
