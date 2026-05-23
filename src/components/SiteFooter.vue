<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="logo" style="margin-bottom:var(--space-sm)">Gacha<span>Pop</span></div>
          <p>來自日本的線上扭蛋商店。把可愛送到你手中。</p>
        </div>
        <div class="footer-col">
          <h4>商店</h4>
          <router-link to="/products">商品一覽</router-link>
          <router-link to="/gacha">開始扭蛋</router-link>
          <router-link to="/warehouse">個人倉庫</router-link>
          <router-link to="/cart">購物車</router-link>
        </div>
        <div class="footer-col">
          <h4>客服</h4>
          <a href="#">聯絡我們</a>
          <a href="#">配送說明</a>
          <a href="#">退貨政策</a>
        </div>
        <div class="footer-col">
          <h4>資訊</h4>
          <router-link to="/account">我的帳戶</router-link>
          <a href="#">訂單記錄</a>
        </div>
      </div>
      <div style="margin-top:var(--space-lg);padding-top:var(--space-md);border-top:1px solid var(--border);text-align:center">
        &copy; 2026 GachaPop. All rights reserved.
      </div>
    </div>
  </footer>
</template>
