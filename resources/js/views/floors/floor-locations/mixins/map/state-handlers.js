let creationMethodsMixin = {
    data() {
        return {
            polylineLatlng: null
        }
    },
    methods: {
        startEditing(location) {
            this.$emit('location-copy:set', location);

            let component = this.initializeLocation(_.cloneDeep(location.getLocation())).addTo(this.editingLayer);
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
        },
        mapMouseOutEventHandler(e) {
            this.ruler.setLatLngs([]);
            this.popup.removeFrom(this.map);
        },
        mapMouseMoveEventHandler(e) {
            let destination = null;

            let coords = this.currentLocation.getLatLngs()[0];

            if (coords.length > 0) {
                destination = coords[coords.length - 1];
            }

            if (!destination) {
                return;
            }

            this.ruler.setLatLngs([destination, e.latlng]);
            this.popup.setContent(Math.round(e.latlng.distanceTo(destination) * 100) / 100 + ' meters');
            this.popup.setLatLng(e.latlng).openOn(this.map);
        },
        dragStartHandler(e) {
            this.map.off('click', this.mapClickHandler);

            let latlngs = this.currentLocation.getLatLngs()[0];

            let latlng = e.target.getLatLng();
            for (let i = 0; i < latlngs.length; i++) {
                if (latlng.equals(latlngs[i])) {
                    this.polylineLatlng = i;
                }
            }
        },
        dragHandler(e) {
            let latlngs = this.currentLocation.getLatLngs()[0];
            let latlng = e.target.getLatLng();
            latlngs.splice(this.polylineLatlng, 1, latlng);
            this.currentLocation.setLatLngs(latlngs);
        },
        dragEndHandler(e) {
            setTimeout(() => {
                this.map.on('click', this.mapClickHandler);
            }, 100);

            this.polylineLatlng = null;
        },
        addMarker(latlng, options = {}) {
            return new L.Marker(latlng, {...{draggable: true}, ...options})
                .addTo(this.editingMarkerLayer)
                .on('dragstart', this.dragStartHandler)
                .on('drag', this.dragHandler)
                .on('dragend', this.dragEndHandler)
                .on('click', this.clickHandler);
        }
    }
};

export default creationMethodsMixin;