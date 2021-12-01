import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        isLogin: false,
        userInfo: {}
    },
    mutations: {
        // 用户登录成功后
        login(state, payload) {
			state.isLogin = true;
			state.userInfo = payload
			uni.setStorage({
			    key: 'userInfo',
			    data: payload
			})

        },
        // 用户登出后
        logout(state) {
            state.isLogin = false;
            state.userInfo = {};
            uni.removeStorage({
                key: 'userInfo'
            })
        }
    }
})

export default store