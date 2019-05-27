import shared from './Shared';

let Beacon = {
    mounted() {
        let self = this;

        L.Beacon = L.Marker.extend({
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
                        iconUrl: this.location.beacon.image,
                        iconSize: [30, 30]
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

export default Beacon;