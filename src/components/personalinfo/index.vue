<template>
    <div class="main">
        <div class="personinfo">
            <div class="headerinfo">
                <img src="http://study.esunr.xyz/1582549904311.png" alt="">
                <div class="roleAndtrueName">
                    <div class="trueName">
                    <div>{{ formData[3].value }}</div>
                    </div>
                    <div class="role">
                    <div>{{ formData[0].value }}</div>
                    </div>
                </div>
            </div>

            <div class="middleline"></div>

            <div class="footerinfo">
              
                <li v-for="item in formData" :key="item.key">
                    {{item.key}}:{{item.value}}
                </li>
            </div>

        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            formData: [
        {
          key: '身份',
          value: this.$store.state.userinfo.role === 0 ? `系统管理员` : this.$store.state.userinfo.role === 1 ? `宿舍管理员` : `学生`
        },
        {
          key: 'schoolId',
          value: this.$store.state.userinfo.schoolId
        },
        {
          key: '用户名',
          value: this.$store.state.userinfo.userName
        },
        {
          key: '真实姓名',
          value: this.$store.state.userinfo.trueName
        },
        {
          key: '联系方式',
          value: this.$store.state.userinfo.phoneNumber
        },
        {
          key: '楼号',
          value: this.$store.state.userinfo.buildId
        },
        {
          key: '房间号',
          value: this.$store.state.userinfo.roomId
        },
        {
          key: '注册日期',
          value: this.$store.state.userinfo.checkTime
        },
        {
          key: '入住日期',
          value: this.$store.state.userinfo.updateTime
        },
        {
          key: '离住日期',
          value: this.$store.state.userinfo.deleteTime
        },
        
      ],
      id: this.$store.state.userinfo.id,
      checkTime: this.$store.state.userinfo.checkTime
        }
    }
}
</script>

<style lang="css">
    .personinfo{height: 100%;background: floralwhite;display: flex;flex-direction: column}
    .headerinfo{height:200px ;background-color: gold;}
    .headerinfo img{width: 100px;height: 100px;margin:50px auto 0;}
    .headerinfo .roleAndtrueName {height: 50px;text-align: center;}
    .middleline{height: 10px;background-color: greenyellow;}
    .footerinfo{flex: 1; background-color: rgb(223, 223, 223);}
    .footerinfo li{height: 40px;line-height: 40px;padding: 0 10px;}
</style>