<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-map-marked-alt title-icon"></i>
                        <template v-if="item">
                            <router-link :to="'/places/' + placeId">
                                {{ item.place.name }}
                            </router-link>
                            <i class="fa fa-caret-right" style="margin: 0 10px;"></i>
                            <i class="fa fa-grip-lines title-icon"></i>
                            <label>{{item.name}}</label>
                        </template>
                    </div>
                </template>
                <template slot="right">
                    <template v-for="location in locationVariants">
                        <location-select :title="location.title"
                                         :url="location.url"
                                         :identifier="location.identifier"
                                         :floor-url="getFloorUrl()"
                                         @location:add="locationCreated">
                        </location-select>
                    </template>
                </template>
            </toolbar>
        </template>

        <template slot="content">
            <div class="loading" v-if="!item">
                <i class="fa fa-cog fa-spin loading-spinner"></i>
            </div>
            <div v-else>
                <location-toolbar :location="currentLocation"
                                  @location:saved="locationSaved"
                                  @location:cancelled="locationCancelled"
                                  @location:removed="locationRemoved"
                                  :url="getFloorUrl()">
                </location-toolbar>
                <floor-map :lat="item.place.lat"
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
    import locationSelect from './location-select';

    export default {
        components: {
            floorMap,
            locationSelect,
            locationToolbar
        },
        data() {
            return {
                item: null,
                placeId: null,
                buildingId: null,
                floorId: null,
                currentLocation: null,
                currentLocationCopy: null,
                locationVariants: [
                    {title: 'Beacon', url: '/beacons?inuse=false', identifier: 'beacon_id'},
                    {title: 'Poi Point', url: '/pois', identifier: 'poi_id'},
                    {title: 'Poi Area', url: '/pois', identifier: 'poi_id'},
                    {title: 'Fixture', url: '/fixtures', identifier: 'fixture_id'}
                ]
            }
        },
        created() {
            this.fetch();
        },
        methods: {
            async fetch() {
                try {
                    const {data} = await this.$axios.get(this.getReadUrl());
                    this.item = data;
                } catch (error) {
                    console.log(error);
                }
            },
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
            locationCreated(location) {
                Hub.$emit('location:created', location);
            },
            locationSaved() {
                Hub.$emit('location:saved');
            },
            locationCancelled() {
                Hub.$emit('location:cancelled');
            },
            locationRemoved() {
                Hub.$emit('location:removed');
            },
            getFloorUrl() {
                return `/places/${this.placeId}/buildings/${this.buildingId}/floors/${this.floorId}`;
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
