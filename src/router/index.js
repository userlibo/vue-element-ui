import Vue from 'vue'
import Router from 'vue-router'
import login from "@/components/login"
import home from "@/components/home"
import userlist from "@/components/users/userlist.vue"
import right from "@/components/right/right.vue"
import rolelist from "@/components/right/rolelist.vue"
import classificy_arguments from "../components/goods/classificy_arguments";
import goods_category from "../components/goods/goods_category";
import goods_list from "../components/goods/goods_list";
import goods_add from "../components/goods/goods_add";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/login"
    },
    {
      path:"/login",
      name:"login",
      component:login
    },
    {
      path:"/home",
      name:"home",
      component:home,
      children:[
        {path:"userlist",name:"userlist",component:userlist},
        {path:"right",name:"right",component:right},
        {path:"rolelist",name:"rolelist",component:rolelist},
        {path:"classificy_arguments",name:"classificy_arguments",component:classificy_arguments},
        {path:"goods_category",name:"goods_category",component:goods_category},
        {path:"goods_manager",name:"goods_list",component:goods_list},
        {path:"goods_add",name:"goods_add",component:goods_add}
      ]
    },
    {
      path:"/home",
      redirect:"/home/userlist"
    }
  ]
})
