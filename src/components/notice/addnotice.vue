<template>
   <div class="box">
        <div   class="title">
            <mt-header title="新增公告">
            <router-link to="/notice" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            
            </mt-header>
        </div> 

       <div class="noticeAdd">
           <div class="contentTop">
               <mt-field label="公告名称" placeholder="请输入公告名称" v-model="noticeName">
                </mt-field>
           </div>

           <div class="contentBottom">
               
                <div class="leftspan">
                    <span >可选范围</span>
                </div>
                <div class="rightselect">
                    <select name="" id="">
                    <option  disabled selected>请选择</option>
                    <option value="">N1</option>
                    <option value="">N2</option>
                </select>
                </div> 
                   
           </div>

           <div class="contentMain">
               <mt-field label="公告内容" placeholder="请输入公告内容" type="textarea" rows="18"  v-model="noticeContent"></mt-field>
           </div>
           
           
            
       </div>
       <div class="btnfooter">
       
        <mt-button type="danger" size="large" @click="cancelnotice">取消</mt-button>
         <mt-button type="primary" size="large" @click="addnotice">确定</mt-button>
       </div>
      
   </div>
</template>


<script>
import Vue from 'vue';
import { Field, Button,Header } from 'mint-ui'; 
Vue.use(Field, Button,Header);
export default {
   
    data(){
        return{
           noticeName:'',
           noticeContent:'',
           value:'',

        }
    },
    created(){
        
    },

    methods:{
        addnotice(){
            console.log('发布成功')
            this.$router.go(-1)
        },

        cancelnotice(){
            console.log('取消发布')
            this.$router.go(-1)
        },

    }
}
</script>

<style lang="css" scoped>
    /* .box{font-size: 0.16rem;} */
    .title{height: 50px;}
    .mint-header{height: 50px;font-size: 20px;}
    textarea{resize: none;}
    select{height:30px;width: 100px;font-size:16px;}
    option{font-size:16px;}
   
    .contentBottom{height: 48px;padding: 0 10px;display: flex;background: #ffffff;font-size: 16px;border-bottom: 1px solid gainsboro;}
    .contentBottom .leftspan{width: 105px;height: 48px;line-height: 48px;}
    .contentBottom .rightselect{flex: 1; height: 48px;padding: 7px 0;}
    
    .btnfooter{flex: 1;background: #ffffff;display: flex;padding:10px 0 ;}
</style>