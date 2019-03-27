export default {
    getStructure() {
        return this.structure;
    },
    getId() {
        return this.structure.id;
    },
    getName() {
        return this.structure.name;
    },
    getShape() {
        return this.structure.component.shape;
    },
    getType() {
        return this.structure.component.type;
    },
    getCurved() {
        return this.structure.component.curved;
    },
    getColor() {
        return this.structure.component.color;
    },
    getOpacity() {
        return this.structure.component.opacity;
    },
    getWidth() {
        return this.structure.component.width;
    },
    getHeight() {
        return this.structure.component.height;
    },
    getImage() {
        return this.structure.component.image;
    },
    getMarkers() {
        if (!this.structure.markers) {
            this.structure.markers = [];
        }

        return this.structure.markers;
    },
    bezierSpline(coordinates) {
        let line = turf.lineString(coordinates.map(x => [x.lat, x.lng]));
        let curved = turf.bezierSpline(line);

        return curved.geometry.coordinates;
    },
    save() {
    },
    remove() {
        console.log('Removing!');
    },
    undo() {
        console.log('Undoing!');
    },
    cancel() {
        console.log('Cancelling!');
    },
    startEditing() {
    },
    stopEditing() {
    },
    click(latlng) {
        console.log(latlng);
    },
    addMarkers() {
    },
    getDestination() {
        return null;
    }
}