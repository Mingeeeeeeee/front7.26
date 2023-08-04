import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Nav from "../components/Nav.vue";
import seg from "../components/seg.vue";
import Sd from "../components/Sd.vue";
import Color from "../components/Color.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
    children: [
      {
        path: `seg/:id`,
        component: seg,
        meta: { title: "欢迎来到GinBlog" },
        props: true,
      },
      {
        path: `sd/:id`,
        component: Sd,
        meta: { title: "欢迎来到GinBlog" },
        props: true,
      },
      {
        path: `color/:id`,
        component: Color,
        meta: { title: "欢迎来到GinBlog" },
        props: true,
      },
    ],
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Register",
    name: "Register",
    component: Register,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// router.beforeEach((to,from,next)=>{
//   if (to.meta.title){
//     document.title=to.meta.title
//   }
//   const token = window.sessionStorage.getItem('token')
//   console.log("token",token)
//   if (to.path=="/")next("/login")
//   if(to.path==='/login')return next()
//   if(!token &&to.path=='/home'){
//     // Vue.prototype.$message.error("请先登录")
//     next("/login")
//   }else{
//     next()
//   }
// })

export default router;
