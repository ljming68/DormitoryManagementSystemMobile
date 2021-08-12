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

           <div class="contentmiddle">
               
                <div class="leftspan">
                    <span >宿舍楼号</span>
                </div>
                <div class="rightselect">
                    <select name="" id="" v-model="buildId">
                    <option  disabled selected value="">请选择</option>
                    <option :value="item" v-for="(item,index) in buildIds" :key="index">{{item.buildId}}</option>
                   
                </select>
                </div> 
                   
           </div>

           <div class="contentMain">
               <mt-field label="公告内容" placeholder="请输入公告内容" type="textarea" rows="18"  v-model="noticeContent"></mt-field>
           </div>
           
           
            
       </div>

       <div class="btnfooter">
       
        <mt-button type="danger" size="large" @click="cancelnotice">取消</mt-button>
         <mt-button type="primary" size="large" @click="handleAddnotice">确定</mt-button>
       </div>
      
   </div>
</template>


<script>
import Vue from 'vue';
import { Field, Button,Header, Toast } from 'mint-ui'; 
Vue.use(Field, Button,Header, Toast);
export default {
   
    data(){
        return{
          
           noticeName:'',
           noticeContent:'',
           value:'',
            buildId:'',

           buildIds:[]

        }
    },
    computed:{
        dateNow() {
             var date =new Date();
             return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

    }
    },

    methods:{
        async handleMounted(){
            let res = await this.$axios({
                method:'get',
                url:'http://localhost:8091/build/getAllBuildId',
            })
            // console.log(res)
            this.buildIds = res.data.allBuildId
            console.log(this.buildIds)
        },

        async handleAddnotice(){
            let schoolId = this.$store.state.userinfo.schoolId
            console.log(schoolId)
            let res = await this.$axios({
                method:'post',
                url:'http://localhost:8091/notice/addNotice',
                params:{
                    schoolId:schoolId,
                    noticeName:this.noticeName,
                    noticeForBuildId:this.buildId,
                    noticeContent:this.noticeContent.replace(/\s/g, '<br/>'),
                    noticeTime:this.dateNow,

                }
            })
            console.log(res)
            if(res.data===1){
                    console.log('添加成功')
                    Toast({
                        message: '添加成功',
                        position: 'center',
                        duration: 2000,
                        iconClass: 'iconfont icon-caozuochenggong1'
                    });
                    this.$router.go(-1)
                }else{

                }
           
            

          
        },

        

        cancelnotice(){
            console.log('取消发布')
            // this.$router.go(-1)
        },

    },

    mounted(){
        console.log(this)
        console.log(this.dateNow)
        this.handleMounted()
    },
}
</script>

<style lang="css" scoped>
    /* .box{font-size: 0.16rem;} */
    .title{height: 50px;}
    .mint-header{height: 50px;font-size: 20px;}
    textarea{resize: none;}
    select{height:30px;width: 100px;font-size:16px;}
    option{font-size:16px;}
   
    .contentmiddle{height: 48px;padding: 0 10px;display: flex;background: #ffffff;font-size: 16px;border-bottom: 1px solid gainsboro;}
    .contentmiddle .leftspan{width: 105px;height: 48px;line-height: 48px;}
    .contentmiddle .rightselect{flex: 1; height: 48px;padding: 7px 0;}
    
    .btnfooter{flex: 1;background: #ffffff;display: flex;padding:10px 0 ;}
</style>