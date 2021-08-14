<template>
    <div class="main">
       <div class="houseparentmanage">
           <div class="operationArea">
               <div class="showAllNumber">
                   <div >总数：</div>
                   <div >{{AllNumber}}</div>
               </div>
               <div class="showpartNumber">
                
                    <!-- <mt-button class="iconfont icon-wode" type="danger" size="large">系统管理员：{{SystemAdminNumber}}</mt-button>
                    <mt-button class="iconfont icon-wode" type="primary" size="large">宿舍管理员：{{ HouseparentNumber}}</mt-button> -->
                    <span class="showSystemadminNumber">系统管理员：{{SystemAdminNumber}}</span>
                    <span class="showHouseparentNumber">宿舍管理员：{{ HouseparentNumber}}</span>
               </div>
              
           </div>
             <div class="Addbtn">
                
                <mt-button type="default" size="large" @click="Addadmin">添加管理员</mt-button>
               </div>
            <div class="line">已有管理员列表</div>

            <div class="showtable">
                <table cellpadding="0"  cellspacing="0" rules="groups">
                <tr>
                    <th>姓名</th>
                    <th>工号</th>
                    <!-- <th>手机号</th> -->
                    <th>身份</th>
                    <th>操作</th>
                    <!-- <th>管理宿舍楼</th> -->

                </tr>

                <tr>
                <td>LJMing</td>
                <td>18060001</td>
               
                <td>系统管理员</td>
                 <!-- <td><div style="width:40px;height:20px;background:white;">详情</div></td> -->
                 <td><mt-button type="primary">primary</mt-button></td>
                 
              
                
                </tr>

                
           

                </table>
            </div>

       </div>
      
    </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'mint-ui';
Vue.use(Button);
export default {
    data(){
        return{
            AllNumber:20,
            SystemAdminNumber:0,
            HouseparentNumber:0,
            // role:'',

            displayinfo:[],


        }
    },
    created(){
        if(this.role!==0){
            this.$router.push('/home')
        }
    },
  
  

    computed:{
        role(){

            return this.$store.state.userinfo.role
           
        },
        allAdmin() {
            let table = [...this.admin, ...this.houseParent]
            for (let v of table) {
                if (v.role === 0) {
                v.trueRole = '系统管理员'
                v.buildId = '全体宿舍'
                } else if (v.role === 1) { v.trueRole = '宿舍管理员' }
            }
            console.log(table)
            return table
    },


    }, 
    

    methods:{
        Addadmin(){
            this.$router.push('/houseparentManage/addadmin')
        },

        async handleMounted(){
            let res= await this.$axios({
                methods:'GET',
                url:'http://localhost:8091/user/getAllAdmin'
            })
            console.log(res)
            this.displayinfo = res.data
            console.log(this.displayinfo)



            // let response = await this.axios({
            //     method: 'get',
            //     url: 'http://localhost:8091/user/login',
                
                
            // })

            // for(let i in res.data){
            //     i.role===0?this.admin.push(i):this.housePartent.push(i)
            // }

            // let result = await this.$axios({
            //     methods:'GET',
            //     url:'http://localhost:8091/build/getAllBuildId'
            // })
            //value  存在问题
            // result.data.allBuildId.forEach(item => this.buildings.push({ value: item.buildId, label: item.buildId }))
        },
    },


    mounted() {
    this.handleMounted()
    // console.log(this.allAdmin)
    },
}
</script>


<style lang="css">
    .houseparentmanage{height: 100%;background: chartreuse;display: flex;flex-direction: column;}
    .operationArea{height: 82px;background: #ffffff;display: flex;}
    .operationArea .showAllNumber{width: 30%;background: palegreen;}
    .operationArea .showpartNumber{width: 70%;}
    .operationArea .showpartNumber span{width: 100%;display: block;text-align: center;line-height: 41px;color: white;font-size: 20px;}
    .operationArea .showpartNumber span:nth-child(1){height: 41px;background: brown;}
    .operationArea .showpartNumber span:nth-child(2){height: 41px;background:rgb(55, 55, 114);}
    .operationArea .Addbtn{flex: 1;background: #ffffff}
    
    .line{height: 40px;font-weight: 900;font-size: 20px;line-height: 40px; background-color: rgb(54, 121, 54);}

    .showtable{flex: 1;background: gray;}
    .showtable table{
    width: 100%;
    /* height:70%; */
    /* margin: 0 auto ; */
    border: 1px solid blue;
    /* table-layout: fixed; */
    }
    .showtable table th{height: 30px; }
    .showtable table td{
                font-size: 14px;
                border: 1px solid blue;
                height:35px;
                text-align: center;
                
            
            }

</style>