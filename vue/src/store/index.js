import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)


function storeLocalStore (state) {
    window.localStorage.setItem("userMsg",JSON.stringify(state));
}

//创建VueX对象
const store = new Vuex.Store({
    state: {
        userrole:'',
        name:'',
        //存放的键值对就是所要管理的状态
        openTab: [], //所有打开的路由
        activeIndex: "/main" //激活状态
    },
    mutations: {
        // 添加主页tabs
        add_tabs(state, data) {
            this.state.openTab.push(data);
        },
        // 删除主页tabs
        delete_tabs(state, route) {
            let index = 0;
            for (let option of state.openTab) {
                if (option.route === route) {
                    break;
                }
                index++;
            }
            this.state.openTab.splice(index, 1);
        },
        // 设置当前激活的tab
        set_active_index(state, index) {
            this.state.activeIndex = index;
        },
        roleGet(state,object){
          state.userrole = object.id;
          state.name = object.name;
          storeLocalStore (state)
        },
    }
})

export default store