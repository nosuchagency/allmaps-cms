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
                zoom: 19,
            });

            L.gridLayer
                .googleMutant({
                    type: 'roadmap',
                    styles: [
                        {
                            elementType: 'labels',
                            stylers: [{ visibility: 'off' }]
                        }
                    ]
                })
                .addTo(this.map);

            this.map.zoomControl.setPosition('bottomleft');

            this.map.on('click', this.mapClickHandler);

            this.map.addEventListener('mouseout', this.mapMouseOutEventHandler)
            this.map.addEventListener('mousemove', this.mapMouseMoveEventHandler);
            L.control.scale().addTo(this.map);
        },
        mapClickHandler(e) {
            if (!this.currentComponent) return;

            switch (this.getCurrentType()) {
                case 'polyline':
                    this.drawPolyline(e.latlng);
                    break;
                case 'polygon':
                    this.drawPolygon(e.latlng);
                    break;
                case 'rectangle':
                    this.drawRectangle(e.latlng);
                    break;
                case 'circle':
                    this.drawCircle(e.latlng);
                    break;
                case 'image':
                    this.drawImage(e.latlng);
                    break;
            }
        },
        drawComponents() {
            if (!this.floor.floor_plan) return;

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
                    curved: geoJSONFeature.properties.curved,
                    radius: geoJSONFeature.properties.radius,
                    opacity: geoJSONFeature.properties.opacity,
                    width: geoJSONFeature.properties.width,
                    height: geoJSONFeature.properties.height,
                    image: geoJSONFeature.properties.image,
                    id: geoJSONFeature.properties.id,
                    markers: geoJSONFeature.properties.markers,
                }, false);
            });
        },
        addNewComponent(component) {
            let newComponent = this.createComponent(component);

            if (newComponent) this.startEditing(newComponent);
        },
        addExistingComponent(component) {
            this.createComponent(component);
        },
        createComponent(component) {
            let newComponent;

            switch (component.shape) {
                case 'polyline':
                    newComponent = this.createPolylineComponent(component);
                    break;
                case 'polygon':
                    newComponent = this.createPolygonComponent(component);
                    break;
                case 'rectangle':
                    newComponent = this.createRectangleComponent(component);
                    break;
                case 'circle':
                    newComponent = this.createCircleComponent(component);
                    break;
                case 'image':
                    newComponent = this.createImageComponent(component);
                    break;
                default:
                    return
            }

            newComponent.on('click', this.componentClickHandler);
            newComponent.addTo(this.exportLayerGroup);
            newComponent.feature = this.initializeFeature(component);

            return newComponent;
        },
    }
}

module.exports = drawMethodsMixin;