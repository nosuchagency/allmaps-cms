let mapSetup = {
    data() {
        return {
            map: null
        }
    },
    methods: {
        setupMap() {
            this.map = new L.Map('map', {
                center: new L.LatLng(this.latitude, this.longitude),
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

            this.map.on('click', this.mapClickHandler);

            L.easyButton('fa-compress-arrows-alt', (btn, map) => {
                map.flyTo(new L.LatLng(this.latitude, this.longitude), 19)
            }, 'Reposition Map', {
                position: 'bottomleft'
            }).addTo(this.map);

            L.easyButton({
                position: 'bottomleft',
                states: [{
                    stateName: 'structures-visible',
                    icon: 'fa-image',
                    title: 'Click to hide structures',
                    onClick: (btn, map) => {
                        btn.state('structures-hidden');
                        this.structuresLayer.removeFrom(this.mainLayer);
                    }
                }, {
                    stateName: 'structures-hidden',
                    icon: 'fa-image',
                    title: 'Click to show structures',
                    onClick: (btn, map) => {
                        btn.state('structures-visible');
                        this.structuresLayer.addTo(this.mainLayer);
                    }
                }]
            }).addTo(this.map);

            this.map.addEventListener('mouseout', this.mapMouseOutEventHandler);
            this.map.addEventListener('mousemove', this.mapMouseMoveEventHandler);
        },
        mapClickHandler(e) {
            if (this.currentLocation) {
                this.currentLocation.click(e.latlng);
            }
        },
        addLocation(location, edit = false) {
            let initializedLocation = this.initializeLocation(location);

            if (initializedLocation) {
                initializedLocation.addTo(this.locationsLayer);

                if (edit) {
                    this.startEditing(initializedLocation);
                }
            }
        },
        addStructure(structure) {
            let initializedStructure = this.initializeStructure(structure);

            if (initializedStructure) {
                initializedStructure.addTo(this.structuresLayer);
            }
        },
        initializeLocation(location) {
            switch (location.type) {
                case 'beacon':
                    return new L.Beacon(location);
                case 'fixture':
                    return new L.Fixture(location);
                case 'poi':
                    if (location.poi.type === 'area') {
                        return new L.PoiArea(location);
                    }
                    return new L.PoiPoint(location);
                default:
                    return null
            }
        },
        initializeStructure(structure) {
            switch (structure.component.shape) {
                case 'polyline':
                    return new L.PolylineComponent(structure, true);
                case 'polygon':
                    return new L.PolygonComponent(structure, true);
                case 'rectangle':
                    return new L.RectangleComponent(structure, true);
                case 'circle':
                    return new L.CircleComponent(structure, true);
                case 'image':
                    return new L.ImageComponent(structure, true);
                default:
                    return null
            }
        },
        mapMouseOutEventHandler(e) {
            this.ruler.setLatLngs([]);
            this.popup.removeFrom(this.map);
        },
        mapMouseMoveEventHandler(e) {
            if (!this.currentLocation) {
                return;
            }

            let destination = this.currentLocation.getDestination();

            if (destination) {
                this.ruler.setLatLngs([destination, e.latlng]);
                let meters = (Math.round(e.latlng.distanceTo(destination) * 100) / 100);
                this.popup.setContent(meters + ' meters ' + this.popupText);
                this.popup.setLatLng(e.latlng).openOn(this.map);
            }
        }
    }
};

module.exports = mapSetup;