import shared from './Shared';

let PoiPoint = {
    mounted() {
        let self = this;

        L.PoiPoint = L.Marker.extend({
            ...shared, ...{
                initialize(location) {
                    this.location = location;
                    this.unsavedChanges = false;

                    let coordinates = location.coordinates || self.map.getCenter();

                    L.Marker.prototype.initialize.call(this, coordinates, {
                        icon: this.getIcon()
                    });

                    this.activateEventListeners();
                },
                activateEventListeners() {
                    this.on('click', this.componentClicked);
                },
                startEditing() {
                    this.dragging.enable();
                    this.on('dragend', this.dragEndHandler)
                },
                stopEditing() {
                    this.off('dragend', this.dragEndHandler)
                },
                dragEndHandler() {
                    this.unsavedChanges = true;
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
                getIcon() {
                    return new L.Icon({
                        iconUrl: this.location.poi.image,
                        iconSize: [20, 20]
                    });
                },
                save() {
                    this.dragging.disable();
                },
                getCoordinates() {
                    return this.getLatLng();
                }
            }
        });
    }
};

export default PoiPoint;