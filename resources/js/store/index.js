import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import plan from './modules/floor-plan';
import location from './modules/floor-locations';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        user,
        plan,
        location
    },
    getters
});

export default store;