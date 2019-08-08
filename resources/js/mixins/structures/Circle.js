import shared from './Shared';

let Circle = {
    mounted() {
        let self = this;

        L.CircleComponent = L.Circle.extend({
            ...shared, ...{
                initialize(structure, readonly = false) {
                    this.structure = structure;
                    this.readonly = readonly;

                    let coordinates = this.structure.coordinates || self.map.getCenter();

                    L.Circle.prototype.initialize.call(this, coordinates, this.getAttributes());

                    this.setRadius(this.structure.radius || 5);

                    this.activateEventListeners();
                },
                activateEventListeners() {
                    this.on('click', this.componentClicked);
                },
                componentClicked(e) {
                    if (!self.currentStructure && !this.readonly) {
                        L.DomEvent.stopPropagation(e);
                        self.startEditing(e.target);
                    }
                },
                click(latlng) {
                    let destination = this.getLatLng();

                    let radius = Math.round(latlng.distanceTo(destination) * 100) / 100;

                    this.setRadius(radius);
                    this.setStyle({radius});
                },
                getCoordinates() {
                    return this.getLatLng();
                },
                getDestination() {
                    return this.getLatLng();
                },
                addMarkers() {
                    self.addMarker(this.getLatLng());
                },
                getPayload() {
                    return {
                        coordinates: this.getCoordinates(),
                        radius: this.getRadius()
                    }
                }
            }
        });
    }
};

export default Circle;
