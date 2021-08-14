<template>
    <div class="main">
        首页内容

        <mt-cell-swipe
  title="标题文字"
  :right="[
    {
      content: 'Delete',
      style: { background: 'red', color: '#fff' },
      handler: () => this.$messagebox('delete')
    }
  ]"></mt-cell-swipe>
    </div>
</template>

<script>
import Vue from 'vue'
import { CellSwipe } from 'mint-ui';

Vue.use(CellSwipe.name, CellSwipe);
export default {
    
}
</script>