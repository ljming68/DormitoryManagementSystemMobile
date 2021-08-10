<template>
    <div class="main">
       <div class="test">
            <mt-button type="primary" style="height:100px ;width: 80px;">测试</mt-button>
       </div>
      
    </div>
</template>

<script>
import Vue from 'vue';
import { Button } from 'mint-ui';
Vue.use( Button);
export default {
    
}
</script>

<style lang="css" scoped>
    .test{height:100px ;width: 80px;}
    
</style>