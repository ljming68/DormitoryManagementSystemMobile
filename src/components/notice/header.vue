<template>
    <mt-header title="公告详情">
            <router-link to="/notice" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button  slot="right" @click="handleDelete" v-if="show">删除</mt-button>
    </mt-header>
</template>

<script>
import Vue from 'vue';
import { Header,MessageBox, Toast } from 'mint-ui';
Vue.use(Header,MessageBox, Toast);
export default {

    data(){
        return {

            // show:false
        }
    },

    computed:{
        show(){
            return this.$store.state.userinfo.role===0?true:false
        }

    },

    methods:{
        async handleDelete(){
            let id = this.$route.query.id
            console.log(id)
            MessageBox.confirm('确定执行此操作?').then(async action => {
                let res = await this.$axios({
                    methods:'get',
                    url:'http://localhost:8091/notice/deleteNoticeById',
                    params:{
                        id :id 
                    }
                })
                console.log(res)
                if(res.data===true){
                    console.log('删除成功')
                    let instance = Toast({
                        message: '删除成功',
                        position: 'top',
                        // duration: 500,
                        // iconClass: 'iconfont icon-caozuochenggong1'
                    });
                    setTimeout(() => {
                    instance.close();
                    this.$router.go(-1)
                    }, 500);
                    
                }else{

                }
            }).catch((err)=>{
                console.log(err)
            });
            
            
            
            
            
        },

        
    },


    mounted(){
       console.log()

    }
}
</script>

<style lang="css">
     .mint-header{height: 50px;font-size: 20px;}
</style>