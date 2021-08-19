<template>
    <mt-header title="添加学生">
            <router-link to="/studentManage" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            
    </mt-header>
</template>

<script>
import Vue from 'vue';
import { Header } from 'mint-ui';
Vue.use(Header);
export default {
    
}
</script>

<style lang="css">
     .mint-header{height: 50px;font-size: 20px;}
</style>