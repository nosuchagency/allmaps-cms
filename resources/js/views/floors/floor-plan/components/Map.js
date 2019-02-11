export class Map {
    constructor(place, building, floor) {
        this.place = place;
        this.building = building;
        this.floor = floor;

        // Map instance
        this.map = null;

        // Current component being edited
        this.currentComponent = null;
        this.currentComponentCopy = null;

        // Layers
        this.mainLayerGroup = null;
        this.exportLayerGroup = null;
        this.imageOverlayLayer = null;
        this.editingLayerGroup = null;
        this.editingMarkerLayerGroup = null;

        // Helpers
        this.popup = null;
        this.drawHelperPolyline = null;
    }

    setup() {
        this.map = new L.Map('map', {
            center: new L.LatLng(this.floor.place.lat, this.floor.place.lng),
            zoom: 19
        });

        L.gridLayer
            .googleMutant({
                type: 'roadmap',
                styles: [
                    {
                        elementType: 'labels',
                        stylers: [{visibility: 'off'}]
                    }
                ]
            })
            .addTo(this.map);

        this.map.zoomControl.setPosition('bottomleft');

        this.map.on('click', this.mapClickHandler);

        this.map.addEventListener('mouseout', this.mapMouseOutEventHandler);
        this.map.addEventListener('mousemove', this.mapMouseMoveEventHandler);
        L.control.scale().addTo(this.map);
    }

    async save() {
        try {
            await this.$axios.put('/places/' + this.place.id + '/buildings/' + this.building.id + '/floors/' + this.floor.id + '/plan', {
                map: this.exportLayerGroup.toGeoJSON()
            });
            this.$notify({
                title: 'Success',
                message: 'The floor has been updated',
                type: 'success',
                position: 'bottom-right'
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