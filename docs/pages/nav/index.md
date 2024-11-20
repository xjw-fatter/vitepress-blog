---
layout: doc
pageClass: my-nav-layout
# outline: [2, 3, 4]
---

<script setup>
import { NAV_DATA } from './navData'
</script>
<style lang="scss">
.my-nav-layout {
  .my-nav-desc{
    
  }
  /* 覆盖全局的 vp-layout-max-width（仅当前页面使用） */
  --vp-layout-max-width: 1660px;

  /* layout 样式 */
  .container {
    max-width: var(--vp-layout-max-width) !important;
  }
  .content-container,
  .content {
    max-width: 100% !important;
  }

  /* aside 样式 */
  .aside {
    padding-left: 0;
    max-width: 224px;
  }

  /* custom-block */
  .custom-block {
    background: var(--my-custom-block-tip-bg);
    .custom-block-title {
      font-size: var(--vp-custom-block-font-size);
    }
    ul {
      margin: 8px 0;
    }
    li {
      margin: 0;
    }
  }

  .vp-doc h2 {
    margin-top: 24px;
  }
}
</style>

# 导航

<div class="custom-block">
  <div>一些乱七八糟的网址导航～</div>
</div>

<navLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>

<br />
