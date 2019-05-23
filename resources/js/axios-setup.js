import axios from 'axios';
import Vue from 'vue';
import router from './router/index';

Vue.prototype.$axios = axios;
Vue.prototype.$axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Vue.prototype.$axios.defaults.headers.common['Content-Type'] = 'application/json';
Vue.prototype.$axios.defaults.headers.common['Accept'] = 'application/json';
Vue.prototype.$axios.defaults.headers.common['Api-Key'] = window.apiSettings.key;
Vue.prototype.$axios.defaults.baseURL = window.apiSettings.baseUrl + window.apiSettings.prefix;

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    Vue.prototype.$axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status === 419) {
            if (Vue.auth.user().check()) {
                Vue.auth.logout({
                    url: 'logout',
                    makeRequest: true,
                    redirect: '/login'
                });
            } else {
                window.location.reload();
            }
        }

        if (error.response.status === 404) {
            router.push({name: '404'});
        }

        return Promise.reject(error);
    }
);