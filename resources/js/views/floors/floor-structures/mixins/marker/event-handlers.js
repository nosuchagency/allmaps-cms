let markerEvents = {
    data() {
        return {
            polylineLatlng: null
        }
    },
    methods: {
        addMarker(latlng, options = {}) {
            return new L.Marker(latlng, {...{draggable: true}, ...options})
                .addTo(this.editingMarkerLayer)
                .on('dragstart', this.dragStartHandler)
                .on('drag', this.dragHandler)
                .on('dragend', this.dragEndHandler)
                .on('click', this.clickHandler);
        },
        clickHandler(e) {
            if (this.currentStructure) {
                this.currentStructure.click(e.target.getLatLng());
            }
        },
        dragStartHandler(e) {
            if (!this.currentStructure) {
                return;
            }

            this.map.off('click', this.mapClickHandler);

            let latlngs = null;

            switch (this.currentStructure.getShape()) {
                case 'polyline':
                case 'polygon':
                    latlngs = this.currentStructure.getMarkers();
                    break;
                case 'circle':
                    latlngs = [this.currentStructure.getLatLng()];
                    break;
                default :
                    return
            }

            let latlng = e.target.getLatLng();

            for (let i = 0; i < latlngs.length; i++) {
                if (latlng.equals(latlngs[i])) {
                    this.polylineLatlng = i;
                }
            }
        },
        dragHandler(e) {
            if (!this.currentStructure) {
                return;
            }

            let latlngs = null;

            switch (this.currentStructure.getShape()) {
                case 'polyline':
                case 'polygon':
                    latlngs = this.currentStructure.getMarkers();
                    break;
                case 'circle':
                    latlngs = [this.currentStructure.getLatLng()];
                    break;
                default :
                    return
            }

            let latlng = e.target.getLatLng();

            if (['polyline', 'polygon'].includes(this.currentStructure.getShape())) {
                latlngs.splice(this.polylineLatlng, 1, latlng);
                this.currentStructure.setLatLngs(latlngs);
                if (this.currentStructure.getCurved()) {
                    this.currentStructure.setLatLngs(this.bezierSpline(this.currentStructure.getMarkers()));
                } else {
                    this.currentStructure.setLatLngs(latlngs);
                }
            } else {
                this.currentStructure.setLatLng(latlng);
            }
        },
        dragEndHandler(e) {
            if (!this.currentStructure) {
                return;
            }

            setTimeout(() => this.map.on('click', this.mapClickHandler), 100);

            this.polylineLatlng = null;
        },
        bezierSpline(coordinates) {
            let line = turf.lineString(coordinates.map(x => [x.lat, x.lng]));
            let curved = turf.bezierSpline(line);

            return curved.geometry.coordinates;
        },
    }
};

module.exports = markerEvents;