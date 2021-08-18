import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Header from '@/components/Header'
// import Home from '@/components/home'
const Home =() =>import('@/components/home/index')
const Header =() =>import('@/components/Header')
const Notice =() =>import('@/components/notice/index')
const Addnotice=()=>import('@/components/notice/addnotice')
const Noticedetail=()=>import('@/components/notice/noticedetail')
const Noticeheader =() =>import('@/components/notice/header')
const HouseparentManage =() =>import('@/components/houseparentManage/index')
const Addadmin =() =>import('@/components/houseparentManage/addadmin')
const Admindetail=()=>import('@/components/houseparentManage/admindetail')
const Addadminheader =() =>import('@/components/houseparentManage/header')
// const Admindetailheader =() =>import('@/components/houseparentManage/detailheader')

const StudentManage =() =>import('@/components/studentManage/index')
const AddStudent=()=>import('@/components/studentManage/addstudent')
const Examineinfo =() =>import('@/components/examineinfo/index')
const Personalinfo =() =>import('@/components/personalinfo/index')
const Login =() =>import('@/components/login/index')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'login',
      
    },
    {
      path: '/home',
      name: 'home',
      components:{

        header:Header,  //前面的header 要小写  router name =''
        default:Home
        
      }
    },

    {
      path: '/login',
      name: 'login',
      components:{

       
        default:Login
        
      }
    },



    {
      path: '/notice',
      name: 'notice',
      components:{

        header:Header,  //前面的header 要小写  router name =''
        default:Notice
        
      },
     
      
    },

    {
      path: '/notice/addnotice',
      name: 'addnotice',
      components:{
       
        default:Addnotice
       
        
      },
      // children:[
      //   {
      //     path:'select',  //此处不要加斜杠
      //     component:()=>import('@/components/select/index')
      //   },
        
        
  
      // ]
    },

    {
      path: '/notice/noticedetail',
      name: 'noticedetail',
      components:{

        header:Noticeheader,
        
        default:Noticedetail
       
        
      },
     
    },


    {
      path: '/houseparentManage',
      name: 'HouseparentManage',
      components:{

        header:Header,  //前面的header 要小写  router name =''
        default:HouseparentManage
        
      }
    },

    {
      path: '/houseparentManage/addadmin',
      name: 'addadmin',
      components:{

        header:Addadminheader,  //前面的header 要小写  router name =''
        default:Addadmin
        
      }
    },

    {
      path: '/houseparentManage/admindetail',
      name: 'admindetail',
      components:{

        // header:Admindetailheader,
        
        default:Admindetail
       
        
      },
     
    },

    {
      path: '/studentManage',
      name: 'studentManage',
      components:{

        header:Header,  //前面的header 要小写  router name =''
        default:StudentManage
        
      }
    },

    {
      path: '/studentManage/addstudent',
      name: 'addstudent',
      components:{

        header:Addadminheader,  //前面的header 要小写  router name =''
        default:AddStudent
        
      }
    },

    {
      path: '/examineinfo',
      name: 'examineinfo',
      components:{

        header:Header,  //前面的header 要小写  router name =''
        default:Examineinfo
        
      }
    },

    {
      path: '/personalinfo',
      name: 'personalinfo',
      components:{

        header:Header,  //前面的header 要小写  router name =''
        default:Personalinfo
        
      }
    },

    
  ]
})
