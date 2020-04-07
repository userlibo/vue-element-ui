import Vue from 'vue'
import Router from 'vue-router'
import login from "@/components/login"
import home from "@/components/home"
import userlist from "@/components/users/userlist.vue"


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

      ]
    }
  ]
})
