<template>
    <mt-header title="公告详情">
            <router-link to="/notice" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button  slot="right">删除</mt-button>
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