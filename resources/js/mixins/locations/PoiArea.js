import shared from './Shared';

let PoiArea = {
    mounted() {
        let self = this;

        L.PoiArea = L.Polygon.extend({
            ...shared, ...{
                initialize(location) {
                    this.location = location;
                    this.unsavedChanges = false;

                    L.Polygon.prototype.initialize.call(this, this.location.coordinates || [], location.poi);

                    this.activateEventListeners();
                    console.log('Unsaved changes', this.hasUnsavedChanges());
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

                    console.log('Unsaved changes', this.hasUnsavedChanges());
                },
                getCoordinates() {
                    return this.getLatLngs();
                },
                getDestination() {
                    let coords = this.getLatLngs()[0];

                    if (coords.length > 0) {
                        return coords[coords.length - 1];
                    }

                    return null;
                },
                addMarkers() {
                    this.getLatLngs()[0].forEach(self.addMarker);
                },
                isArea() {
                    return true;
                }
            }
        });
    }
};

export default PoiArea;