


import VueRouter from 'vue-router';
const Route=[{
  path:"/",
  name:"首页",
  redirect: { name: '登录'},
  component:require("./pages/home.vue"),
  "children":[
    {
      path:"studentlist",
      name:"学员管理",
      component:require("./pages/studentlist.vue"),
      meta:{
        index:"1-2"
      }
    },
    {
      path:"resumelist",
      name:"简历列表",
      component:require("./pages/resumelist.vue")

    },
    {
      path:"DBuserinfo",
      name:"个人中心",
      component:require("./pages/DBuserinfo.vue"),
      meta:{
        index:"1-1"
      }
    },
    {
      path:"DBuserInfoinit",
      name:"个人信息初始化",
      component:require("./pages/DBuserInfoinit.vue"),
      meta:{
        index:"1-1"
      }

    },
    {
      path:"jobsearch",
      name:"职位搜索",
      component:require("./pages/joblists.vue"),
      meta:{
        index:"1-3"
      }

    },
    {
      path:"jobinfo/:id",
      name:"职位详情",
      component:require("./pages/jobinfo.vue"),
      meta:{
        index:"1-3"
      }

    },
    {
      path:"resume/:id",
      name:"个人简历",
      component:require("./pages/user_resume.vue"),
      meta:{
        index:"1-2"
      }
    },{
      path:"ediresume/:id",
      name:"编辑个人简历",
      component:require("./pages/edi_resume.vue"),
      meta:{
        index:"1-2"
      }
    },
    {
      path:"adduser",
      name:"添加学员",
      component:require("./pages/adduser.vue"),
      meta:{
        index:"1-2"
      }
    },
    {
      path:"Delivery",
      name:"投递管理",
      component:require("./pages/Delivery_manage.vue"),
      meta:{
        index:"1-4"
      }
    }
  ]
},
  {
    path:"/login",
    name:"登录",
    component:require("./pages/login.vue"),
  },
  {
    path:"/regist",
    name:"注册",
    component:require("./pages/regist.vue"),
  },

  ];
const routerOBJ = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes:Route
});

//const  Route=registerRoute(Navconfig);
export default routerOBJ;
