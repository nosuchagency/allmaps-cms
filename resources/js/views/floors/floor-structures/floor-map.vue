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

                drawHelperPolyline: null,

                mainLayerGroup: null,
                structuresLayerGroup: null,

                imageOverlayLayer: null,

                editingLayerGroup: null,
                editingMarkerLayerGroup: null
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

            this.structuresLayerGroup = L.layerGroup([]).addTo(this.mainLayerGroup);

            this.imageOverlayLayer = L.layerGroup([]).addTo(this.mainLayerGroup);

            this.editingMarkerLayerGroup = L.layerGroup([]).addTo(this.mainLayerGroup);
            this.editingLayerGroup = L.layerGroup([]).addTo(this.mainLayerGroup);

            this.structures.forEach((structure) => this.addStructure(structure, false));

            Hub.$on('structure:add', (structure) => this.addStructure(structure, true));
            Hub.$on('structure:undo', this.undoStructure);
            Hub.$on('structure:remove', this.removeStructure);
            Hub.$on('structure:cancel', this.cancelStructure);
            Hub.$on('structure:save', this.saveStructure);

            Hub.$on('map:reposition', this.repositionMap);
        },
        methods: {
            repositionMap() {
                this.map.flyTo(new L.LatLng(this.lat, this.lng), 19);
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
