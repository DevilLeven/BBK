


import VueRouter from 'vue-router';
const Route=[{
  path:"/",
  name:"首页",
  redirect: {path: 'login'},
  component:require("./pages/home.vue"),
  "children":[
    {
      path:"positionlist",
      name:"职位列表",
      component:require("./pages/positionlist.vue"),
      meta:{
        index:"1-3"
      }
    },
    {
      path:"resumelist",
      name:"简历列表",
      component:require("./pages/resumelist.vue"),
      meta:{
        index:"1-2"
      }

    },
    {
      path:"companyinfo",
      name:"企业信息",
      component:require("./pages/companyinfo.vue"),
      meta:{
        index:"1-1"
      }
    },
    {
      path:"companyinfoinit",
      name:"企业信息初始化",
      component:require("./pages/companyinfoinit.vue"),
      meta:{
        index:"1-1"
      }
    },
    {
      path:"resume/:positionId/:deliveId",
      name:"个人简历",
      component:require("./pages/user_resume.vue"),
      meta:{
        index:"1-2"
      }
    },
    {
      path:"bresume/:pdid",
      name:"b简历列表",
      component:require("./pages/b_resumelist.vue"),
      meta:{
        index:"1-2"
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
    path:"/loginother",
    name:"loginother",
    component:require("./pages/loginother.vue"),
  },
  {
    path:"/regist",
    name:"注册",
    component:require("./pages/regist.vue"),
  },
  {
    path: "*",
    name: "def",
    redirect: {path: 'login'}
  }

  ];
const routerOBJ = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes:Route
});

//const  Route=registerRoute(Navconfig);
export default routerOBJ;
