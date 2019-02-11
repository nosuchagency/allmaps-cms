import Vue from 'vue';

Vue.component('toolbar', require('./components/toolbar.vue'));
Vue.component('ribbon', require('./components/ribbon'));
Vue.component('confirm-dialog', require('./components/confirm-dialog.vue'));

Vue.component('multi-select', require('./components/multi-select'));

Vue.component('fetch-items', require('./components/fetch-items'));

Vue.component('layout', require('./components/layout'));

Vue.component('file-content', require('./components/content-types/file-content.vue'));
Vue.component('gallery-content', require('./components/content-types/gallery-content.vue'));
Vue.component('image-content', require('./components/content-types/image-content.vue'));
Vue.component('text-content', require('./components/content-types/text-content.vue'));
Vue.component('video-content', require('./components/content-types/video-content.vue'));
Vue.component('web-content', require('./components/content-types/web-content.vue'));
