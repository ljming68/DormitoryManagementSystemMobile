<template>
    <div class="main">
       <div class="addadminContent">
           <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
           <mt-field label="密码" placeholder="请输入密码" type="text" v-model="password"></mt-field>
           <!-- <mt-field label="再次输入密码" placeholder="请输入密码" type="text" v-model="repassword"></mt-field> -->
           <mt-field label="学工号" placeholder="请输入学工号" v-model=" schoolId"></mt-field>
           <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
           <mt-field label="真实姓名" placeholder="请输入真实姓名" v-model="trueName"></mt-field>

            

        <div class="selectContent" v-if="show">
               
                <div class="leftspan">
                    <span >管理楼号</span>
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

            <mt-radio
                
                title="请选择身份"
                v-model="addRole"
                :options="['系统管理员', '宿舍管理员', ]">
            </mt-radio> 

            <div class="btnfooter">
            <mt-button type="primary" size="large" @click="handleaddadmin" :disabled='disabled'>确定</mt-button>
            <mt-button type="danger" size="large" @click="canceladd">取消</mt-button>
            </div>


        </div>

        

         
    </div>
       
</template>

<script>
import Vue from 'vue';
import { Field,Radio, MessageBox,Picker } from 'mint-ui';
Vue.use(Field,Radio, MessageBox,Picker);
export default {

    data(){
        return{
            admin:[],
            houseParent:[],

            username:null,
            password:null,
            schoolId:null,
            phone:null,
            trueName:null,
            buildId:null,
             addRole:'',



             
            role:this.$store.state.userinfo.role,
            // buildId:'',
            value:0,
           

            buildings:[],
            selected:'请选择',
            resAddSuccessCode:{data:{code:'1000',message:'添加成功'}},
            resAddErrorCode:{data:{code:'1001',message:'添加错误'}},
            resAddFailCode:{data:{code:'1001',message:'添加失败'}},



        //    slots: [
        //     {
        //     flex: 1,
        //     values: ['1', '2', '3', '4', '5', '6'],
        //     className: 'slot1',
        //     textAlign: 'center'
        //     }, 
        //     ]
           


        }
    },

    computed:{
       

        dateNow(){
             var date =new Date();
             return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        },
        disabled(){
            
            // return !(this.username && this.password && this.repassword && this.schoolId && this.phone && this.trueName && this.buildId && this.addRole )

            if(this.addRole=='系统管理员'){
        
                return !(this.username && this.password  && this.schoolId && this.phone && this.trueName  && this.addRole)
            }else{
                return !(this.username && this.password  && this.schoolId && this.phone && this.trueName && this.buildId && this.addRole)
            }
        },

        show(){
            if(this.addRole=='系统管理员'){
                return false
            }else{
                return true
            }

        },

        inputRole(){
             if(this.addRole=='系统管理员'){
                return 0
            }else{
                return 1
            }
        },

        inputBuildId(){
            if(this.addRole=='系统管理员'){
                return "All"
            }else{
                return this.buildId
            }
        },

        
    },

    methods:{
        async handleMonted(){
            let res= await this.$axios({
                methods:'GET',
                url:'http://localhost:8091/user/getAllAdmin'
            })

            // console.log(res)

            for (let v of res.data) {
                v.role === 0 ? this.admin.push(v) : this.houseParent.push(v)
            }

            // console.log(this.admin)
            // console.log(this.houseParent)

            let result = await this.$axios({
                methods:'GET',
                url:'http://localhost:8091/build/getAllBuildId'
            })

            result.data.allBuildId.forEach(item => this.buildings.push(item.buildId,  ))
           
        },

        async handleaddadmin(){
            
            
            const { schoolId, username, password, phone, trueName } = this.$data
            console.log(schoolId, username, password, phone, trueName)
            let res = await this.$axios({
                methods:'GET',
                url:'http://localhost:8091/user/addAdmin',
                params:{
                    userName: username,
                    schoolId: schoolId,
                    passWord: password,
                    phoneNumber: phone,
                    trueName: trueName,
                    role: Number(this.inputRole),
                    buildId: this.inputBuildId,
                    checkTime: this.dateNow,
                   
                   
                }
            })

       

           
            console.log(res)
            
            if (res.data.code==='1000'){
                MessageBox({
                    title: '提示',
                    message: res.data.message,
                    // showCancelButton: true
                }).then(action => {

                    this.$router.push('/houseparentManage')
                    
                    
                });
            }else if(res.data.code==='1001') {
                MessageBox({
                    title: '提示',
                    message: res.data.message,
                   
                }).then(action => {
                   
                });
            }else{
                MessageBox({
                    title: '提示',
                    message: res.data.message,
                    
                }).then(action => {
                   
                });
            }
            
            
        },
        canceladd(){
             this.$router.push('/houseparentManage')
        },

        // onValuesChange(picker, values) {
        //     if (values[0] > values[1]) {
        //     picker.setSlotValue(1, values[0]);
        //     }
        // }
    },

    created(){
        if(this.role!==0){
            this.$router.push('/home')
        }
    },



    mounted(){
        this.handleMonted()
        console.log(this)
        // console.log(this.allAdmin)
        // console.log('所有的管理者')
    }
    
}
</script>


<style lang="css">
    .addadminContent{height: 100%;background: #ffffff;}
    select{height: 30px;width: 100px;font-size: 16px;}
     .selectContent{height:48px;padding: 0 10px;display: flex;background: #ffffff;font-size: 16px;border-bottom: 1px solid gainsboro;}
    .selectContent .leftspan{width: 105px;height: 48px;line-height: 48px;}
     .selectContent .rightselect{
        flex: 1; 
        height: 48px;
        padding: 8px 0;
    } 
    .picker-items{height: 60px;}
    .mint-radiolist-title{font-size: 16px;}
    

    .addadminContent .btnfooter{flex: 1;background: #ffffff;display: flex;padding:50px 0 ;}
</style>

