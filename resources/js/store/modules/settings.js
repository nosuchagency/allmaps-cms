const state = {
    settings: window.apiSettings
};

const getters = {
    baseUrl: state => state.settings.baseUrl
};

const actions = {};

const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations
}