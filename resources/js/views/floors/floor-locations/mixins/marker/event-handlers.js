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
                .on('click', this.markerClickHandler)
                .on('mouseover', this.markerMouseOver)
                .on('mouseout', this.markerMouseOut);
        },
        markerMouseOver(e) {
            this.popupText = '<br>Click to connect!';
        },
        markerMouseOut(e) {
            this.popupText = '';
        },
        markerClickHandler(e) {
            if (this.currentLocation) {
                this.currentLocation.click(e.target.getLatLng());
            }
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
        }
    }
};

module.exports = markerEvents;