import axios from 'axios';
import Vue from 'vue';

Vue.prototype.$axios = axios;
Vue.prototype.$axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Vue.prototype.$axios.defaults.headers.common['Content-Type'] = 'application/json';
Vue.prototype.$axios.defaults.headers.common['Accept'] = 'application/json';
Vue.prototype.$axios.defaults.headers.common['Api-Key'] = window.apiSettings.key;
Vue.prototype.$axios.defaults.baseURL = window.apiSettings.baseUrl + window.apiSettings.prefix;

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        let {response: {status} = {}} = error;

        if (status === 419) {
            if (Vue.auth.check()) {
                Vue.auth.logout({
                    url: 'logout',
                    makeRequest: true,
                    redirect: {name: 'login'}
                });
            } else {
                window.location.reload();
            }
        }

        if (status === 403) {
            Vue.router.push({name: '403'});
        }

        if (status === 404) {
            Vue.router.push({name: '404'});
        }

        return Promise.reject(error);
    }
);

function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(base64);
}
