import Vue from 'vue'
import Vuex from 'vuex'
import userinfo from './userinfo'

Vue.use(Vuex)

const store=new Vuex.Store({
    modules:{
        userinfo,
    }


})

export default store