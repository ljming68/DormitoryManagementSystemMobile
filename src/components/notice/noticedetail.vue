<template>

    <div class="main">
       
       <div class="noticeContent">
          
           <div class="date">{{ notice.noticeTime}}</div>
            <div class="noticetitle">{{ notice.noticeName}}</div>
           <div class="content" v-html="notice.noticeContent">{{ notice.noticeContent}}</div>
           <div class="footerData">
               <div class="role"> {{footerData.role}}</div>
               <div class="trueName">{{footerData.trueName}}</div>
           </div>

       </div>
    </div>
</template>


<script>
import Vue from 'vue';
import { Header } from 'mint-ui';
Vue.use(Header);
export default {
    data(){
        return {
            

            notice:{},
            footerData:{},

        }
    },

    methods:{
        async handleMounted(){
            // console.log(this.$route.query.id)
            let res = await this.$axios({

                methods:'get',
                url:'http://localhost:8091/notice/getNoticeById',
                params:{
                    id:this.$route.query.id
                }
            })

            // console.log(res)
            this.notice = res.data.notice[0]
            console.log(this.notice)

            let result = await this.$axios({
                method: 'get',
                url: 'http://localhost:8091/user/getUserRoleAndTrueName',
                params:{
                    schoolId:this.notice.schoolId
                }
            })
            // console.log(result)
            // let {trueName,role}= result.data
            let role = result.data.role
            
            
            this.footerData=result.data
            this.footerData['role']=(role==='0'?`系统管理员`:role==='1'?`宿舍管理员`:`学生`)
            console.log( this.footerData)
        },

       

         

    },


    mounted(){
        
       
        this.handleMounted()
    },

    computed:{
        
    },
    
}
</script>


<style lang="css" scoped>
    /* .noticeheader{position: sticky;top:0} */
    .mint-header{height: 50px;font-size: 20px;}
    .noticeContent{background-color:#bbb4b4;display: flex;flex-direction: column;min-height: 100%;}
    
    .noticetitle{text-align: center;font-size: 30px;font-weight: 900;height:100px ;}
    .date{font-size: 18px}
    .content{font-size: 20px}
    .footerData{
        
        /* background: chartreuse; */
        text-align: right;
        font-weight: 900;
        font-size: 18px;
        margin-top:20px ;
        margin-right: 20px;
    }
    
</style>