import Vue from 'vue';
import VueInternationalization from 'vue-i18n';
import translations from 'js/vue-i18n-locales.generated';

Vue.use(VueInternationalization);

export default new VueInternationalization({
    locale: window.user ? window.user.locale : 'en',
    messages: translations
});
