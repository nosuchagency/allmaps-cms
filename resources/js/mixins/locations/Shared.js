export default {
    getLocation() {
        return this.location;
    },
    getName() {
        return this.location.name;
    },
    getType() {
        return this.location.type;
    },
    getUnsavedChanges() {
        return true;
    }
}