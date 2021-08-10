<template>
    <div class="box">
        <div class="logintop">欢迎登录</div>
        <div class="loginbox">
            
            <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
            <mt-button type="primary" size="large" @click="handleLogin">登录</mt-button>
        </div>
        <span class="loginbottom"></span>
    </div>
</template>

<script>
import Vue from 'vue'

import { Field,Header,Toast } from 'mint-ui';
Vue.use( Field,Header,Toast)
export default {
    data(){
        return {
            username:'',
            password:'',

        }
    },
    methods:{
        async handleLogin(){
            console.log('提交登录信息')
            
            // sessionStorage.setItem('username','管理员')
            this.$router.push('/home')
            

            let response = await this.$axios({
                method: 'get',
                url: 'http://localhost:8091/user/login',
                params: {
                userName: this.username,
                passWord: this.password
                }
            })
            console.log(response)
            console.log('取到返回信息')
            if (response.data.code === '1000') {
                
                const { userName, role, trueName, schoolId, roomId, phoneNumber, id, checkTime, buildId, updateTime, deleteTime } = response.data
                // sessionStorage.setItem('token', this.username)
                // sessionStorage.setItem('role', response.data.role)
                this.$store.state.userinfo.userName = userName
                this.$store.state.userinfo.role = role
                this.$store.state.userinfo.trueName = trueName
                this.$store.state.userinfo.schoolId = schoolId
                this.$store.state.userinfo.roomId = roomId
                this.$store.state.userinfo.phoneNumber = phoneNumber
                this.$store.state.userinfo.id = id
                this.$store.state.userinfo.checkTime = checkTime
                this.$store.state.userinfo.buildId = buildId
                this.$store.state.userinfo.updateTime = updateTime
                this.$store.state.userinfo.deleteTime = deleteTime
                console.log(sessionStorage.getItem('store'))
                this.$router.push('/home')
            } else {
               Toast({
                message: '用户名或密码有误',
                position: 'center',
                duration: 2000
                });
                console.log('登录失败')
            }

        },

        
    },
}
</script>


<style lang="css">
    .loginbox{background: rgb(178, 180, 182);flex: 1;}
    .logintop{width: 100%; height:130px; font-size: 25px ;text-align: center;background: chartreuse;line-height:130px ;}
    .loginbox{height:30% ;}
    
    


    
</style>