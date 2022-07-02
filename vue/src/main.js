import Vue from 'vue'
import App from './App.vue'
import 'default-passive-events'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
Vue.config.productionTip = true
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
