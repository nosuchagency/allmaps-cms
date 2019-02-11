let drawingMethodsMixin = {
    methods: {
        drawPolyline(latlng) {
            this.addMarker(latlng);

            let points = this.currentComponent.feature.properties.markers;
            points.push([latlng.lat, latlng.lng]);

            if (this.isCurved() && points.length > 1) {
                let polyline = this.bezierSpline(points, false);

                this.currentComponent.setLatLngs(polyline);
                this.currentComponent.feature.properties.markers = points;
            } else if (this.isCurved() && points.length <= 1) {
                this.currentComponent.addLatLng(latlng);
                this.currentComponent.feature.properties.markers = points;
            } else {
                this.currentComponent.addLatLng(latlng);
            }
        },
        drawPolygon(latlng) {
            this.addMarker(latlng);

            let points = this.currentComponent.feature.properties.markers;
            points.push([latlng.lat, latlng.lng]);

            if (this.isCurved() && points.length > 1) {
                let polyline = this.bezierSpline(points, false);

                this.currentComponent.setLatLngs(polyline);
                this.currentComponent.feature.properties.markers = points;
            } else if (this.isCurved() && points.length <= 1) {
                this.currentComponent.addLatLng(latlng);
                this.currentComponent.feature.properties.markers = points;
            } else {
                this.currentComponent.addLatLng(latlng);
            }
        },
        drawCircle(latlng) {
            let destination = this.currentComponent.getLatLng();

            let radius = Math.round(latlng.distanceTo(destination) * 100) / 100;

            this.currentComponent.setRadius(radius);
            this.currentComponent.setStyle({ radius });

            this.currentComponent.feature.properties.radius = radius;
        },
        drawRectangle() {
            console.log('Nothing to do at the moment! Everything is handled by the leaflet transform plug-in!');
        },
        drawImage() {
            console.log('Nothing to do at the moment! Everything is handled by the leaflet transform plug-in!');
        }
    }
}

module.exports = drawingMethodsMixin;