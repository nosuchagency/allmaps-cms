import shared from './Shared';

let Polygon = {
    mounted() {
        let self = this;

        L.PolygonComponent = L.Polygon.extend({
            ...shared, ...{
                initialize(structure, readonly = false) {
                    this.structure = structure;
                    this.readonly = readonly;

                    L.Polygon.prototype.initialize.call(this, this.structure.coordinates || [], this.getAttributes());

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
                    self.addMarker(latlng);

                    let points = this.getMarkers();
                    points.push(latlng);

                    if (this.isCurved() && points.length > 1) {
                        let polyline = this.bezierSpline(points);
                        this.setLatLngs(polyline);
                    } else {
                        this.addLatLng(latlng);
                    }
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
                }
            }
        });
    }
};

export default Polygon;