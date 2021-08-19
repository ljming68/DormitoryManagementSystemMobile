<template>
    <div class="box">

        
        <header>
            <mt-header :title="titleContent">
            <router-link to="/houseparentManage" slot="left">
            <mt-button icon="back" ></mt-button>
            </router-link>
            <mt-button icon="more" slot="right" @click="openMore"></mt-button>
            </mt-header>
        </header>

        <mt-actionsheet
            :actions="actions"
            v-model="sheetVisible">
        </mt-actionsheet>




        <main class="detailContent">
            <div v-if="show2">
                 <!-- <mt-cell :title="key" v-for="(item,key) in admininfo[0]" :key="key" >
                <mt-field   :v-model="key" >{{item}}</mt-field>
               
                </mt-cell> -->
                <mt-field label="用户名" placeholder="请输入用户名" v-model="admininfo.userName"></mt-field>
                <mt-field label="密码" placeholder="请输入密码" type="text" v-model="admininfo.passWord"></mt-field>
                
                <mt-field label="工号" placeholder="不可修改" v-model=" admininfo.schoolId" :disabled="true">{{"不可修改"}}</mt-field>
                <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="admininfo.phoneNumber"></mt-field>
                <mt-field label="真实姓名" placeholder="请输入真实姓名" v-model="admininfo.trueName"></mt-field>
                

                <div class="btnfooter">
                 <mt-button type="danger" size="large" @click="cancelChange">取消</mt-button>
                <mt-button type="primary" size="large" @click="handleChange" >确定</mt-button>
               
                </div>
                
            </div>

            <div v-if="show1" >
                <!-- <mt-cell :title="key" v-for="(item,key) in admininfo" :key="key" >{{item}}</mt-cell> -->
                <mt-cell title="姓名" >{{admininfo.trueName}}</mt-cell>
                <mt-cell title="工号" >{{admininfo.schoolId}}</mt-cell>
                <mt-cell title="身份" >{{this.trueRole}}</mt-cell>
                <mt-cell title="手机号" >{{admininfo.phoneNumber}}</mt-cell>

                <mt-cell title="用户名" >{{admininfo.userName}}</mt-cell>
                <mt-cell title="密码" >{{admininfo.passWord}}</mt-cell>
                <mt-cell title="管理宿舍楼" >{{admininfo.buildId}}</mt-cell>
                
                


            </div>
           
            

           



        </main>
        


        


         
    </div>
</template>

<script>
import {Actionsheet,Header,Cell,Indicator,MessageBox,Toast } from 'mint-ui';
import Vue from 'vue';
Vue.use(Actionsheet,Header,Cell,Indicator,MessageBox,Toast);
export default {
    data(){
        return{
            sheetVisible:false,
            show1:true,
            show2:false,
           

            // username:null,
            // password:null,
            
            // schoolId:null,
            // phone:null,
            // trueName:null,
            // buildId:null,
            

            actions:[
                {
                    name:'修改',
                    method:this.change
                        // console.log('修改')
                        

                        // sessionStorage.setItem('isShow1',false)
                        // sessionStorage.setItem('isShow2',true)
                        // Indicator.open('Loading...')
                        // setTimeout(() =>{
                        // location.reload().then(()=>{
                        //     Indicator.close()
                        // })
                        // },500);

        
                       
                },

                {
                    name:'删除',
                    method:this.handleDelete
                    
                }
            ],

            admininfo:{},
        }
    },

  

    computed:{
    //    show1(){
        
    //        if(sessionStorage.getItem('isShow1')==null){
           
    //            return true
    //        }else{
            
    //             return false
    //        }
           
    //    },

        // show2(){
        //    if(sessionStorage.getItem('isShow2')=="true"){
               
        //        return true
        //    }else{
               
        //         return false
        //    }
           
        // },
        titleContent(){
            if(this.show1==true){
                return '信息详情'
            }else{
                return '信息修改'
            }
        },

        trueRole(){
            
            if(this.admininfo.role==0){
                return '系统管理员'
            }else if(this.admininfo.role==1){
                return '宿舍管理员'
            }
        },

         dateNow(){
             var date =new Date();
             return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        },

    },

    methods:{
       openMore(){
           this.sheetVisible=!this.sheetVisible
        },

        change(){
            this.show1=false
             this.show2=true
        },

       

        async handleChange(){
            
            MessageBox.confirm('是否确定修改?').then(async action => {
                let res = await this.$axios({
                    method:'get',
                    url:'http://localhost:8091/user/deleteAdminBySchoolId',
                    params:{
                        schoolId:this.$route.query.schoolId
                    }
                })
                
            
                let rest = await this.$axios({
                    methods:'GET',
                    url:'http://localhost:8091/user/addAdmin',
                    params:{
                        userName: this.admininfo.userName,
                        schoolId: this.admininfo.schoolId,
                        passWord: this.admininfo.passWord,
                        phoneNumber: this.admininfo.phoneNumber,
                        trueName: this.admininfo.trueName,
                        role: Number(this.admininfo.role),
                        buildId: this.admininfo.buildId,
                        checkTime: this.dateNow,
                    
                    
                    }
                })
                console.log(res)
                console.log(rest)
                if(res.data===true & rest.data.code==='1000'){
                    console.log('修改成功')
                    let instance = Toast({
                        message: '修改成功',
                        position: 'top',
                            
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

        cancelChange(){
           
            this.$router.go(-1)
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
        //    console.log(res)
           this.admininfo = res.data[0]
           console.log(this.admininfo)
       },

       async handleDelete(){
        MessageBox.confirm('是否确定删除?').then(async action => {
            let res = await this.$axios({
                    method:'get',
                    url:'http://localhost:8091/user/deleteAdminBySchoolId',
                    params:{
                        schoolId:this.$route.query.schoolId
                    }
            })
            console.log(res)
            if(res.data===true){
                console.log('删除成功')
                let instance = Toast({
                    message: '删除成功',
                    position: 'top',
                        
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
    .btnfooter{display: flex;}
</style>