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
                zoom: 19,
            });

            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidmljdG9yLWVtaWwiLCJhIjoiY2p2bnEwNGF5MWt4cjQ4bno5M2lrbnR5MiJ9.lI1yQnR0jvfZo-oLwfLKWQ', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 30,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoidmljdG9yLWVtaWwiLCJhIjoiY2p2bnEwNGF5MWt4cjQ4bno5M2lrbnR5MiJ9.lI1yQnR0jvfZo-oLwfLKWQ'
            }).addTo(this.map);

            // L.gridLayer
            //     .googleMutant({
            //         type: 'roadmap',
            //         styles: [
            //             {
            //                 elementType: 'labels',
            //                 stylers: [{visibility: 'off'}]
            //             }
            //         ]
            //     })
            //     .addTo(this.map);

            this.map.zoomControl.setPosition('bottomleft');

            this.map.on('click', this.mapClickHandler);

            L.easyButton('fa-compress-arrows-alt', (btn, map) => {
                map.flyTo(new L.LatLng(this.latitude, this.longitude), 19)
            }, 'Reposition Map', {
                position: 'bottomleft'
            }).addTo(this.map);

            L.control.scale({
                position: 'bottomright'
            }).addTo(this.map);

            this.map.addEventListener('mouseout', this.mapMouseOutEventHandler);
            this.map.addEventListener('mousemove', this.mapMouseMoveEventHandler);
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
                let meters = (Math.round(e.latlng.distanceTo(destination) * 100) / 100);
                this.popup.setContent(meters + ' meters ' + this.popupText);
                this.popup.setLatLng(e.latlng).openOn(this.map);
            }
        }
    }
};

module.exports = mapSetup;
