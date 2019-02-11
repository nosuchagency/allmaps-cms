<template>
    <div>
        <div class="location-select"
             v-if="!currentLocation && newLocationToolbarActive">
            <select :value="selectedLocation"
                    @change="setSelectedLocation">
                <option value=""
                        selected>Choose element</option>
                <option v-for="(location, index) in locationOptions"
                        :key="index"
                        :value="location">{{location.name}}</option>
            </select>
        </div>
        <div class="location-details">

        </div>
        <div class="action-buttons">
            <el-button size="mini"
                       v-if="!currentLocation && newLocationToolbarActive"
                       @click="cancelLocation()"
                       plain>
                Cancel
            </el-button>
            <el-button size="mini"
                       v-if="!currentLocation && newLocationToolbarActive && selectedLocation"
                       @click="createLocation(selectedLocation)"
                       plain>
                Add to Floor
            </el-button>
        </div>
    </div>
</template>

<script>
import Hub from '../../../events/hub';
import { mapGetters } from 'vuex';

export default {
    props: {
        floor: Object
    },
    computed: {
        ...mapGetters('location', ['currentLocation', 'newLocationToolbarActive', 'locationOptions', 'selectedLocation'])
    },
    methods: {
        setSelectedLocation(e) {
            this.$store.commit('location/setSelectedLocation', this.locationOptions[e.target.selectedIndex - 1]);
        },
        createLocation() {
            if (!this.selectedLocation) return;

            Hub.$emit('addLocationToFloor', this.selectedLocation);
        },
        cancelLocation() {
            this.$store.commit('location/setNewLocationToolbarActive', false);
            this.$store.commit('location/setCurrentIndex', -1);
        }
    }
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.location-select {
    margin-left: 25px;
}

.action-buttons {
    margin-left: auto;
    margin-right: 25px;
}

.location-details {
    color: white;
    font-size: 14px;
    margin-left: 25px;

    span {
        margin-right: 15px;
        font-weight: bold;

        &:first-child {
            text-transform: capitalize;
        }
    }
}
</style>