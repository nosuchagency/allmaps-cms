let handlerMethodsMixin = {
    methods: {
        transformHandler(e) {
            this.currentComponent.setLatLngs(e.target.getLatLngs());
        },
        componentClickHandler(e) {
            if (this.currentComponent) return;

            L.DomEvent.stopPropagation(e);

            this.$emit('setComponent', e.target);

            this.startEditing(e.target);
        },
        getCurrentType() {
            return this.currentComponent.feature.properties.shape;
        },
        isCurved() {
            return this.currentComponent.feature.properties.curved;
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
        }
    }
}

module.exports = handlerMethodsMixin;