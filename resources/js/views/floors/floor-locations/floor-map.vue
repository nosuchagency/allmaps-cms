<template>
    <div id="map" :style="cursor"></div>
</template>

<script>
    // Event Hub
    import Hub from '../../../events/hub';

    // Map
    import mapSetup from './mixins/map/map-setup';

    // Map state methods
    import stateMethods from './mixins/map/state-handlers';

    // Structures
    import polyline from 'js/mixins/structures/Polyline';
    import polygon from 'js/mixins/structures/Polygon';
    import circle from 'js/mixins/structures/Circle';
    import rectangle from 'js/mixins/structures/Rectangle';
    import image from 'js/mixins/structures/Image';

    // Locations
    import poiPoint from 'js/mixins/locations/PoiPoint';
    import poiArea from 'js/mixins/locations/PoiArea';
    import findable from 'js/mixins/locations/Findable';
    import beacon from 'js/mixins/locations/Beacon';

    export default {
        mixins: [
            mapSetup,

            stateMethods,

            polyline,
            polygon,
            circle,
            rectangle,
            image,

            poiPoint,
            poiArea,
            findable,
            beacon
        ],
        props: {
            url: String,
            lat: Number,
            lng: Number,
            currentLocation: Object,
            currentLocationCopy: Object,
            showStructures: Boolean,
            structures: Array,
            locations: Array
        },
        data() {
            return {
                popup: null,

                drawHelperPolyline: null,

                locationsLayer: null,
                markerLayer: null,

                editingLayerGroup: null,
                editingMarkerLayerGroup: null,
            };
        },
        mounted() {
            this.setupMap();

            this.popup = L.popup();

            this.drawHelperPolyline = new L.Polyline([], {
                weight: 2,
                dashArray: [3, 10]
            }).addTo(this.map);

            this.mainLayerGroup = L.layerGroup([]).addTo(this.map);

            this.structuresLayer = L.layerGroup([]).addTo(this.mainLayerGroup);
            this.locationsLayer = L.layerGroup([]).addTo(this.mainLayerGroup);
            this.markerLayer = L.layerGroup([]).addTo(this.mainLayerGroup);

            this.editingMarkerLayerGroup = L.layerGroup([]).addTo(this.mainLayerGroup);
            this.editingLayerGroup = L.layerGroup([]).addTo(this.mainLayerGroup);

            this.structures.forEach(this.addStructure);
            this.locations.forEach((location) => this.addLocation(location, false));

            Hub.$on('location:add', (location) => this.addLocation(location, true));
            Hub.$on('location:undo', this.undoLocation);
            Hub.$on('location:remove', this.removeLocation);
            Hub.$on('location:cancel', this.cancelLocation);
            Hub.$on('location:save', this.saveLocation);

            Hub.$on('repositionMap', this.repositionMap);
        },
        watch: {
            showStructures(value) {
                if (value) {
                    this.structuresLayer.addTo(this.mainLayerGroup);
                } else {
                    this.structuresLayer.removeFrom(this.mainLayerGroup);
                }
            }
        },
        methods: {
            repositionMap() {
                this.map.flyTo(new L.LatLng(this.lat, this.lng), 19);
            }
        },
        computed: {
            cursor() {
                return {
                    cursor: this.currentLocation && this.currentLocation.isArea() ? 'crosshair' : null
                };
            }
        },
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
