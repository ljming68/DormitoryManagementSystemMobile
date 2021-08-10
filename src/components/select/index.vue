<template>
    <div class="main">
       <button>嗲家</button>
        <!-- <div class="input" @click="openValue">
          <input v-model="value" type="text" placeholder="筛选实验类型">
          <img src="../assets/arrow.png" alt="">
        </div>
        <div class="list" v-show="show">
          <ul>
            <li @click="getvalue(index,item)" v-for="(item,index) in tableData" :key="item.index">{{ item.name }}</li>
          </ul>
        </div> -->
    </div>
</template>

<script>
export default {
//     name: 'select',
     
//     data(){
//       return{
//         tableData:[
//           {
//             'name':111
//           },
//           {
//             'name':222
//           },
//           {
//             'name':333
//           }, {
//             'name':444
//           }
//         ],
//         show:false,
//         value:''
//       }
//     },
//     methods: {
//       openValue(){
//         this.show=!this.show;
//       },
//       getvalue(index,item){
//         this.value=item.name;
//         this.show=false;
//         },
//     },

}
</script>

<style lang="css">
   /* .select{
  margin: 200px;
}
  ul li{
    list-style: none;
  }
  .input{
    width: 140px;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    border: 1px solid #cccccc;
    position: relative;
  }
  .input input{
    border: none;
    outline: none;
    width: 90%;
  }
  .input img{
    position: absolute;
    right: 34px;
    top: 48%;
  }
  .list{
    width: 150px;
    border: 1px solid #cccccc;
    overflow: hidden;
  }
  .list ul li{
    width: 100%;
    height: 30px;
    cursor: pointer;
    line-height: 30px;
    padding-left: 10px;
  }
  .list ul li:hover{
    background-color: #cccccc;
  }  */
</style>
   



