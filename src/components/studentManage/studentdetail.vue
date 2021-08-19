<template>
    <div class="box">
        <header>
            <mt-header :title="titleContent">
            <router-link to="/studentManage" slot="left">
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
                <mt-field label="用户名" placeholder="请输入用户名" v-model="studentinfo.userName"></mt-field>
                <mt-field label="密码" placeholder="请输入密码" type="text" v-model="studentinfo.passWord"></mt-field>
                
                <mt-field label="学号" placeholder="不可修改" v-model=" studentinfo.schoolId" :disabled="true">{{"不可修改"}}</mt-field>
                <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="studentinfo.phoneNumber"></mt-field>
                <mt-field label="真实姓名" placeholder="请输入真实姓名" v-model="studentinfo.trueName"></mt-field>
               
                <div class="selectContent" >
               
                    <div class="leftspan">
                        <span >入住楼号</span>
                    </div>
                    <div class="rightselect">
                        <select name="" id="" v-model="studentinfo.buildId" >
                            <option  disabled selected value="">请选择</option>
                    
                            <option :value="item" v-for="(item,index) in buildings" :key="index">
                                
                                {{item}}
                            </option>
                        </select>
                    </div> 
                
                   
                </div>
                <mt-field label="房间号" placeholder="请输入房间号" v-model="studentinfo.roomId"></mt-field>
            

                <div class="btnfooter">
                 <mt-button type="danger" size="large" @click="cancelChange">取消</mt-button>
                <mt-button type="primary" size="large" @click="handleChange" >确定</mt-button>
               
                </div>
                
            </div>

            <div v-if="show1" >
                <!-- <mt-cell :title="key" v-for="(item,key) in admininfo" :key="key" >{{item}}</mt-cell> -->
                <mt-cell title="姓名" >{{studentinfo.trueName}}</mt-cell>
                <mt-cell title="学号" >{{studentinfo.schoolId}}</mt-cell>
                <mt-cell title="身份" >{{this.trueRole}}</mt-cell>
                <mt-cell title="手机号" >{{studentinfo.phoneNumber}}</mt-cell>

                <mt-cell title="用户名" >{{studentinfo.userName}}</mt-cell>
                <mt-cell title="密码" >{{studentinfo.passWord}}</mt-cell>
                <mt-cell title="入住时间" >{{studentinfo.checkTime}}</mt-cell>
                <mt-cell title="入住楼号" >{{studentinfo.buildId}}</mt-cell>
                <mt-cell title="入住房间号" >{{studentinfo.roomId}}</mt-cell>
                
                
                


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
        return {
            sheetVisible:false,
            show1:true,
            show2:false,

            actions:[
                {
                    name:'修改',
                    method:this.change       
                },

                {
                    name:'删除',
                    method:this.handleDelete  
                }
            ],

            studentinfo:{},
            buildings:[],
            selected:'请选择',
        }
    },

    computed:{
        titleContent(){
            if(this.show1==true){
                return '信息详情'
            }else{
                return '信息修改'
            }
        },
        trueRole(){
            
            if(this.studentinfo.role==2){
                return '学生'
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

        async handleMounted(){
            
            let rest = await this.$axios({
                method:'get',
                url:'http://localhost:8091/build/getAllBuildId',
                params:{

                }
            })
            console.log(rest)
            rest.data.allBuildId.forEach(item => this.buildings.push(item.buildId,  ))
            console.log(this.buildings)

           let res = await this.$axios({
               method:'get',
               url:'http://localhost:8091/user/getStuBySchoolId',
               params:{
                   role:this.$store.state.userinfo.role,
                   schoolId:this.$route.query.schoolId
               }
           })
           console.log(res)
           this.studentinfo = res.data[0]
           console.log(this.studentinfo)
       },

       async handleChange(){
           MessageBox.confirm('是否确定修改?').then(async action => {
                let res = await this.$axios({
                    method:'get',
                    url:'http://localhost:8091/user/deleteStuBySchoolId',
                    params:{
                        schoolId:this.$route.query.schoolId
                    }
                })

                
                
            
                let rest = await this.$axios({
                    methods:'get',
                    url:'http://localhost:8091/user/addStu',
                    params:{

                        userName: this.studentinfo.userName,
                        schoolId: this.studentinfo.schoolId,
                        passWord: this.studentinfo.passWord,
                        phoneNumber: this.studentinfo.phoneNumber,
                        trueName: this.studentinfo.trueName,
                        // role: Number(this.studentinfo.role),
                        buildId: this.studentinfo.buildId,
                        roomId: this.studentinfo.roomId,
                        checkTime: this.dateNow,
                        updateTime: this.dateNow


                    }
                })
                
               
                if(res.data===true ){
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

       async handleDelete(){
        MessageBox.confirm('是否确定删除?').then(async action => {
            let res = await this.$axios({
                    method:'get',
                    url:'http://localhost:8091/user/deleteStuBySchoolId',
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
            

            
       },

     


    },



    mounted(){
        this.handleMounted()
    }
    
}
</script>

<style lang="css">
    .mint-header{height: 50px;font-size: 20px;}
    select{height: 30px;width: 100px;font-size: 16px;}
     .selectContent{height:48px;padding: 0 10px;display: flex;background: #ffffff;font-size: 16px;border-bottom: 1px solid gainsboro;}
    .selectContent .leftspan{width: 105px;height: 48px;line-height: 48px;}
     .selectContent .rightselect{
        flex: 1; 
        height: 48px;
        padding: 8px 0;
    } 

    .addContent .btnfooter{flex: 1;background: #ffffff;display: flex;padding:50px 0 ;}
    .btnfooter{display: flex;}
</style>