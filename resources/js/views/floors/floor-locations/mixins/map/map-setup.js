let drawMethodsMixin = {
    data() {
        return {
            map: null
        }
    },
    methods: {
        setupMap() {
            this.map = new L.Map('map', {
                center: new L.LatLng(this.floor.place.lat, this.floor.place.lng),
                zoom: 19
            });

            L.gridLayer
                .googleMutant({
                    type: 'roadmap',
                    styles: [
                        {
                            elementType: 'labels',
                            stylers: [{visibility: 'off'}]
                        }
                    ]
                })
                .addTo(this.map);

            this.map.zoomControl.setPosition('bottomleft');
        },
        repositionMap() {
            this.map.flyTo(new L.LatLng(this.floor.place.lat, this.floor.place.lng), 19);
        },
        drawLocations() {
            this.floor.pois.forEach(this.drawLocation);
            this.floor.findables.forEach(this.drawLocation);
            this.floor.beacons.forEach(this.drawLocation);
        },
        drawComponents() {
            if (!this.floor.floor_plan) {
                return;
            }

            let self = this;

            let geoJSON = JSON.parse(this.floor.floor_plan);

            geoJSON.features.forEach(function (geoJSONFeature) {
                self.addExistingComponent({
                    coordinates: self.reverseLatLngs(geoJSONFeature.geometry.coordinates),
                    name: geoJSONFeature.properties.name,
                    weight: geoJSONFeature.properties.weight,
                    color: geoJSONFeature.properties.color,
                    type: geoJSONFeature.properties.type,
                    shape: geoJSONFeature.properties.shape,
                    image: geoJSONFeature.properties.image,
                    curved: geoJSONFeature.properties.curved,
                    radius: geoJSONFeature.properties.radius,
                    opacity: geoJSONFeature.properties.opacity,
                    id: geoJSONFeature.properties.id
                }, false);
            });
        },
        addExistingComponent(component) {
            this.createComponent(component);
        },
        createComponent(component) {
            let visualComponent;

            switch (component.shape) {
                case 'polyline':
                    visualComponent = this.createPolylineComponent(component);
                    break;
                case 'polygon':
                    visualComponent = this.createPolygonComponent(component);
                    break;
                case 'rectangle':
                    visualComponent = this.createRectangleComponent(component);
                    break;
                case 'circle':
                    visualComponent = this.createCircleComponent(component);
                    break;
                case 'image':
                    visualComponent = this.createImageComponent(component);
                    break;
            }

            visualComponent.addTo(this.floorPlanLayer);

            return visualComponent;
        },
        createPolylineComponent(component) {
            let coordinates = [];

            if (component.coordinates) {
                coordinates = component.coordinates;
            }

            if (component.curved && coordinates.length > 1) {
                coordinates = this.bezierSpline(component.coordinates);
            }

            return new L.Polyline(coordinates, {
                weight: component.weight,
                color: component.color
            });
        },
        createPolygonComponent(component) {
            let coordinates = [];

            if (component.coordinates) {
                coordinates = component.coordinates;
            }

            if (component.curved && coordinates.length > 1) {
                coordinates = this.bezierSpline(component.coordinates);
            }

            return new L.polygon(coordinates, {
                weight: component.weight,
                color: component.color,
                fillOpacity: component.opacity
            });
        },
        createRectangleComponent(component) {
            let visualComponent = new L.rectangle(this.getLatLngs(), {
                weight: component.weight,
                color: component.color,
                fillOpacity: component.opacity
            });

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

            return new L.circle(pointCoordinate, {
                weight: component.weight,
                color: component.color,
                radius: component.radius ? component.radius : 10,
                fillOpacity: component.opacity
            });
        },
        createImageComponent(component) {
            let tempRect = new L.rectangle(this.getLatLngs());

            if (component.coordinates) {
                tempRect.setLatLngs(component.coordinates);
            }

            let latlngs = tempRect.getLatLngs();
            let topLeft = L.latLng(latlngs[0][0].lat, latlngs[0][0].lng);
            let topRight = L.latLng(latlngs[0][1].lat, latlngs[0][1].lng);
            let bottomLeft = L.latLng(latlngs[0][3].lat, latlngs[0][3].lng);

            let visualComponent = new L.imageOverlay.rotated('/storage/' + component.image, topLeft, topRight, bottomLeft);

            return visualComponent;
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
        bezierSpline(coordinates) {
            let line = turf.lineString(coordinates);
            let curved = turf.bezierSpline(line);

            return curved.geometry.coordinates;
        }
    }
};

module.exports = drawMethodsMixin;