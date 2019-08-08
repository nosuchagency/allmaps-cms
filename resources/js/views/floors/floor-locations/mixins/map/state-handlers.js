import cloneDeep from 'lodash/cloneDeep';

let creationMethodsMixin = {
    data() {
        return {
            polylineLatlng: null
        }
    },
    methods: {
        startEditing(location) {
            this.$emit('location-copy:set', location);

            let component = this.initializeLocation(cloneDeep(location.getLocation())).addTo(this.editingLayer);
            component.startEditing();

            if (location.getType() === 'fixture') {
                setTimeout(() => location.overlay.removeFrom(this.locationImageOverlayLayer), 50);
            }

            location.removeFrom(this.locationsLayer);
            this.$emit('location:set', component, (location) => location.addMarkers());
        },
        stopEditing() {
            this.currentLocation.stopEditing();
            this.$emit('location:set', null);
            this.$emit('location-copy:set', null);
            this.popup.removeFrom(this.map);
            this.ruler.setLatLngs([]);
            this.editingMarkerLayer.clearLayers();
            this.editingLayer.clearLayers();
        },
        saveLocation() {
            this.currentLocation.removeFrom(this.editingLayer);
            this.currentLocation.addTo(this.locationsLayer);
            this.currentLocation.save();
            this.stopEditing();
        },
        cancelLocation() {
            this.currentLocation.removeFrom(this.editingLayer);
            this.currentLocation.cancel();
            this.currentLocationCopy.addTo(this.locationsLayer);
            if (this.currentLocationCopy.getType() === 'fixture') {
                this.currentLocationCopy.overlay.addTo(this.locationImageOverlayLayer);
            }
            this.stopEditing();
        },
        removeLocation() {
            this.currentLocation.removeFrom(this.editingLayer);
            this.currentLocation.remove();
            this.stopEditing();
        },
        undoLocation() {
            this.currentLocation.undo();
        }
    }
};

export default creationMethodsMixin;
