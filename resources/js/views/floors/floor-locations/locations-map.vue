<template>
    <div id="map"
         :style="{cursor : cursor}"></div>
</template>

<script>
    // Event Hub
    import Hub from '../../../events/hub';

    // Vuex Getters
    import {mapGetters} from 'vuex';

    // Map Mixins
    import mapSetup from './mixins/map/map-setup';

    import locationCreationMethods from './mixins/location/location-creation-methods';

    export default {
        mixins: [mapSetup, locationCreationMethods],
        props: {
            place: Object,
            building: Object,
            floor: Object
        },
        data() {
            return {
                floorPlanLayer: null,
                locationsLayer: null,
                markerLayer: null,

                popup: null,
                drawHelperPolyline: null
            };
        },
        computed: {
            ...mapGetters('location', ['planActive', 'currentLocation']),
            cursor() {
                if (!this.currentLocation) {
                    return;
                }

                let location = this.currentLocation.location;

                if (location.location_type !== 'poi' || !location.poi) {
                    return;
                }

                return location.poi.type === 'area' ? 'crosshair' : null;
            }
        },
        mounted() {
            this.setupMap();

            this.popup = L.popup();

            this.drawHelperPolyline = new L.Polyline([], {
                weight: 2,
                dashArray: [3, 10]
            }).addTo(this.map);

            this.floorPlanLayer = L.layerGroup([]).addTo(this.map);
            this.locationsLayer = L.layerGroup([]).addTo(this.map);
            this.markerLayer = L.layerGroup([]).addTo(this.map);

            this.drawComponents();
            this.drawLocations();

            Hub.$on('repositionMap', this.repositionMap);

            Hub.$on('addLocationToFloor', this.addLocationToFloor);
            Hub.$on('removeLocationFromFloor', this.removeLocationFromFloor);
            Hub.$on('closeLocation', this.closeLocation);
            Hub.$on('cancelLocationEditing', this.cancelLocationEditing);
            Hub.$on('saveLocationEditing', this.saveLocationEditing);
        },
        watch: {
            planActive(newValue, oldValue) {
                if (newValue) {
                    this.floorPlanLayer.addTo(this.map);
                } else {
                    this.floorPlanLayer.removeFrom(this.map);
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    #map {
        position: absolute;
        top: 56px;
        width: 100%;
        height: calc(100vh - 56px);
    }
</style>

<style lang="scss">
    .leaflet-interactive {
        cursor: grab !important;
    }

    .leaflet-marker-icon {
        cursor: pointer !important;
    }

    .leaflet-fade-anim .leaflet-popup {
        transition: none;
    }

    .leaflet-popup {
        bottom: 10px !important;
    }

    .leaflet-popup-close-button {
        display: none;
    }
</style>
