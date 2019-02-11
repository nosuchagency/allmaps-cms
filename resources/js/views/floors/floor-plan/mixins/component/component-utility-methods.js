let utilityMethodsMixin = {
    methods: {
        bezierSpline(coordinates, reverse = true) {
            let line = turf.lineString(coordinates);
            let curved = turf.bezierSpline(line);

            return reverse ? this.reverseLatLngs(curved.geometry.coordinates) : curved.geometry.coordinates;
        },
        reverseLatLngs(coordinates) {
            return coordinates.map(element => {
                if (Array.isArray(element[0])) {
                    element.map(function (innerElement) {
                        return innerElement.reverse();
                    });
                } else if (Array.isArray(element)) {
                    element.reverse();
                }

                return element;
            });
        },
        repositionMap() {
            this.map.flyTo(new L.LatLng(this.floor.place.lat, this.floor.place.lng), 19);
        },
        getCurrentType() {
            return this.currentComponent.feature.properties.shape;
        },
        isCurved() {
            return this.currentComponent.feature.properties.curved;
        },
        getMetersPerPixel() {
            let center = this.map.getCenter();
            let pointC = this.map.latLngToContainerPoint(center);
            let pointX = [pointC.x + 1, pointC.y];
            let pointY = [pointC.x, pointC.y + 1];

            let latLngC = this.map.containerPointToLatLng(pointC);
            let latLngX = this.map.containerPointToLatLng(pointX);
            let latLngY = this.map.containerPointToLatLng(pointY);

            return latLngC.distanceTo(latLngX);
        },
        getLatLngs(width = 50, height = 50) {
            let latLng = L.latLng(this.map.getCenter());
            let currentPoint = this.map.latLngToContainerPoint(latLng);
            let xDifference = width / 2;
            let yDifference = height / 2;

            let northWest = L.point((currentPoint.x + xDifference), (currentPoint.y - yDifference));
            let northEast = L.point((currentPoint.x + xDifference), (currentPoint.y + yDifference));
            let southWest = L.point((currentPoint.x - xDifference), (currentPoint.y - yDifference));
            let southEast = L.point((currentPoint.x - xDifference), (currentPoint.y + yDifference));

            return [
                this.map.containerPointToLatLng(northWest),
                this.map.containerPointToLatLng(northEast),
                this.map.containerPointToLatLng(southEast),
                this.map.containerPointToLatLng(southWest),
                this.map.containerPointToLatLng(northWest)
            ];
        },
        initializeFeature(properties) {
            return {
                type: 'Feature',
                properties: {
                    type: properties.type,
                    shape: properties.shape,
                    name: properties.name,
                    weight: properties.weight,
                    color: properties.color,
                    curved: properties.curved,
                    radius: properties.radius,
                    opacity: properties.opacity,
                    width: properties.width,
                    height: properties.height,
                    image: properties.image,
                    id: properties.id,
                    markers: properties.markers ? properties.markers.slice(0) : []
                }
            };
        },
    }
}

module.exports = utilityMethodsMixin;