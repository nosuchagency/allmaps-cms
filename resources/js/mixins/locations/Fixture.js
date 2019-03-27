import shared from './Shared';

let Fixture = {
    mounted() {
        let self = this;

        L.Fixture = L.Rectangle.extend({
            ...shared, ...{
                initialize(location) {
                    this.location = location;
                    this.unsavedChanges = false;

                    let coordinates, topLeft, topRight, bottomLeft;

                    if (location.coordinates) {
                        coordinates = location.coordinates;
                    } else {
                        let metersPerPixel = this.getMetersPerPixel();
                        let width = (this.getWidth() / 100) / metersPerPixel;
                        let height = (this.getHeight() / 100) / metersPerPixel;

                        let center = self.map.getCenter();
                        let pointC = self.map.latLngToContainerPoint(center);
                        topLeft = self.map.containerPointToLatLng([pointC.x - (width / 2), pointC.y + (height / 2)]);
                        topRight = self.map.containerPointToLatLng([pointC.x + (width / 2), pointC.y + (height / 2)]);
                        bottomLeft = self.map.containerPointToLatLng([pointC.x - (width / 2), pointC.y - (height / 2)]);
                        coordinates = [[bottomLeft.lat, bottomLeft.lng], [topRight.lat, topRight.lng]];
                    }

                    let options = {...location.fixture, ...{transform: true, draggable: true, weight: 0}};

                    L.Rectangle.prototype.initialize.call(this, coordinates, options);
                    setTimeout(() => this.dragging.disable(), 1);

                    if (location.coordinates) {
                        this.setLatLngs(location.coordinates);
                    }

                    if (!topLeft) {
                        ({topLeft, topRight, bottomLeft} = this.extractDimensions(this.getLatLngs()));
                    }

                    this.overlay = new L.imageOverlay.rotated(this.getImage(), topLeft, topRight, bottomLeft).addTo(self.locationImageOverlayLayer);

                    this.activateEventListeners();
                },
                activateEventListeners() {
                    this.on('click', this.componentClicked);
                },
                startEditing() {
                    setTimeout(() => this.dragging.enable(), 1);
                    this.transform.enable();
                    this.transform.setOptions({rotation: true, scaling: false});

                    this.addEventListener('rotateend', this.rotateEnd);
                    this.addEventListener('dragend', this.dragEnd);
                },
                stopEditing() {
                    this.dragging.disable();
                    this.transform.disable();
                },
                rotateEnd(e) {
                    let {topLeft, topRight, bottomLeft} = this.extractDimensions(e.target.getLatLngs());
                    this.overlay.reposition(topLeft, topRight, bottomLeft);
                    this.unsavedChanges = true;
                },
                dragEnd(e) {
                    let {topLeft, topRight, bottomLeft} = this.extractDimensions(e.target.getLatLngs());
                    this.overlay.addTo(self.locationImageOverlayLayer);
                    this.overlay.reposition(topLeft, topRight, bottomLeft);
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
                remove() {
                    this.overlay.removeFrom(self.locationImageOverlayLayer);
                },
                cancel() {
                    this.overlay.removeFrom(self.locationImageOverlayLayer);
                },
                getCoordinates() {
                    return this.getLatLngs();
                },
                transformHandler(e) {
                    this.setLatLngs(e.target.getLatLngs());
                },
                extractDimensions(latlngs) {
                    return {
                        topLeft: L.latLng(latlngs[0][0].lat, latlngs[0][0].lng),
                        topRight: L.latLng(latlngs[0][1].lat, latlngs[0][1].lng),
                        bottomLeft: L.latLng(latlngs[0][3].lat, latlngs[0][3].lng)
                    };
                },
                initialCoordinates(width = 50, height = 50) {
                    let latLng = L.latLng(self.map.getCenter());
                    let currentPoint = self.map.latLngToContainerPoint(latLng);
                    let xDifference = width / 2;
                    let yDifference = height / 2;

                    let northWest = L.point((currentPoint.x + xDifference), (currentPoint.y - yDifference));
                    let northEast = L.point((currentPoint.x + xDifference), (currentPoint.y + yDifference));
                    let southWest = L.point((currentPoint.x - xDifference), (currentPoint.y - yDifference));
                    let southEast = L.point((currentPoint.x - xDifference), (currentPoint.y + yDifference));

                    return [
                        self.map.containerPointToLatLng(northWest),
                        self.map.containerPointToLatLng(northEast),
                        self.map.containerPointToLatLng(southEast),
                        self.map.containerPointToLatLng(southWest),
                        self.map.containerPointToLatLng(northWest)
                    ];
                },
                getMetersPerPixel() {
                    let center = self.map.getCenter();
                    let pointC = self.map.latLngToContainerPoint(center);
                    let pointX = [pointC.x + 1, pointC.y];
                    let pointY = [pointC.x, pointC.y + 1];

                    let latLngC = self.map.containerPointToLatLng(pointC);
                    let latLngX = self.map.containerPointToLatLng(pointX);
                    let latLngY = self.map.containerPointToLatLng(pointY);

                    return latLngC.distanceTo(latLngX);
                },
                getWidth() {
                    return this.location.fixture.width;
                },
                getHeight() {
                    return this.location.fixture.height;
                },
                getImage() {
                    return this.location.fixture.image;
                }
            }
        });
    }
};

export default Fixture;