<template>
    <div id="map" :style="cursor"></div>
</template>

<script>
    // Event Hub
    import Hub from '../../../events/hub';

    // Vuex Getters
    import {mapGetters} from 'vuex';

    // Map Mixins
    import mapSetup from './mixins/map/map-setup';
    import mapEventHandlers from './mixins/map/map-event-handlers';

    // Map Component Mixins
    import componentCreationMethods from './mixins/component/component-creation-methods';
    import componentDrawingMethods from './mixins/component/component-drawing-methods';
    import componentEventHandlers from './mixins/component/component-event-handlers';
    import componentStateMethods from './mixins/component/component-state-methods';
    import componentUtilityMethods from './mixins/component/component-utility-methods';

    // Marker Mixins
    import markerEventHandlers from './mixins/marker/marker-event-handlers';

    export default {
        mixins: [
            mapSetup,
            mapEventHandlers,

            componentCreationMethods,
            componentDrawingMethods,
            componentEventHandlers,
            componentStateMethods,
            componentUtilityMethods,

            markerEventHandlers
        ],
        props: {
            place: Object,
            building: Object,
            floor: Object
        },
        data() {
            return {
                popup: null,

                drawHelperPolyline: null,

                mainLayerGroup: null,
                exportLayerGroup: null,

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

            this.exportLayerGroup = L.layerGroup([]).addTo(this.mainLayerGroup);

            this.imageOverlayLayer = L.layerGroup([]).addTo(this.mainLayerGroup);

            this.editingMarkerLayerGroup = L.layerGroup([]).addTo(this.mainLayerGroup);
            this.editingLayerGroup = L.layerGroup([]).addTo(this.mainLayerGroup);

            this.drawComponents();

            Hub.$on('createComponent', this.addNewComponent);
            Hub.$on('undoComponent', this.undoComponent);
            Hub.$on('removeComponent', this.removeComponent);
            Hub.$on('cancelComponent', this.cancelComponent);
            Hub.$on('saveComponent', this.saveComponent);

            Hub.$on('repositionMap', this.repositionMap);
        },
        computed: {
            ...mapGetters('plan', ['currentComponent', 'currentComponentCopy']),
            cursor() {
                return {cursor: this.currentComponent ? 'crosshair' : null};
            }
        },
        methods: {
            async saveFloor() {
                console.log('hey');
                try {
                    await this.$axios.put('/places/' + this.place.id + '/buildings/' + this.building.id + '/floors/' + this.floor.id + '/plan', {
                        map: this.exportLayerGroup.toGeoJSON()
                    });
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        message: 'An error occurred',
                        type: 'error',
                        position: 'bottom-right'
                    });
                } finally {
                    this.$store.commit('plan/setSavingFloor', false);
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
