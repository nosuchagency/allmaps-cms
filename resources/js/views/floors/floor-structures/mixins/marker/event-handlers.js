let markerEvents = {
    data() {
        return {
            polylineLatlng: null
        }
    },

    methods: {
        addMarker(latlng, options = {}) {
            return new L.Marker(latlng, {...{draggable: true}, ...options})
                .addTo(this.editingMarkerLayerGroup)
                .on('dragstart', this.dragStartHandler)
                .on('drag', this.dragHandler)
                .on('dragend', this.dragEndHandler)
                .on('click', this.clickHandler);
        },
        clickHandler(e) {
            if (!this.currentStructure) {
                return;
            }

            this.currentStructure.click(e.target.getLatLng());
            this.addMarker(e.target.getLatLng());
        },
        dragStartHandler(e) {
            if (!this.currentStructure) {
                return;
            }

            this.map.off('click', this.mapClickHandler);

            let latlngs = null;

            switch (this.currentStructure.getShape()) {
                case 'polyline':
                    if (this.currentStructure.getCurved()) {
                        latlngs = this.currentStructure.feature.properties.markers;
                    } else {
                        latlngs = this.currentStructure.getLatLngs();
                    }
                    break;
                case 'polygon':
                    if (this.currentStructure.getCurved()) {
                        latlngs = this.currentStructure.feature.properties.markers;
                    } else {
                        latlngs = this.currentStructure.getLatLngs()[0];
                    }
                    break;
                case 'rectangle':
                    return;
                case 'circle':
                    latlngs = [this.currentStructure.getLatLng()];
                    break;
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

                    if (this.currentStructure.getCurved()) {
                        latlngs = this.currentStructure.feature.properties.markers;
                    } else {
                        latlngs = this.currentStructure.getLatLngs();
                    }
                    break;
                case 'polygon':
                    if (this.currentStructure.getCurved()) {
                        latlngs = this.currentStructure.feature.properties.markers;
                    } else {
                        latlngs = this.currentStructure.getLatLngs()[0];
                    }
                    break;
                case 'rectangle':
                    return;
                case 'circle':
                    latlngs = [this.currentStructure.getLatLng()];
                    break;
            }

            let latlng = e.target.getLatLng();

            if (['polyline', 'polygon'].includes(this.currentStructure.getShape())) {
                latlng = this.currentStructure.getCurved() ? [latlng.lat, latlng.lng] : latlng;
                latlngs.splice(this.polylineLatlng, 1, latlng);
                this.currentStructure.setLatLngs(latlngs);
                if (this.currentStructure.getCurved()) {
                    let polyline;
                    if (this.currentStructure.getShape() === 'polygon') {
                        polyline = this.bezierSpline([].concat.apply([], this.currentStructure.toGeoJSON().geometry.coordinates));
                    } else {
                        polyline = this.bezierSpline(this.currentStructure.toGeoJSON().geometry.coordinates);
                    }
                    this.currentStructure.setLatLngs(polyline);
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

            setTimeout(() => {
                this.map.on('click', this.mapClickHandler);
            }, 100);

            this.polylineLatlng = null;
        },
        bezierSpline(coordinates) {
            let line = turf.lineString(coordinates);
            let curved = turf.bezierSpline(line);

            return curved.geometry.coordinates;
        },
    }
};

module.exports = markerEvents;