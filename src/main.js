// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI);
import moment from "moment"
import "@/assets/css/index.css"
Vue.config.productionTip = false
import myhttpserver from "@/plugins/http.js"
Vue.use(myhttpserver);
/* eslint-disable no-new */

// Vue.filter("timefmt",function (data) {
//   let d=new Date(data);
//   let y=d.getFullYear();
//   let m=(d.getMonth()+1).toString().padStart(2,"0");
//   let dd=d.getDate().toString().padStart(2,"0");
//   let h=d.getHours().toString().padStart(2,"0");
//   let mm=d.getMinutes().toString().padStart(2,"0");
//   let s=d.getSeconds().toString().padStart(2,"0");
//   return `${y}/${m}/${dd} ${h}-${mm}-${s}`
// })

Vue.filter("timefmt",(c)=>{
   return moment(c).format("YYYY-MM-DD");
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

})
