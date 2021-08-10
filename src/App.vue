<template>
  <div class="box">
    <!-- <header class="header"></header> -->
    <router-view name="header"></router-view>
    <!-- <main class="main"></main> -->
    <router-view class="main"></router-view>
    


  </div>
</template>

<script>

export default {
    created () {
    // 在页面加载时读取sessionStorage里的状态信息
    console.log(sessionStorage.getItem('store'))
    // if (sessionStorage.getItem('store')) {
    //   this.$store.replaceState(Object.assign({}, this.$store.state.userinfo, JSON.parse(sessionStorage.getItem('store'))))
    // }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state.userinfo))
    })

    
  }
  
}
</script>

<style lang="css">
  

</style>

