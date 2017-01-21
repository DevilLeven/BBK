import Vue from 'vue'
import App from './App'
import  vueResource from "vue-resource";
import router from './route.config.js';
import VueRouter from 'vue-router';
import until from "./until";
import Element from 'element-ui';
import './css/theme/index.css';
import './css/glyphicons.css';
import  Auth from "./modules/vue-auth";
Vue.config.devtools = true;
Vue.use(Element);
Vue.use(VueRouter);
Vue.use(vueResource);
//Vue.http.options.emulateJSON = true;
//Vue.http.options.root = '/bbk';


router.beforeEach((to, from, next) => {

  // console.log(from);
  next();
});
Vue.use(Auth,{
  router: router,
  http: Vue.http
});
new Vue({
  render: h => h(App),
  router
}).$mount('#app');

//请求拦截器
Vue.http.interceptors.push((request, next)  => {
  next(function (response) {

      if (!response.ok){
        this.$notify({
          title: '失败',
          message: '请求失败',
          type: 'error'
        });
      }
      try {
        if (response.data.result&&response.data.result=="login_out"){
          this.$alert('由于长时间未操作,登录超时,请重新登录', '登录超时', {
            confirmButtonText: '确定',
            callback: action => {
              router.replace({
                name: '登录'
              })
            }
          });
        }else if(response.data.code) {
          this.$notify({
            title: '失败',
            message: response.data.data,
            type: 'error'
          });
        }
      }catch (e){}

    })

});
