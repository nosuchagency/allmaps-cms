let creationMethodsMixin = {
    data() {
        return {
            tempLocation: null,
            polylineLatlng: null
        }
    },
    methods: {
        addLocationToFloor(location) {
            let transformedLocation = this.getInitialLocationJSON(location.location_type, location);

            let newLocation = this.drawLocation(transformedLocation);
            newLocation.location.leaflet_id = newLocation._leaflet_id;

            this.$store.commit('location/setCurrentLocation', newLocation);

            if (transformedLocation.location_type !== 'poi' || transformedLocation.poi.type !== 'area') {
                this.createLocation(newLocation.location)
            } else {
                this.map.on('click', this.mapClickHandler);
                this.map.addEventListener('mouseout', this.mapMouseOutEventHandler)
                this.map.addEventListener('mousemove', this.mapMouseMoveEventHandler);
            }
        },
        removeLocationFromFloor() {
            let type = this.currentLocation.location.location_type;
            let id = this.currentLocation.location.id;
            this.currentLocation.removeFrom(this.locationsLayer);
            this.$store.commit('location/setCurrentLocation', null);

            this.removeLocation(type, id);
            this.stopEditing();
        },
        getInitialLocationJSON(type, location) {
            let latlng = this.map.getCenter();

            switch (type) {
                case 'poi':
                    if (location.type === 'area') {
                        return location = {
                            location_type: 'poi',
                            poi: location,
                            area: [],
                            poi_id: location.id
                        };
                    } else {
                        return location = {
                            location_type: 'poi',
                            poi: location,
                            lat: latlng.lat,
                            lng: latlng.lng,
                            poi_id: location.id
                        };
                    }
                case 'findable':
                    return location = {
                        location_type: 'findable',
                        findable: location,
                        lat: latlng.lat,
                        lng: latlng.lng,
                        findable_id: location.id
                    };
                case 'beacon':
                    return location = {
                        location_type: 'beacon',
                        beacon: location,
                        lat: latlng.lat,
                        lng: latlng.lng,
                        beacon_id: location.id
                    };
            }
        },
        async createLocation(location) {
            try {
                const res = await this.$axios.post('/places/' + this.place.id + '/buildings/' + this.building.id + '/floors/' + this.floor.id + '/locations/' + location.location_type, location);
                this.locationsLayer.getLayer(res.data.location.leaflet_id).location.id = res.data.location.id;
            } catch (error) {
                this.$notify({
                    title: 'Error',
                    message: 'An error occurred while creating location',
                    type: 'error',
                    position: 'bottom-right'
                });
            }
        },
        async updateLocation(coords, location) {
            try {
                const res = await this.$axios.put('/places/' + this.place.id + '/buildings/' + this.building.id + '/floors/' + this.floor.id + '/locations/' + location.location_type + '/' + location.id, coords);
            } catch (error) {
                this.$notify({
                    title: 'Error',
                    message: 'An error occurred while updating location',
                    type: 'error',
                    position: 'bottom-right'
                });
            }
        },
        async removeLocation(type, id) {
            try {
                const res = await this.$axios.delete('/places/' + this.place.id + '/buildings/' + this.building.id + '/floors/' + this.floor.id + '/locations/' + type + '/' + id);
            } catch (error) {
                this.$notify({
                    title: 'Error',
                    message: 'An error occurred while removing location',
                    type: 'error',
                    position: 'bottom-right'
                });
            }
        },
        drawLocation(location) {
            let options = {};

            switch (location.location_type) {
                case 'poi':
                    if (location.poi.type === 'area') {
                        return this.addPolygon(location);
                    }
                    options.icon = this.getIcon('/storage/' + location.poi.icon);
                    break;
                case 'findable':
                    break;
                case 'beacon':
                    options.icon = this.getIcon('/storage/icons/bullseye.png');
                    break;
            }

            return this.addLocationMarker({lat: location.lat, lng: location.lng}, location, options);
        },
        closeLocation() {
            this.stopEditing();
        },
        addLocationMarker(coords, location, options = {}) {
            let marker = new L.Marker(coords, Object.assign({draggable: true}, options))
                .addTo(this.locationsLayer)
                .on('dragstart', this.locationDragStartHandler)
                .on('dragend', this.locationDragEndHandler)
                .on('click', this.locationClickHandler)

            marker.location = location;

            return marker;
        },
        addAreaMarker(latlng, options = {}) {
            return new L.Marker(latlng, Object.assign({draggable: true}, options))
                .addTo(this.markerLayer)
                .on('dragstart', this.dragStartHandler)
                .on('drag', this.dragHandler)
                .on('dragend', this.dragEndHandler)
                .on('click', this.clickHandler);
        },
        addPolygon(location) {
            let visualLocation = new L.polygon(location.area, {
                weight: 2,
                color: location.poi.color,
                fillOpacity: 0.5
            }).addTo(this.locationsLayer);

            visualLocation.on('click', this.areaClickHandler);

            visualLocation.location = location;

            return visualLocation;
        },
        mapClickHandler(e) {
            this.currentLocation.addLatLng(e.latlng);
            this.addAreaMarker(e.latlng);
        },
        locationDragStartHandler(e) {
            if (!this.currentLocation) return;

            let targetId = e.target.location.id;

            if (targetId === this.currentLocation.location.id) {
                this.tempLocation = this.currentLocation;
            } else if (targetId !== this.currentLocation.location.id) {
                this.tempLocation = e.target;
            }

            this.$store.commit('location/setCurrentLocation', null);
        },
        locationDragEndHandler(e) {
            let latlng = e.target.getLatLng();

            this.updateLocation({lat: latlng.lat, lng: latlng.lng}, e.target.location);

            if (this.tempLocation) {
                this.$store.commit('location/setCurrentLocation', this.tempLocation);
            }

            this.tempLocation = null;
        },
        locationClickHandler(e) {
            L.DomEvent.stopPropagation(e);

            if (!this.currentLocation) {
                this.$store.commit('location/setCurrentLocation', e.target);
            } else if (e.target.location.id !== this.currentLocation.location.id) {
                this.$store.commit('location/setCurrentLocation', e.target);
            } else {
                this.$store.commit('location/setCurrentLocation', null);
            }
        },
        areaClickHandler(e) {
            if (this.currentLocation &&
                this.currentLocation.location.location_type === 'poi' &&
                this.currentLocation.location.poi.type === 'area') {
                return
            }

            L.DomEvent.stopPropagation(e);

            this.$store.commit('location/setCurrentLocation', e.target);

            this.map.on('click', this.mapClickHandler);
            this.map.addEventListener('mouseout', this.mapMouseOutEventHandler)
            this.map.addEventListener('mousemove', this.mapMouseMoveEventHandler);

            this.startEditing(e.target);
        },
        startEditing(location) {
            location.getLatLngs()[0].forEach(this.addAreaMarker);
        },
        stopEditing() {
            this.$store.commit('location/setCurrentLocation', null);
            this.markerLayer.clearLayers();

            this.map.off('click', this.mapClickHandler);
            this.map.removeEventListener('mouseout', this.mapMouseOutEventHandler)
            this.map.removeEventListener('mousemove', this.mapMouseMoveEventHandler);
        },
        getIcon(img) {
            return L.icon({
                iconUrl: img,
                iconSize: [30, 30]
            });
        },
        mapMouseOutEventHandler(e) {
            this.drawHelperPolyline.setLatLngs([]);
            this.popup.removeFrom(this.map);
        },
        mapMouseMoveEventHandler(e) {
            let destination = null;

            let coords = this.currentLocation.getLatLngs()[0];
            if (coords.length > 0) destination = coords[coords.length - 1];

            if (!destination) return;

            this.drawHelperPolyline.setLatLngs([destination, e.latlng]);
            this.popup.setContent(Math.round(e.latlng.distanceTo(destination) * 100) / 100 + ' meters');
            this.popup.setLatLng(e.latlng).openOn(this.map);
        },
        saveLocationEditing() {
            let location = this.currentLocation.location;
            location.area = this.currentLocation.getLatLngs();

            if (this.currentLocation.location.id) {
                this.updateLocation({area: location.area}, location);
            } else {
                this.createLocation(location);
            }
            this.stopEditing();
        },
        dragStartHandler(e) {
            this.map.off('click', this.mapClickHandler);

            let latlngs = this.currentLocation.getLatLngs()[0];

            let latlng = e.target.getLatLng();
            for (let i = 0; i < latlngs.length; i++) {
                if (latlng.equals(latlngs[i])) {
                    this.polylineLatlng = i;
                }
            }
        },
        dragHandler(e) {
            let latlngs = this.currentLocation.getLatLngs()[0];
            let latlng = e.target.getLatLng();
            latlngs.splice(this.polylineLatlng, 1, latlng);
            this.currentLocation.setLatLngs(latlngs);
        },
        dragEndHandler(e) {
            let self = this;

            setTimeout(function () {
                self.map.on('click', self.mapClickHandler);
            }, 100);

            this.polylineLatlng = null;
        },
    }
}

export default creationMethodsMixin;