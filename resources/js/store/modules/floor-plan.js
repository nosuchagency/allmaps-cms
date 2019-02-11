const state = {
    secondaryToolbarActive: null,
    componentOptions: [],
    selectedComponent: '',

    newComponentToolbarActive: false,

    currentComponent: null,
    currentComponentCopy: null,

    currentIndex: -1,

    savingFloor: false,
};

const getters = {
    newComponentToolbarActive: state => state.newComponentToolbarActive,
    selectedComponent: state => state.selectedComponent,

    currentComponent: state => state.currentComponent,
    currentComponentCopy: state => state.currentComponentCopy,

    savingFloor: state => state.savingFloor,
    currentIndex: state => state.currentIndex,

    componentOptions: state => state.componentOptions,
};

const actions = {

};

const mutations = {
    setCurrentComponent(state, currentComponent) {
        state.newComponentToolbarActive = false;
        state.currentComponent = currentComponent;
    },
    setCurrentComponentCopy(state, currentComponentCopy) {
        state.currentComponentCopy = currentComponentCopy;
    },
    setNewComponentToolbarActive(state, active) {
        state.newComponentToolbarActive = active;
    },
    setSavingFloor(state, saving) {
        state.savingFloor = saving;
    },
    setCurrentIndex(state, index) {
        state.currentIndex = index;
    },
    setComponentOptions(state, options) {
        state.componentOptions = options;
    },
    setSelectedComponent(state, selected) {
        state.selectedComponent = selected;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}