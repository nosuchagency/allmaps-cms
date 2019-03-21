<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-map-marked-alt title-icon"></i>
                        <template v-if="item">
                            <router-link :to="'/places/' + item.place.id">
                                {{ item.place.name }}
                            </router-link>
                            <i class="fa fa-caret-right" style="margin: 0 10px;"></i>
                            <i class="fa fa-grip-lines title-icon"></i>
                            <label>{{item.name}}</label>
                        </template>
                    </div>
                </template>
                <template slot="right">
                    <poi-select :url="getFloorUrl()"
                                @poi:add="addLocation">
                    </poi-select>
                    <poi-select :url="getFloorUrl()"
                                @poi:add="addLocation"
                                type="area"
                                label="POI Area">
                    </poi-select>
                    <fixture-select :url="getFloorUrl()"
                                    @fixture:add="addLocation">
                    </fixture-select>
                    <beacon-select :url="getFloorUrl()"
                                   @beacon:add="addLocation">
                    </beacon-select>
                </template>
            </toolbar>
        </template>

        <template slot="content">
            <div class="loading" v-if="!item">
                <i class="fa fa-cog fa-spin loading-spinner"></i>
            </div>
            <div v-else>
                <location-toolbar :current-location="currentLocation"
                                  :url="getFloorUrl()">
                </location-toolbar>
                <floor-map :url="getFloorUrl()"
                           :lat="item.place.lat"
                           :lng="item.place.lng"
                           :current-location="currentLocation"
                           :current-location-copy="currentLocationCopy"
                           :structures="item.structures"
                           :locations="item.locations"
                           @location:set="setCurrentLocation"
                           @location-copy:set="setCurrentLocationCopy">
                </floor-map>
            </div>
        </template>
    </layout>
</template>

<script>
    import floorMap from './floor-map';
    import locationToolbar from './location-toolbar';
    import Hub from '../../../events/hub';
    import resource from 'js/mixins/resource';
    import poiSelect from './poi-select';
    import fixtureSelect from './fixture-select';
    import beaconSelect from './beacon-select';

    export default {
        mixins: [resource],
        components: {
            floorMap,
            poiSelect,
            fixtureSelect,
            beaconSelect,
            locationToolbar
        },
        data() {
            return {
                item: null,
                placeId: null,
                buildingId: null,
                floorId: null,
                currentLocation: null,
                currentLocationCopy: null
            }
        },
        methods: {
            setCurrentLocation(location, callback = null) {
                this.currentLocation = location;

                if (callback && typeof callback == 'function') {
                    this.$nextTick(() => callback(location))
                }
            },
            setCurrentLocationCopy(location, callback = null) {
                this.currentLocationCopy = location;

                if (callback && typeof callback == 'function') {
                    this.$nextTick(() => callback(location))
                }
            },
            addLocation(location) {
                Hub.$emit('location:add', location);
            },
            getFloorUrl() {
                return '/places/' + this.placeId + '/buildings/' + this.buildingId + '/floors/' + this.floorId;
            },
            getReadUrl() {
                ({placeId: this.placeId, buildingId: this.buildingId, id: this.floorId} = this.$route.params);
                return this.getFloorUrl();
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>
