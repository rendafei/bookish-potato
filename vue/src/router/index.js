import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
const Agree = () => import('../views/Agree.vue');
const Completed = () => import('../views/Completed.vue');
const Upload = () => import('../views/Upload.vue');
const Login =() => import('../views/Login.vue')
Vue.use(VueRouter)

const routes = [
	{
		path: '/home',
		name: 'Home',
		component: Home,
		children: [
			// {
			// 	// main 会被渲染在 home 的 <router-view> 中
			// 	path: 'main',
			// 	component:	Main,
			// 	name:'主页'
			// },
			{
				path:'Agree',
				component: Agree,
				name:'Agree'
			},
			{
				path:'Completed',
				component: Completed,
				name:'Completed'
			  },
			  {
				path:'Upload',
				component: Upload,
				name:'Upload'
			  }
		]
	},
	{
	path: '/',
    name: 'Login',
    component:Login,
    },
	{
		path: '/login',
		name: 'login',
		component: Login
	},

]
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
