import axios from 'axios';
import Vue from 'vue';

Vue.prototype.$axios = axios;
Vue.prototype.$axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Vue.prototype.$axios.defaults.headers.common['Content-Type'] = 'application/json';
Vue.prototype.$axios.defaults.headers.common['Accept'] = 'application/json';
Vue.prototype.$axios.defaults.headers.common['Api-Key'] = window.apiKey;
Vue.prototype.$axios.defaults.baseURL = window.baseUrl;

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
        if (error.response === 419) {
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
        return Promise.reject(error);
    }
);