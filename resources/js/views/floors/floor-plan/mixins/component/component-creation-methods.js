let creationMethodsMixin = {
    methods: {
        createPolylineComponent(component) {
            let coordinates = component.coordinates ? component.coordinates : [];

            let visualComponent = new L.Polyline(coordinates, {
                weight: component.weight,
                color: component.color
            });

            return visualComponent;
        },
        createPolygonComponent(component) {
            let coordinates = component.coordinates ? component.coordinates : [];

            let visualComponent = new L.polygon(coordinates, {
                weight: component.weight,
                color: component.color,
                fillOpacity: component.opacity
            });

            return visualComponent;
        },
        createRectangleComponent(component) {
            let visualComponent = new L.rectangle(this.getLatLngs(), {
                weight: component.weight,
                color: component.color,
                fillOpacity: component.opacity,
                transform: true
            });

            visualComponent.on('rotateend', this.rectangleTransformHandler);
            visualComponent.on('scaleend', this.rectangleTransformHandler);
            visualComponent.on('dragend', this.rectangleTransformHandler);

            if (component.coordinates) {
                visualComponent.setLatLngs(component.coordinates);
            }

            return visualComponent;
        },
        createCircleComponent(component) {
            let pointCoordinate;

            if (component.coordinates) {
                pointCoordinate = component.coordinates.reverse();
            } else {
                pointCoordinate = this.map.getCenter();
            }

            let visualComponent = new L.circle(pointCoordinate, {
                weight: component.weight,
                color: component.color,
                radius: component.radius ? component.radius : 10,
                fillOpacity: component.opacity
            });

            return visualComponent;
        },
        createImageComponent(component) {
            let coordinates, topLeft, topRight, bottomLeft;

            if (component.coordinates) {
                coordinates = component.coordinates;
            } else {
                let metersPerPixel = this.getMetersPerPixel();
                let width = (component.width / 100) / metersPerPixel;
                let height = (component.height / 100) / metersPerPixel;

                let center = this.map.getCenter();
                let pointC = this.map.latLngToContainerPoint(center);
                topLeft = this.map.containerPointToLatLng([pointC.x - (width / 2), pointC.y + (height / 2)]);
                topRight = this.map.containerPointToLatLng([pointC.x + (width / 2), pointC.y + (height / 2)]);
                bottomLeft = this.map.containerPointToLatLng([pointC.x - (width / 2), pointC.y - (height / 2)]);
                coordinates = [[bottomLeft.lat, bottomLeft.lng], [topRight.lat, topRight.lng]];
            }

            let visualComponent = new L.rectangle(coordinates, {
                color: '#ff7800',
                weight: 0,
                transform: true
            });

            if (component.coordinates) visualComponent.setLatLngs(component.coordinates);

            if (!topLeft) {
                let latlngs = visualComponent.getLatLngs();
                topLeft = L.latLng(latlngs[0][0].lat, latlngs[0][0].lng);
                topRight = L.latLng(latlngs[0][1].lat, latlngs[0][1].lng);
                bottomLeft = L.latLng(latlngs[0][3].lat, latlngs[0][3].lng);
            }

            let overlay = new L.imageOverlay.rotated('/storage/' + component.image, topLeft, topRight, bottomLeft).addTo(this.imageOverlayLayer);

            visualComponent.overlay = overlay;

            return visualComponent;
        }
    }
}

module.exports = creationMethodsMixin;