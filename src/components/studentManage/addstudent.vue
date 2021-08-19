<template>
    <div class="main">
        <div class="addContent">
           <mt-field label="用户名" placeholder="请输入用户名" v-model="userName"></mt-field>
           <mt-field label="密码" placeholder="请输入密码" type="text" v-model="passWord"></mt-field>
           <mt-field label="学号" placeholder="请输入学号" v-model=" schoolId"></mt-field>

           <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phoneNumber"></mt-field>
           <mt-field label="真实姓名" placeholder="请输入真实姓名" v-model="trueName"></mt-field>

            <div class="selectContent" >
               
                <div class="leftspan">
                    <span >入住楼号</span>
                </div>
                <div class="rightselect">
                    <select name="" id="" v-model="buildId" >
                        <option  disabled selected value="">请选择</option>
                
                        <option :value="item" v-for="(item,index) in buildings" :key="index">
                            
                            {{item}}
                        </option>
                    </select>
                </div> 
                
                   
            </div>
            <mt-field label="房间号" placeholder="请输入房间号" v-model=" roomId"></mt-field>

            <div class="btnfooter">
            <mt-button type="primary" size="large" @click="handleAddstudent" :disabled='disabled'>确定</mt-button>
            <mt-button type="danger" size="large" @click="canceladd">取消</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Field,MessageBox,} from 'mint-ui';
Vue.use(Field,MessageBox);

export default {
    data(){
        return {
            userName:null,
            passWord:null,
            schoolId:null,
            phoneNumber:null,
            trueName:null,
            buildId: null,
            roomId: null,

            buildings:[],
            selected:'请选择',

            role:this.$store.state.userinfo.role,
        }
    },

    computed:{
        disabled(){
            
             return !(this.userName && this.passWord && this.roomId && this.schoolId && this.phoneNumber && this.trueName && this.buildId  )

        },
        dateNow(){
             var date =new Date();
             return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        },

    },

    methods:{
        async handleMounted(){
            let res = await this.$axios({
                method:'get',
                url:'http://localhost:8091/build/getAllBuildId',
                params:{

                }
            })
            console.log(res)
            res.data.allBuildId.forEach(item => this.buildings.push(item.buildId,  ))
            console.log(this.buildings)
        },


        async handleAddstudent(){
            const { userName, passWord, schoolId, trueName, phoneNumber, buildId, roomId } = this.$data
            let res = await this.$axios({
                method: 'get',
                url: 'http://localhost:8091/user/addStu',
                params: {
                    userName: userName,
                    passWord: passWord,
                    schoolId: schoolId,
                    trueName: trueName,
                    phoneNumber: phoneNumber,
                    buildId: buildId,
                    roomId: buildId+roomId,

                    checkTime: this.dateNow,
                    updateTime: this.dateNow

                }
            })

            console.log(res)
            if(res.data==true){
                MessageBox({
                    title: '提示',
                    message: '添加成功',
                    // showCancelButton: true
                }).then(action=>{
                    this.$router.push('/studentManage')
                })
            }else{
                 MessageBox({
                    title: '提示',
                    message: '添加失败',
                    // showCancelButton: true
                }).then(action=>{
                    // 
                })
            }
        },

        canceladd(){
            this.$router.go(-1)
        },


    },

    created(){
        if(this.role==0||this.role==1){
            console.log('111')
        }else{
            this.$router.push('/home')
        }
    },


    mounted(){
        this.handleMounted()
    }




}
</script>


<style lang="css">
    .addContent{height: 100%;background: #ffffff;}

    select{height: 30px;width: 100px;font-size: 16px;}
     .selectContent{height:48px;padding: 0 10px;display: flex;background: #ffffff;font-size: 16px;border-bottom: 1px solid gainsboro;}
    .selectContent .leftspan{width: 105px;height: 48px;line-height: 48px;}
     .selectContent .rightselect{
        flex: 1; 
        height: 48px;
        padding: 8px 0;
    } 

    .addContent .btnfooter{flex: 1;background: #ffffff;display: flex;padding:50px 0 ;}
    
</style>