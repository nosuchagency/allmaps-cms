let mapSetup = {
    data() {
        return {
            map: null
        }
    },
    methods: {
        setupMap() {
            this.map = new L.Map('map', {
                center: new L.LatLng(this.lat, this.lng),
                zoom: 19,
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
                map.flyTo(new L.LatLng(this.lat, this.lng), 19)
            }, 'Reposition Map').addTo(this.map);

            this.map.addEventListener('mouseout', this.mapMouseOutEventHandler);
            this.map.addEventListener('mousemove', this.mapMouseMoveEventHandler);
            L.control.scale().addTo(this.map);
        },
        mapClickHandler(e) {
            if (this.currentStructure) {
                this.currentStructure.click(e.latlng);
            }
        },
        addStructure(structure, edit = false) {
            let initializedStructure = this.initializeStructure(structure);

            if (initializedStructure) {
                initializedStructure.addTo(this.structuresLayer);

                if (edit) {
                    this.startEditing(initializedStructure);
                }
            }
        },
        initializeStructure(structure) {
            switch (structure.component.shape) {
                case 'polyline':
                    return new L.PolylineComponent(structure);
                case 'polygon':
                    return new L.PolygonComponent(structure);
                case 'rectangle':
                    return new L.RectangleComponent(structure);
                case 'circle':
                    return new L.CircleComponent(structure);
                case 'image':
                    return new L.ImageComponent(structure);
                default:
                    return null
            }
        },
        mapMouseOutEventHandler(e) {
            this.ruler.setLatLngs([]);
            this.popup.removeFrom(this.map);
        },
        mapMouseMoveEventHandler(e) {
            if (!this.currentStructure) {
                return;
            }

            let destination = this.currentStructure.getDestination();

            if (destination) {
                this.ruler.setLatLngs([destination, e.latlng]);
                this.popup.setContent(Math.round(e.latlng.distanceTo(destination) * 100) / 100 + ' meters');
                this.popup.setLatLng(e.latlng).openOn(this.map);
            }
        }
    }
};

module.exports = mapSetup;