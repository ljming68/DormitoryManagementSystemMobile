<template>
    <div class="box">

        
        <header>
            <mt-header title="信息详情">
            <router-link to="/houseparentManage" slot="left">
            <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right" @click="openMore"></mt-button>
            </mt-header>
        </header>

        <mt-actionsheet
            :actions="actions"
            v-model="sheetVisible">
        </mt-actionsheet>




        <main class="detailContent">
            <!-- <div v-if="show2">
                 <mt-cell :title="key" v-for="(item,key) in admininfo[0]" :key="key" >
                <mt-field   :v-model="key" >{{item}}</mt-field>
                111
                </mt-cell>
            </div> -->

            <div :v-if="detalishow1" >
                <mt-cell :title="key" v-for="(item,key) in admininfo[0]" :key="key" >{{item}}</mt-cell>
            </div>
           
            <!-- <mt-cell></mt-cell> -->

           



        </main>
        


        


         
    </div>
</template>

<script>
import {Actionsheet,Header,Cell } from 'mint-ui';
import Vue from 'vue';
Vue.use(Actionsheet,Header,Cell);
export default {
    data(){
        return{
            sheetVisible:false,
            show1:true,
            show2:false,
            isChange:true,

            actions:[
                {name:'修改',method(){
                    console.log('修改')
                    // this.show1=false
                    // console.log(this.show1,typeof(this.show1))
                    sessionStorage.setItem('isShow1',true)
                     
                    // this.show2=true
                     
                    }},
                {name:'删除',method(){console.log('删除')}}
            ],

            admininfo:[],
        }
    },

  

    computed:{
       detalishow1(){
            console.log(this.show1)
           if(this.show1==true){
               console.log('111')
               return true
           }else{
               console.log('ggg')
                return false
           }
           
       }

    },

    methods:{
       openMore(){
           this.sheetVisible=!this.sheetVisible
       },

       change(){
            this.show1=false
        },

       

       async handleMounted(){
           let res = await this.$axios({
               method:'get',
               url:'http://localhost:8091/user/getAdminBySchoolId',
               params:{
                   role:this.$store.state.userinfo.role,
                   schoolId:this.$route.query.schoolId
               }
           })
           console.log(res)
           this.admininfo = res.data
       }

    },

    mounted(){
        // console.log(this)
        this.handleMounted()
        // console.log(this.show1)
        
    }
}
</script>


<style lang="css" scoped>
    
    .mint-header{height: 50px;font-size: 20px;}
</style>