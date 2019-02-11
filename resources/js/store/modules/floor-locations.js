const state = {
    newLocationToolbarActive: null,
    locationOptions: [],
    selectedLocation: '',
    currentLocation: null,
    currentIndex: -1,
    planActive: true
};

const getters = {
    newLocationToolbarActive: state => state.newLocationToolbarActive,
    selectedLocation: state => state.selectedLocation,

    locationOptions: state => state.locationOptions,

    currentLocation: state => state.currentLocation,
    currentIndex: state => state.currentIndex,
    planActive: state => state.planActive
};

const actions = {

};

const mutations = {
    setNewLocationToolbarActive(state, active) {
        state.newLocationToolbarActive = active;
        state.currentLocation = null;
    },
    setLocationOptions(state, options) {
        state.locationOptions = options;
    },
    setSelectedLocation(state, selected) {
        state.selectedLocation = selected;
    },
    setCurrentLocation(state, location) {
        state.currentLocation = location;
        state.newLocationToolbarActive = false;
        state.currentIndex = -1;
    },
    setCurrentIndex(state, index) {
        state.currentIndex = index;
    },
    setPlanActive(state) {
        state.planActive = !state.planActive;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}