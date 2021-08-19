<template>
    <div class="main"> 
        <div class="studentManagerContent">
            <div class="showAllStudentNums">{{'总数：'+AllStudentNums}}</div>
            <div class="addStudent">
                <mt-button type="primary" size="large" style="height:50px" @click="handleAddStudent">添加学生</mt-button>
            </div>
            <div class="line" style="height:10px;background:red;"></div>
            <div class="title">管理学生信息</div>
            <div class="search">
                <mt-field label="搜索" placeholder="请输入查询内容" v-model="searchValue"></mt-field>
                <!-- <button @click="handleSearch">查询</button> -->
                <i class="iconfont icon-sousuo" @click="handleSearch" style="height:50px;font-size:25px;"></i>
                <i class="iconfont icon-shuaxin" @click="handleRefresh" style="height:50px;font-size:25px;flex:1;"></i>
            </div>
            <div class="studentsTable" >
                <table cellpadding="0"  cellspacing="0" rules="groups">
                    <tr>
                    <th>姓名</th>
                    <th>学号</th>
                    <th>楼号</th>
                    <th>房间号</th>
                    <th>操作</th>
                    </tr>
                    
                    <tr v-for="i in this.displayinfo.length " :key="i">
                        <td v-for="(item,index) in displayinfo[i-1]" :key="index">{{item}}</td>
                        <td><router-link class="table_btn" :to="{name:'studentdetail',query:{schoolId:displayinfo[i-1].schoolId}}" tag="button">详情</router-link></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue"
import { Button,Indicator } from 'mint-ui';
Vue.use(Button,Indicator)

export default {
    data(){
        return {
            
            AllStudentNums:'',
            searchValue:'',
            
            displayinfo:[],
            // Trlist:[],
            saveList:[],
            
        }
    },

    computed:{
        role(){
            return this.$store.state.userinfo.role
        },
        buildId(){
            return this.$store.state.userinfo.buildId
        },
        // result(){
        //    return 
        // }
    },

    methods:{
        async handleMounted(){
            let res = await this.$axios({
                method:'get',
                url:'http://localhost:8091/user/getAllStudent',
                params:{
                    role:this.role,
                    buildId:this.buildId || '' || 'All'

                }

            })
            console.log(res)
            
            for(let v in res.data){
                let addinfo = {}
                let item =res.data[v]
                // console.log(v)
                addinfo['trueName'] = item.trueName
                addinfo['schoolId'] = item.schoolId
                addinfo['buildId'] = item.buildId
                addinfo['roomId'] = item.roomId
                this.displayinfo.push(addinfo)
            }


            // let list = []
            // for(var i=0;i<this.displayinfo.length;i++){
            //     list[i]=i
               
            // }
            // this.Trlist=list
            

            this.AllStudentNums=this.displayinfo.length
            this.saveList = this.displayinfo
             console.log(this.saveList)
             


            


        },

        handleAddStudent(){
            this.$router.push('/studentManage/addstudent')
        },

        async handleSearch(){
             
            this.displayinfo = this.saveList.filter(item => 
            item.buildId === this.searchValue || item.trueName === this.searchValue || item.schoolId == this.searchValue || item.roomId == this.searchValue
            )
            // console.log(this.displayinfo)
        },

        handleRefresh() {
            this.searchValue = ''
             this.displayinfo = []
            this.handleMounted()
        },

    },


    mounted(){
        Indicator.open('加载中')
        setTimeout(() =>{
        this.handleMounted().then(()=>{
            Indicator.close()
        })
        },1000);
    }
}
</script>

<style lang="css" >
    .studentManagerContent{
        height: 100%;
        background: white;
        display: flex;
        flex-direction: column;
    }
    .showAllStudentNums{
        height: 60px;
        background: palegreen;

        font-size: 30px;
        font-weight: 900;
        line-height: 60px;
    }
    .addStudent{
        height: 50px;
        background: coral;
    }
    .title{
        height: 30px;
        font-size: 15px;
        font-weight: 900;
        line-height: 30px;
        /* background-color: rgb(54, 121, 54); */

    }
    .search{
        height: 50px;
        display: flex;
        /* background: darkgray; */
        border: 1px solid blue;
        border-bottom:0 ;
    }
    i{
       
        line-height: 50px;
        text-align: center;
    }
   



    .studentsTable{
        flex: 1;
        background: darkgray;
        overflow-y:scroll;
       
    }

    
    .studentsTable table{
        width: 100%;
        border: 1px solid blue;
   
    }
    .studentsTable table th{height: 30px; }
    .studentsTable table td{
        font-size: 14px;
        border: 1px solid blue;
        height:35px;
        text-align: center;

    }
    .studentsTable table td .table_btn{
        width:40px;
        height: 25px;
        background: #26A2FF;
        border-radius:5px ;
    }
</style>