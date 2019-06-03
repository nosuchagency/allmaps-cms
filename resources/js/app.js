import Vue from 'vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import elementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import wysiwyg from 'vue-wysiwyg';
import PortalVue from 'portal-vue'
import store from './store';
import i18n from './i18n';

Vue.use(VueAxios, axios);
Vue.use(elementUI, {locale});
Vue.use(wysiwyg, {});
Vue.use(PortalVue);

require('leaflet/dist/leaflet');
require('leaflet-path-transform');
require('leaflet.gridlayer.googlemutant');
require('leaflet-imageoverlay-rotated');
require('leaflet-easybutton');
require('./leaflet-icon-fix');

require('./sentry-setup');
require('./axios-setup');

const files = require.context('./components/global', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key)));

Vue.router = router;
Vue.config.productionTip = false;

require('./vue-auth-setup');

import app from './app.vue';

new Vue({
    i18n,
    store,
    router,
    render: h => h(app)
}).$mount('#app');
