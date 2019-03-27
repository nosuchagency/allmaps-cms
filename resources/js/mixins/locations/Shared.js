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
    }
}