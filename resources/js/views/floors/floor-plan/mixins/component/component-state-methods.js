let stateMethodsMixin = {
    methods: {
        undoComponent() {
            let currentLatLngs, latLng = null;

            switch (this.getCurrentType()) {
                case 'polyline':
                    currentLatLngs = this.currentComponent.getLatLngs();
                    break;
                case 'polygon':
                    currentLatLngs = this.currentComponent.getLatLngs()[0];
                    break;
                case 'rectangle':
                case 'circle':
                case 'image':
                    return;
            }

            let markers = this.currentComponent.feature.properties.markers;

            if (this.isCurved() && markers.length > 2) {
                latLng = markers.pop();
                currentLatLngs = this.bezierSpline(markers, false);
            } else if (this.isCurved() && markers.length === 2) {
                latLng = markers.pop();
                currentLatLngs = [markers[0]];
            } else if (this.isCurved() && markers.length === 1) {
                latLng = markers.pop();
                currentLatLngs = [];
            } else {
                latLng = currentLatLngs.pop();
            }

            this.currentComponent.setLatLngs(currentLatLngs);

            for (let marker of this.editingMarkerLayerGroup.getLayers()) {
                if (marker.getLatLng().equals(latLng)) {
                    marker.removeFrom(this.editingMarkerLayerGroup);
                    break;
                }
            }
        },
        removeComponent() {
            if (this.currentComponent.feature.properties.shape === 'image') {
                this.currentComponent.overlay.removeFrom(this.imageOverlayLayer);
            }
            this.currentComponent.removeFrom(this.editingLayerGroup);
            this.stopEditing();
            this.saveFloor();
        },
        saveComponent() {
            this.currentComponent.removeFrom(this.editingLayerGroup);
            this.currentComponent.addTo(this.exportLayerGroup);
            this.stopEditing();
            this.saveFloor();
        },
        cancelComponent() {
            this.currentComponent.removeFrom(this.editingLayerGroup);
            this.currentComponentCopy.addTo(this.exportLayerGroup);
            this.stopEditing();
        },
        startEditing(visualComponent) {
            this.$store.commit('plan/setCurrentComponentCopy', visualComponent);

            let component = null;

            switch (visualComponent.feature.properties.shape) {
                case 'polyline':
                    component = new L.Polyline(visualComponent.getLatLngs(), visualComponent.options).addTo(this.editingLayerGroup);
                    break;
                case 'polygon':
                    component = new L.polygon(visualComponent.getLatLngs(), visualComponent.options).addTo(this.editingLayerGroup);
                    break;
                case 'rectangle':
                    component = new L.rectangle(visualComponent.getBounds(), Object.assign(visualComponent.options, { draggable: true })).addTo(this.editingLayerGroup);
                    component.setLatLngs(visualComponent.getLatLngs());
                    component.transform.enable();
                    component.transform.setOptions({ rotation: true, scaling: true, uniformScaling: false });
                    component.on('dragend', this.transformHandler);
                    component.on('rotateend', this.transformHandler);
                    component.on('scaleend', this.transformHandler);
                    break;
                case 'circle':
                    component = new L.circle(visualComponent.getLatLng(), visualComponent.options).addTo(this.editingLayerGroup);
                    break;
                case 'image':
                    component = new L.rectangle(visualComponent.getBounds(), Object.assign(visualComponent.options, { draggable: true })).addTo(this.editingLayerGroup);
                    component.setLatLngs(visualComponent.getLatLngs());
                    component.transform.enable();
                    component.transform.setOptions({ rotation: true, scaling: false });
                    component.overlay = visualComponent.overlay;

                    let self = this;

                    component.addEventListener('rotateend', function (e) {
                        let topLeft = L.latLng(e.target.getLatLngs()[0][0].lat, e.target.getLatLngs()[0][0].lng);
                        let topRight = L.latLng(e.target.getLatLngs()[0][1].lat, e.target.getLatLngs()[0][1].lng);
                        let bottomLeft = L.latLng(e.target.getLatLngs()[0][3].lat, e.target.getLatLngs()[0][3].lng);

                        component.overlay.reposition(topLeft, topRight, bottomLeft);
                    });

                    component.addEventListener('dragend', function (e) {
                        let topLeft = L.latLng(e.target.getLatLngs()[0][0].lat, e.target.getLatLngs()[0][0].lng);
                        let topRight = L.latLng(e.target.getLatLngs()[0][1].lat, e.target.getLatLngs()[0][1].lng);
                        let bottomLeft = L.latLng(e.target.getLatLngs()[0][3].lat, e.target.getLatLngs()[0][3].lng);
                        component.overlay.addTo(self.imageOverlayLayer);
                        component.overlay.reposition(topLeft, topRight, bottomLeft);
                    });
                    break;
            }
            visualComponent.removeFrom(this.exportLayerGroup);
            component.on('click', this.componentClickHandler);
            component.feature = this.initializeFeature(visualComponent.feature.properties);

            this.$store.commit('plan/setCurrentComponent', component);

            switch (this.getCurrentType()) {
                case 'polyline':
                    if (this.isCurved()) {
                        this.currentComponent.feature.properties.markers.forEach(this.addMarker);
                    } else {
                        this.currentComponent.getLatLngs().forEach(this.addMarker);
                    }
                    break;
                case 'polygon':
                    if (this.isCurved()) {
                        this.currentComponent.feature.properties.markers.forEach(this.addMarker);
                    } else {
                        this.currentComponent.getLatLngs()[0].forEach(this.addMarker);
                    }
                    break;
                case 'rectangle':
                    break;
                case 'circle':
                    this.addMarker(this.currentComponent.getLatLng());
                    break;
                case 'image':
                    break;
            }
        },
        stopEditing() {
            if (this.currentComponent.transform) {
                this.currentComponent.dragging.disable();
                this.currentComponent.transform.disable();
            }
            this.$store.commit('plan/setCurrentComponent', null);
            this.$store.commit('plan/setCurrentComponentCopy', null);
            this.popup.removeFrom(this.map);
            this.drawHelperPolyline.setLatLngs([]);
            this.editingMarkerLayerGroup.clearLayers();
            this.editingLayerGroup.clearLayers();
            this.$store.commit('plan/setSelectedComponent', '');
        },
    }
}

module.exports = stateMethodsMixin;