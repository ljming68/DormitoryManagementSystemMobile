<template>
    <div class="main">
       <div class="houseparentmanage">
           <div class="operationArea">
               <div class="showAllNumber">
                   <div style="font-size:25px;font-weight:900;">总数：</div>
                   <div style="font-size:25px;font-weight:900;">{{this.Trlist.length}}</div>
               </div>
               <div class="showpartNumber">
                
                    <!-- <mt-button class="iconfont icon-wode" type="danger" size="large">系统管理员：{{SystemAdminNumber}}</mt-button>
                    <mt-button class="iconfont icon-wode" type="primary" size="large">宿舍管理员：{{ HouseparentNumber}}</mt-button> -->
                    <span class="showSystemadminNumber">系统管理员：{{Count}}</span>
                    <span class="showHouseparentNumber">宿舍管理员：{{ Count2}}</span>
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

                <tr v-for="(i,index) in Trlist " :key="index">
                    <td v-for="(item,index) in allAdmin[i]" :key="index">{{item}}
                        
                    </td>
                    <!-- <td><button style="width:40px;height: 25px;background: #26A2FF;border-radius:5px ;" @click="viewDetail">详情</button></td> -->
                    <td><router-link class="table_btn" :to="{name:'admindetail',query:{schoolId:allAdmin[i].schoolId}}" tag="button">详情</router-link></td>
                 
                    
              
               
                
                 <!-- <td><div style="width:40px;height:20px;background:white;">详情</div></td> -->
                 <!-- <td><mt-button type="primary">primary</mt-button></td> -->
                 
              
                
                </tr>

                
           

                </table>
            </div>

       </div>
      
    </div>
</template>

<script>
import Vue from 'vue'
import { Button,Indicator } from 'mint-ui';
Vue.use(Button,Indicator);
export default {
    data(){
        return{
            // AllNumber:,
          
            // role:'',

            displayinfo:[],
            Trlist:[],
            Count:'',
            


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

        Count2(){
            let ret=Number(this.Trlist.length)-Number(this.Count)
            console.log(ret)
            return ret
        },

        
        allAdmin() {
            let table = this.displayinfo
            for (let v of table) {
                if (v.role === 0) {
                v.role = '系统管理员'
                // v.buildId = '全体宿舍'
                } else if (v.role === 1) { v.role = '宿舍管理员' }
            }
            // console.log(table)
            return table
        },

        



        // Trlist(){
        //     let list=[]
        //     let len = this.displayinfo
        //      console.log(len)
        //      console.log(len.length)
        //     for(var i=0;i<len;i++){
        //         list[i]=i
        //     }
        //     return list
           
        // }

        


    }, 
    

    methods:{
        Addadmin(){
            this.$router.push('/houseparentManage/addadmin')
        },

        viewDetail(){

            // this.$router.push("{name:'admindetail',query:{schoolId:001}}")
        },

        async handleMounted(){
            let res= await this.$axios({
                methods:'GET',
                url:'http://localhost:8091/user/getAllAdmin'
            })
            console.log(res)
            for(let i in res.data){
                let item = res.data[i]
                let addinfo = {}

                addinfo['trueName'] = item.trueName
                addinfo['schoolId'] = item.schoolId
                addinfo['role'] = item.role

                
                
                this.displayinfo[i]=addinfo

            }

            let list = []
            let count=0
            for(var i=0;i<this.displayinfo.length;i++){
                list[i]=i
                if(this.displayinfo[i].role===0){
                    count+=1
                }
            }
            this.Trlist=list
            this.Count=count
             console.log(this.Trlist)
              console.log(this.Count)


        
            
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
   

    Indicator.open('加载中')
        setTimeout(() =>{
        this.handleMounted().then(()=>{
            Indicator.close()
        })
        },1000);
    
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

    .showtable{flex: 1;background: gray;overflow-y:scroll;}
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
    .showtable table td .table_btn{
        width:40px;
        height: 25px;
        background: #26A2FF;
        border-radius:5px ;
    }

</style>