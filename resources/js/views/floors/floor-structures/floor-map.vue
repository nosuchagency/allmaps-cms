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

    // Components
    import polyline from 'js/mixins/structures/Polyline';
    import polygon from 'js/mixins/structures/Polygon';
    import circle from 'js/mixins/structures/Circle';
    import rectangle from 'js/mixins/structures/Rectangle';
    import image from 'js/mixins/structures/Image';

    export default {
        mixins: [
            mapSetup,

            stateMethods,

            eventHandlers,

            polyline,
            polygon,
            circle,
            rectangle,
            image
        ],
        props: {
            url: String,
            lat: Number,
            lng: Number,
            structures: Array,
            currentStructure: Object,
            currentStructureCopy: Object
        },
        data() {
            return {
                popup: null,
                popupText: '',

                ruler: null,

                mainLayer: null,

                structuresLayer: null,

                imageOverlayLayer: null,

                editingLayer: null,
                editingMarkerLayer: null
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

            this.structuresLayer = L.layerGroup([]).addTo(this.mainLayer);

            this.imageOverlayLayer = L.layerGroup([]).addTo(this.mainLayer);

            this.editingMarkerLayer = L.layerGroup([]).addTo(this.mainLayer);
            this.editingLayer = L.layerGroup([]).addTo(this.mainLayer);

            this.structures.forEach((structure) => this.addStructure(structure, false));

            this.activateEventListeners();
        },
        methods: {
            activateEventListeners() {
                Hub.$on('structure:created', (structure) => this.addStructure(structure, true));
                Hub.$on('structure:undo', this.undoStructure);
                Hub.$on('structure:removed', this.removeStructure);
                Hub.$on('structure:cancelled', this.cancelStructure);
                Hub.$on('structure:saved', this.saveStructure);
            }
        },
        computed: {
            cursor() {
                return {
                    cursor: this.currentStructure ? 'crosshair' : null
                };
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
        cursor: crosshair;
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
