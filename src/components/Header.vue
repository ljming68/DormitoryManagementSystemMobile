<template>
    <div class="header">

        <div class="headerbar">
            <div class="openmenu" @click="show=!show">三</div>
            <div class="headernav">
               
            <span>{{username}}</span>
            <div class="loginout" @click="outLogin">退出</div>
            
            </div>
        </div>

        <transition name="openMenu">
         <div id="menu"  v-if="show" >
            <ul>
                <router-link :to="item.path"  tag="li" v-for="(item,index) in menu" :key="index">
                    <li @click="closeMenu">
                         {{item.name}}
                    </li>
                   
                </router-link>
            </ul>
         </div>
        </transition>

        
        
        

    </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'mint-ui';
Vue.use( Toast);

export default {
    data(){
        return {
            show:false,
            // menu:[],
           



            list:[
                {'admin':[
                {icon:'',name:'首页',path:'/home'},
                {icon:'',name:'公告',path:'/notice'},
                {icon:'',name:'管理宿舍管理员信息',path:'/houseparentmanage'},
                {icon:'',name:'管理学生信息',path:'/studentmanage'},
                {icon:'',name:'审核信息',path:'/examineinfo'},
                {icon:'',name:'个人信息',path:'/personalinfo'},
                ]},
                {'houseparent':[
                {icon:'',name:'首页',path:'/home'},
                {icon:'',name:'公告',path:'/notice'},
                {icon:'',name:'管理学生信息',path:'/studentmanage'},
                {icon:'',name:'报修记录',path:'/'},
                {icon:'',name:'个人信息',path:'/personalinfo'},
                ]},
                {'student':[
                {icon:'',name:'首页',path:'/home'},
                {icon:'',name:'公告',path:'/notice'},
                {icon:'',name:'宿舍报修申请',path:'/'},
                {icon:'',name:'个人信息',path:'/personalinfo'},
                ]},
                
            ]
        }
    },


    computed:{
        
        role(){
            return this.$store.state.userinfo.role
            
        },
        username(){ 
            // return this.$store.state.userinfo.userName
            return this.$store.state.userinfo.role === 0 ? `系统管理员` : this.$store.state.userinfo.role === 1 ? `宿舍管理员` : `学生`
        },
        
        menu(){
            return this.role === 0?this.list[0].admin:this.role === 1?this.list[1].houseparent:this.list[2].student
            
        }


        


    },

    methods:{
        closeMenu(){
            this.show=false;
              console.log(this.$store.state.userinfo.role)
        },
        outLogin(){
            //清除token
            sessionStorage.clear()
            
            // Toast({
            //     message: '退出成功',
            //     position: 'center',
            //     duration: 2000
            //     });

            this.$router.push('/login')

        },

           
            
    },
    created(){
       
        
        
        // console.log(this.list)
    }
}
</script>





<style lang="css">
    
    .header #menu{width: 40%;height: auto;background-color: royalblue;border-radius:0 20px 20px 0;} 
    .header #menu ul{width: 100%;height: 100%;}
    .header #menu ul li{width: 100%;height: 40px;border-bottom: 1px solid rgb(32, 30, 30);text-align: center;line-height: 40px;font-size: 16px;font-weight: 900;}
    .header #menu ul li:last-child{border:none;}
    .header .headerbar{display: flex;width: 100%;height: 100%;background: white;}
    

    .header .headerbar .openmenu{width: 18%;height: 100%;background-color: rgb(230, 220, 220);text-align: center;line-height: 50px;font-size: 25px;border-radius: 10px;}
    .header .headerbar .headernav{width: 82%;height: 100%;background-color: white;display: flex;}
    .header .headerbar .headernav span{display: block;flex: 1;text-align: center;line-height: 50px;}
    .header .headerbar .headernav .loginout{width: 20%;height: 100%;background: chocolate;text-align: center;line-height: 50px;}

    .openMenu-enter-active {
    transition: all .2s ease;
    }
    .openMenu-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .openMenu-enter, .openMenu-leave-to
    {
    transform: translateX(-10px);
    opacity: 0;
    }

    
    
    
</style>