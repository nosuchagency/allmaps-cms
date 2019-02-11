let markerEvents = {
    data() {
        return {
            polylineLatlng: null
        }
    },

    methods: {
        addMarker(latlng, options = {}) {
            return new L.Marker(latlng, Object.assign({ draggable: true }, options))
                .addTo(this.editingMarkerLayerGroup)
                .on('dragstart', this.dragStartHandler)
                .on('drag', this.dragHandler)
                .on('dragend', this.dragEndHandler)
                .on('click', this.clickHandler);
        },
        clickHandler(e) {
            if (!this.currentComponent) return;

            this.drawPolyline(e.target.getLatLng());
            this.addMarker(e.target.getLatLng());
        },
        dragStartHandler(e) {
            if (!this.currentComponent) return;

            this.map.off('click', this.mapClickHandler);

            let latlngs = null;

            switch (this.getCurrentType()) {
                case 'polyline':
                    if (this.isCurved()) {
                        latlngs = this.currentComponent.feature.properties.markers;
                    } else {
                        latlngs = this.currentComponent.getLatLngs();
                    }
                    break;
                case 'polygon':
                    if (this.isCurved()) {
                        latlngs = this.currentComponent.feature.properties.markers;
                    } else {
                        latlngs = this.currentComponent.getLatLngs()[0];
                    }
                    break;
                case 'rectangle':
                    return;
                case 'circle':
                    latlngs = [this.currentComponent.getLatLng()];
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
            if (!this.currentComponent) return;

            let latlngs = null;

            switch (this.getCurrentType()) {
                case 'polyline':

                    if (this.isCurved()) {
                        latlngs = this.currentComponent.feature.properties.markers;
                    } else {
                        latlngs = this.currentComponent.getLatLngs();
                    }
                    break;
                case 'polygon':
                    if (this.isCurved()) {
                        latlngs = this.currentComponent.feature.properties.markers;
                    } else {
                        latlngs = this.currentComponent.getLatLngs()[0];
                    }
                    break;
                case 'rectangle':
                    return;
                case 'circle':
                    latlngs = [this.currentComponent.getLatLng()];
                    break;
            }

            let latlng = e.target.getLatLng();

            if (['polyline', 'polygon'].includes(this.getCurrentType())) {
                latlng = this.isCurved() ? [latlng.lat, latlng.lng] : latlng;
                latlngs.splice(this.polylineLatlng, 1, latlng);
                this.currentComponent.setLatLngs(latlngs);
                if (this.isCurved()) {
                    let polyline;
                    if (this.getCurrentType() === 'polygon') {
                        polyline = this.bezierSpline([].concat.apply([], this.currentComponent.toGeoJSON().geometry.coordinates));
                    } else {
                        polyline = this.bezierSpline(this.currentComponent.toGeoJSON().geometry.coordinates);
                    }
                    this.currentComponent.setLatLngs(polyline);
                } else {
                    this.currentComponent.setLatLngs(latlngs);
                }
            } else {
                this.currentComponent.setLatLng(latlng);
            }
        },
        dragEndHandler(e) {
            if (!this.currentComponent) return;

            let self = this;

            setTimeout(function () {
                self.map.on('click', self.mapClickHandler);
            }, 100);

            this.polylineLatlng = null;
        },
    }
}

module.exports = markerEvents;