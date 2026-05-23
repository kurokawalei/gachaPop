<template>
  <main>
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <div class="kicker">2026 春季系列</div>
          <h1>不可思議的貓咪<br>扭蛋世界</h1>
          <p style="margin:var(--space-md) 0;color:var(--muted);max-width:480px">
            以可愛貓咪為主題的實體公仔，全新系列登場。收集全部5種＋隱藏版，完成屬於你的收藏！
          </p>
          <div class="flex-row" style="margin-top:var(--space-lg)">
            <router-link to="/products" class="btn btn-primary">瀏覽商品</router-link>
            <router-link to="/gacha" class="btn">開始扭蛋</router-link>
          </div>
        </div>
        <div class="hero-visual">
          <img src="/mpbzfcq0-cat_product_03.png" alt="Cat collection" loading="lazy">
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="kicker">Hot Items</div>
        <h2 style="margin-bottom:var(--space-lg)">人氣商品</h2>
        <div class="featured-grid">
          <div class="product-card featured-main">
            <div class="product-card-image">
              <img src="/mpbzfcq0-cat_product_03.png" alt="Black cat night light figure" style="width:100%;height:100%;object-fit:cover" loading="lazy">
            </div>
            <div class="product-card-body">
              <span class="tag tag-accent" style="margin-bottom:var(--space-xs)">限定</span>
              <h3>黑貓夜燈公仔（隱藏版）</h3>
              <div style="font-size:var(--text-sm);color:var(--muted);margin:2px 0 var(--space-sm)">夜光特別仕樣</div>
              <div class="price">NT$ 480 <span class="original">NT$ 580</span></div>
            </div>
          </div>
          <div class="product-card">
            <div class="product-card-image">
              <img src="/mpbzfcpd-cat_product_01.png" alt="Calico cat keychain" style="width:100%;height:100%;object-fit:cover" loading="lazy">
            </div>
            <div class="product-card-body">
              <h3>三花貓鑰匙圈</h3>
              <div class="series">春季系列</div>
              <div class="price">NT$ 120</div>
            </div>
          </div>
          <div class="product-card">
            <div class="product-card-image">
              <img src="/mpbzfctn-cat_product_15.png" alt="Cat paw cushion" style="width:100%;height:100%;object-fit:cover" loading="lazy">
            </div>
            <div class="product-card-body">
              <h3>貓掌肉球靠墊</h3>
              <div class="series">人氣周邊</div>
              <div class="price">NT$ 350</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border)">
      <div class="container text-center">
        <div class="kicker">Gacha Machine</div>
        <h2 style="margin-bottom:var(--space-md)">體驗線上扭蛋</h2>
        <p style="color:var(--muted);max-width:500px;margin:0 auto var(--space-lg)">
          在家也能感受扭蛋的興奮感。單抽NT$120，十連抽隱藏版機率提升！
        </p>
        <router-link to="/gacha" class="btn btn-primary">開始扭蛋</router-link>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="kicker">Series</div>
        <h2 style="margin-bottom:var(--space-lg)">系列一覽</h2>
        <div class="grid-3">
          <div class="series-card">
            <div class="series-card-image">
              <img src="/mpbzfcpd-cat_product_01.png" alt="Spring collection" style="width:100%;height:100%;object-fit:cover" loading="lazy">
            </div>
            <h3>春季系列</h3>
            <div class="count">6種商品</div>
          </div>
          <div class="series-card">
            <div class="series-card-image">
              <img src="/mpbzfcrq-cat_product_10.png" alt="Night forest series" style="width:100%;height:100%;object-fit:cover" loading="lazy">
            </div>
            <h3>夜森林系列</h3>
            <div class="count">3種商品</div>
          </div>
          <div class="series-card">
            <div class="series-card-image">
              <img src="/mpbzfct5-cat_product_13.png" alt="Party series" style="width:100%;height:100%;object-fit:cover" loading="lazy">
            </div>
            <h3>派對系列</h3>
            <div class="count">2種商品</div>
          </div>
          <div class="series-card">
            <div class="series-card-image">
              <img src="/mpbzfcqz-cat_product_07.png" alt="Stationery series" style="width:100%;height:100%;object-fit:cover" loading="lazy">
            </div>
            <h3>文具系列</h3>
            <div class="count">3種商品</div>
          </div>
          <div class="series-card">
            <div class="series-card-image">
              <img src="/mpbzfctn-cat_product_15.png" alt="Lifestyle series" style="width:100%;height:100%;object-fit:cover" loading="lazy">
            </div>
            <h3>人氣周邊</h3>
            <div class="count">4種商品</div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
