export default {
    getLocation() {
        return this.location;
    },
    getId() {
        return this.location.id;
    },
    getName() {
        return this.location.name;
    },
    getType() {
        return this.location.type;
    },
    hasUnsavedChanges() {
        return this.unsavedChanges;
    },
    getStroke() {
        return this.location.locatable.stroke;
    },
    getStrokeType() {
        return this.location.locatable.stroke_type;
    },
    getStrokeColor() {
        return this.location.locatable.stroke_color;
    },
    getStrokeWidth() {
        return this.location.locatable.stroke_width;
    },
    getStrokeOpacity() {
        return this.location.locatable.stroke_opacity;
    },
    getFill() {
        return this.location.locatable.fill;
    },
    getFillColor() {
        return this.location.locatable.fill_color;
    },
    getFillOpacity() {
        return this.location.locatable.fill_opacity;
    },
    getImage() {
        return this.location.locatable.image;
    },
    getImageWidth() {
        return this.location.locatable.image_width;
    },
    getImageHeight() {
        return this.location.locatable.image_height;
    },
    click(latlng) {
        console.log(latlng);
    },
    save() {
        console.log('Saving!');
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
        console.log('Editing!');
    },
    stopEditing() {
        console.log('Not editing!')
    },
    addMarkers() {
        console.log('Adding markers!');
    },
    getDestination() {
        return null;
    },
    isArea() {
        return false;
    },
    getAttributes() {
        return {
            stroke: this.getStroke(),
            color: this.getStrokeColor(),
            weight: this.getStrokeWidth(),
            opacity: this.getStrokeOpacity(),
            fill: this.getFill(),
            fillColor: this.getFillColor(),
            fillOpacity: this.getFillOpacity(),
            dashArray: this.getStrokeType() === 'dashed' ? '5,10' : null,
        }
    }
}