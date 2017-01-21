
import VueRouter from 'vue-router';
const Route=[
  {
    path:"/",
    name:"main",
    redirect: '/home',
    component:require("./pages/main.vue"),
    children:[{
      path:"home",
      name:"首页",
      component:require("./pages/home.vue")
    },
      {
        path:"jobs",
        name:"职位列表",
        component:require("./pages/joblists.vue")
      },
      {
        path:"jobinfo/:id",
        name:"职位详情",
        component:require("./pages/jobinfo.vue")
      },{
        path:"user",
        name:"用户信息",
        redirect: { name: '个人简历'},
        component:require("./pages/user.vue"),
        children:[
          {
            path:"resume",
            name:"个人简历",
            component:require("./pages/user_resume.vue")
          }
          ,
          {
            path:"SendRecord",
            name:"投递反馈",
            component:require("./pages/user_SendRecord.vue")
          }
        ]

      }
    ]
  }
  ];
const routerOBJ = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes:Route
});

//const  Route=registerRoute(Navconfig);
export default routerOBJ;
