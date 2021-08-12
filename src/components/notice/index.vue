<template>
    <div class="main">
        <div class="noteContent">
            <div class="action" v-if="show">
                <span class="noticeNum">总数：100条</span>
                <mt-button type="danger"  @click="addNotice" style="width:100px;float: right; flex:1;">添加公告</mt-button>
            </div>
            <div style="height:10px;background:grey"></div>
            <div class="notelist">
              
                <ul>
                      <router-link class="li1" :to="{name:'noticedetail',query:{id:item.id}}" tag="li" v-for="item in notice" :key="item.id">
                     {{item.noticeTime}} {{item.noticeName}} {{item.noticeContent}}
                        
                      
                      
                    <!-- <li></li><span>X</span> -->
                   
                     </router-link>
                </ul>
               
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Button } from 'mint-ui';
Vue.use(Button);
export default {
    data(){
        return {
            // show:''
            
            // notice:[{
            //     date:'2021-07-15',
            //     title:'测试1',
            //     content:'文本文本文文本文本文本文文本本文',        

            // },
            // {
            //     date:'2021-07-14',
            //     title:'测试2',
            //     content:'  这里我只说我用到的方式，Chrome移动端想要用::-webkit-scrollbar{width:0px}的样式隐藏右侧默认滚动条。需要设置html,body的width和height',        

            // },
            // {
            //     date:'2021-07-14',
            //     title:'测试3',
            //     content:'这样会导致document.body.scrollTop，window.pageYOffset的滚动条滚动距离获取会失效。我会在之后发表一篇解决办法。', 
            // },
            // {
            //     date:'2021-07-14',
            //     title:'测试3',
            //     content:'这样会导致document.body.scrollTop，window.pageYOffset的滚动条滚动距离获取会失效。我会在之后发表一篇解决办法。', 
            // },
            
            
            // ]

            notice:[],



        }
    },
    computed:{
        role(){
            return this.$store.state.userinfo.role
        },
        schoolId(){
            return this.$store.state.userinfo.schoolId
        },
        show(){
            console.log(this.role)
            return this.role===0||this.role===1?true:false
        }



    },

    methods:{
        addNotice(){
            this.$router.push('/notice/addnotice')
            
        },
        async handleMounted() {
            console.log(this.schoolId)
            let res = await this.$axios({
                method: 'get',
                url: 'http://localhost:8091/notice/getAllNotices',
                params: {
                schoolId: this.schoolId
                }
            })
            console.log("取到公告信息")
            console.log(res)
            // for (let k in res.data.notice) {
            //     let result = await this.$axios({
            //     method: 'get',
            //     url: 'http://localhost:8091/user/getUserRoleAndTrueName',
            //     params: {
            //         schoolId: res.data.notice[k].schoolId
            //     }
            //     })
            //     let { trueName, role } = result.data
            //     res.data.notice[k]['trueName'] = trueName
            //     res.data.notice[k]['role'] = (Number(role) === 0 ? `系统管理员` : role === 1 ? `宿舍管理员` : `学生`)
            // }
            this.notice = res.data.notice
        },
        


    },


    mounted(){
        this.handleMounted()
    }
}
</script>


<style lang="css">
    .noteContent{
        display: flex;
        flex-direction: column;
        
    }
    .noteContent .action{
        /* height:90px ; */
        background-color: cornflowerblue;
        display: flex;
    }
    .noteContent .action .noticeNum{
        display: block;
        height: 40px;
        width: 73%;
        text-align: center;
        line-height: 40px;
        font-size: 20px;
        


    }
    .noteContent .notelist{overflow: auto;}
    .noteContent .notelist li{
         background-color: darkgrey;
         height:50px;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
         padding: 15px 0;
         border-radius: 6px;
         margin-bottom: 2px;
         
         
         
    }
    
    
</style>