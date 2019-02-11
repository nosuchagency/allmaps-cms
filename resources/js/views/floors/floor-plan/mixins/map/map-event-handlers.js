let mapEventHandlersMixin = {
    methods: {
        mapMouseOutEventHandler(e) {
            this.drawHelperPolyline.setLatLngs([]);
            this.popup.removeFrom(this.map);
        },
        mapMouseMoveEventHandler(e) {
            if (!this.currentComponent) return;

            let coords, destination = null;

            switch (this.getCurrentType()) {
                case 'polyline':
                    coords = this.currentComponent.getLatLngs();
                    if (coords.length > 0) destination = coords[coords.length - 1];
                    break;
                case 'polygon':
                    coords = this.currentComponent.getLatLngs()[0];
                    if (coords.length > 0) destination = coords[coords.length - 1];
                    break;
                case 'rectangle':
                    return
                case 'circle':
                    destination = this.currentComponent.getLatLng();
            }

            if (!destination) return;

            this.drawHelperPolyline.setLatLngs([destination, e.latlng]);
            this.popup.setContent(Math.round(e.latlng.distanceTo(destination) * 100) / 100 + ' meters');
            this.popup.setLatLng(e.latlng).openOn(this.map);
        }
    }
}

module.exports = mapEventHandlersMixin;