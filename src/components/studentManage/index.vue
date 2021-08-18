<template>
    <div class="main"> 
        <div class="studentManagerContent">
            <div class="showAllStudentNums">{{'总数'+AllStudentNums}}</div>
            <div class="addStudent">
                <mt-button type="primary" size="large" style="height:50px" @click="handleAddStudent">添加学生</mt-button>
            </div>
            <div class="search">
                <mt-search
                v-model="value"
                cancel-text="取消"
                placeholder="搜索"
                style="height:50px"
                >
                </mt-search>
            </div>
            <div class="studentsTable"></div>
        </div>
    </div>
</template>

<script>
import Vue from "vue"
import { Button,Search } from 'mint-ui';
Vue.use(Button,Search)

export default {
    data(){
        return {
            AllStudentNums:'20',
        }
    },

    methods:{
        handleAddStudent(){
            this.$router.push('/studentManage/addstudent')
        }
    }
}
</script>

<style lang="css">
    .studentManagerContent{
        height: 100%;
        background: white;
        display: flex;
        flex-direction: column;
    }
    .showAllStudentNums{
        height: 60px;
        background: chartreuse;
    }
    .addStudent{
        height: 50px;
        background: coral;
    }
    .search{
        height: 50px;
        /* background: cornflowerblue; */
    }
    .studentsTable{
        flex: 1;
        background: darkgray;
    }
</style>