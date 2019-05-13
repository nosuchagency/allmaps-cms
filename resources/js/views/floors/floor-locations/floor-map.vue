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

    // Marker event handlers
    import eventHandlers from './mixins/marker/event-handlers';

    // Structures
    import polyline from 'js/mixins/structures/Polyline';
    import polygon from 'js/mixins/structures/Polygon';
    import circle from 'js/mixins/structures/Circle';
    import rectangle from 'js/mixins/structures/Rectangle';
    import image from 'js/mixins/structures/Image';

    // Locations
    import poiPoint from 'js/mixins/locations/PoiPoint';
    import poiArea from 'js/mixins/locations/PoiArea';
    import fixture from 'js/mixins/locations/Fixture';
    import beacon from 'js/mixins/locations/Beacon';

    export default {
        mixins: [
            mapSetup,

            stateMethods,

            eventHandlers,

            polyline,
            polygon,
            circle,
            rectangle,
            image,

            poiPoint,
            poiArea,
            fixture,
            beacon
        ],
        props: {
            url: String,
            latitude: Number,
            longitude: Number,
            currentLocation: Object,
            currentLocationCopy: Object,
            structures: Array,
            locations: Array
        },
        data() {
            return {
                popup: null,
                popupText: '',

                ruler: null,

                mainLayer: null,

                structuresLayer: null,

                locationsLayer: null,

                imageOverlayLayer: null,
                locationImageOverlayLayer: null,

                editingLayer: null,
                markerLayer: null,
                editingMarkerLayer: null,
            };
        },
        mounted() {
            this.setupMap();

            this.popup = L.popup();

            this.ruler = new L.Polyline([], {
                weight: 2,
                dashArray: [3, 10]
            }).addTo(this.map);

            this.mainLayer = L.layerGroup([]).addTo(this.map);

            this.structuresLayer = L.layerGroup([]);

            this.locationsLayer = L.layerGroup([]).addTo(this.mainLayer);

            this.imageOverlayLayer = L.layerGroup([]).addTo(this.structuresLayer);
            this.locationImageOverlayLayer = L.layerGroup([]).addTo(this.locationsLayer);

            this.editingLayer = L.layerGroup([]).addTo(this.mainLayer);
            this.markerLayer = L.layerGroup([]).addTo(this.mainLayer);
            this.editingMarkerLayer = L.layerGroup([]).addTo(this.mainLayer);

            this.structures.forEach(this.addStructure);
            this.locations.forEach((location) => this.addLocation(location, false));

            this.structuresLayer.addTo(this.mainLayer);

            this.activateEventListeners();
        },
        methods: {
            activateEventListeners() {
                Hub.$on('location:created', (location) => this.addLocation(location, true));
                Hub.$on('location:undo', this.undoLocation);
                Hub.$on('location:removed', this.removeLocation);
                Hub.$on('location:cancelled', this.cancelLocation);
                Hub.$on('location:saved', this.saveLocation);
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
