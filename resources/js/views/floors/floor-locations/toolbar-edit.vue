<template>
    <div>
        <div class="location-details"
             v-if="currentLocation">
            <span>Name: {{name}}</span>
            <span>Type: {{type}}</span>
            <span v-if="type === 'poi'">Draw Type: {{isArea ? 'Area' : 'Point'}}</span>
        </div>
        <div class="action-buttons"
             v-if="currentLocation">
            <el-button type="default"
                       size="mini"
                       v-if="!newLocationToolbarActive"
                       @click="closeLocation()"
                       plain>
                Close
            </el-button>

            <el-button type="default"
                       size="mini"
                       v-if="!newLocationToolbarActive && isInDatabase"
                       @click="removeLocation()"
                       plain>
                Remove
            </el-button>

            <el-button type="default"
                       size="mini"
                       v-if="!newLocationToolbarActive && isArea && hasAtleastTwoLatLngs"
                       @click="finishLocation()"
                       plain>
                Done
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
    mounted() {},
    computed: {
        ...mapGetters('location', ['currentLocation', 'newLocationToolbarActive']),
        name() {
            if (!this.currentLocation) return '';

            switch (this.currentLocation.location.location_type) {
                case 'poi':
                    return this.currentLocation.location.poi.name;
                case 'findable':
                    return this.currentLocation.location.findable.name;
                case 'beacon':
                    return this.currentLocation.location.name;
                default:
                    return '';
            }
        },
        type() {
            return this.currentLocation.location.location_type;
        },
        isArea() {
            let location = this.currentLocation.location;

            if (location.location_type !== 'poi' || !location.poi) return false;

            return location.poi.type === 'area';
        },
        hasAtleastTwoLatLngs() {
            if (!this.isArea) return false;

            return this.currentLocation.getLatLngs()[0].length >= 2;
        },
        isInDatabase() {
            let location = this.currentLocation.location;

            return location.id ? true : false;
        }
    },
    methods: {
        removeLocation() {
            Hub.$emit('removeLocationFromFloor');
        },
        closeLocation() {
            Hub.$emit('closeLocation');
        },
        finishLocation() {
            Hub.$emit('saveLocationEditing');
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