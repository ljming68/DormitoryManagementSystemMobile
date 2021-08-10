<template>
    <div class="main">
        <div class="noteContent">
            <div class="action" v-if="show">
                <mt-button type="danger" @click="addNotice">添加公告</mt-button>
            </div>
            <div class="notelist">
              
                <ul>
                      <router-link class="li1" to="/notice/noticedetail" tag="li" v-for="(item,index) in notice" :key="index">
                     {{item.date}} {{item.title}} {{item.content}}
                        
                      
                      
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
            notice:[{
                date:'2021-07-15',
                title:'测试1',
                content:'文本文本文文本文本文本文文本本文',        

            },
            {
                date:'2021-07-14',
                title:'测试2',
                content:'  这里我只说我用到的方式，Chrome移动端想要用::-webkit-scrollbar{width:0px}的样式隐藏右侧默认滚动条。需要设置html,body的width和height',        

            },
            {
                date:'2021-07-14',
                title:'测试3',
                content:'这样会导致document.body.scrollTop，window.pageYOffset的滚动条滚动距离获取会失效。我会在之后发表一篇解决办法。', 
            },
            {
                date:'2021-07-14',
                title:'测试3',
                content:'这样会导致document.body.scrollTop，window.pageYOffset的滚动条滚动距离获取会失效。我会在之后发表一篇解决办法。', 
            },
            {
                date:'2021-07-14',
                title:'测试3',
                content:'这样会导致document.body.scrollTop，window.pageYOffset的滚动条滚动距离获取会失效。我会在之后发表一篇解决办法。', 
            },
            {
                date:'2021-07-14',
                title:'测试3',
                content:'这样会导致document.body.scrollTop，window.pageYOffset的滚动条滚动距离获取会失效。我会在之后发表一篇解决办法。', 
            },
            {
                date:'2021-07-14',
                title:'测试3',
                content:'这样会导致document.body.scrollTop，window.pageYOffset的滚动条滚动距离获取会失效。我会在之后发表一篇解决办法。', 
            },
            {
                date:'2021-07-14',
                title:'测试3',
                content:'这样会导致document.body.scrollTop，window.pageYOffset的滚动条滚动距离获取会失效。我会在之后发表一篇解决办法。', 
            },
            {
                date:'2021-07-14',
                title:'测试3',
                content:'这样会导致document.body.scrollTop，window.pageYOffset的滚动条滚动距离获取会失效。我会在之后发表一篇解决办法。', 
            },
            {
                date:'2021-07-14',
                title:'测试3',
                content:'这样会导致document.body.scrollTop，window.pageYOffset的滚动条滚动距离获取会失效。我会在之后发表一篇解决办法。', 
            },
            {
                date:'2021-07-14',
                title:'测试3',
                content:'这样会导致document.body.scrollTop，window.pageYOffset的滚动条滚动距离获取会失效。我会在之后发表一篇解决办法。', 
            },
            {
                date:'2021-07-14',
                title:'测试3',
                content:'这样会导致document.body.scrollTop，window.pageYOffset的滚动条滚动距离获取会失效。我会在之后发表一篇解决办法。', 
            },
            {
                date:'2021-07-14',
                title:'测试3',
                content:'这样会导致document.body.scrollTop，window.pageYOffset的滚动条滚动距离获取会失效。我会在之后发表一篇解决办法。', 
            },
            
            ]


        }
    },
    computed:{
        role(){
            return this.$store.state.userinfo.role
        },
        show(){
            console.log(this.role)
            return this.role===0||this.role===1?true:false
        }



    },

    methods:{
        addNotice(){
            this.$router.push('/notice/addnotice')
            
        }
    }
}
</script>


<style lang="css">
    .noteContent{
        display: flex;
        flex-direction: column;
        
        }
    .noteContent .action{
        height:80px ;
        background-color: cornflowerblue;
        }
    .noteContent .notelist{overflow: auto;}
    .noteContent .notelist li{
         background-color: darkgrey;
         height:50px;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
         padding: 15px 0;
         
         
    }
    
    
</style>