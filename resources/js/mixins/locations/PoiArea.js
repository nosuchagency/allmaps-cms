import shared from './Shared';

let PoiArea = {
    mounted() {
        let self = this;

        L.PoiArea = L.Polygon.extend({
            ...shared, ...{
                initialize(location) {
                    this.location = location;
                    this.unsavedChanges = false;

                    L.Polygon.prototype.initialize.call(this, this.location.coordinates || [], this.getAttributes());

                    this.activateEventListeners();
                },
                activateEventListeners() {
                    this.on('click', this.componentClicked);
                },
                componentClicked(e) {
                    if (!self.currentLocation || !self.currentLocation.hasUnsavedChanges()) {

                        if (self.currentLocation) {
                            self.cancelLocation();
                        }

                        L.DomEvent.stopPropagation(e);
                        self.startEditing(e.target);
                    }
                },
                click(latlng) {
                    self.addMarker(latlng);
                    this.addLatLng(latlng);
                    this.unsavedChanges = true;
                },
                getCoordinates() {
                    return this.getLatLngs()[0];
                },
                getDestination() {
                    let coords = this.getCoordinates();

                    if (coords.length > 0) {
                        return coords[coords.length - 1];
                    }

                    return null;
                },
                addMarkers() {
                    this.getCoordinates().forEach(self.addMarker);
                },
                isArea() {
                    return true;
                }
            }
        });
    }
};

export default PoiArea;