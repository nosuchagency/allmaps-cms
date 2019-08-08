import cloneDeep from 'lodash/cloneDeep';

let stateMethodsMixin = {
    methods: {
        startEditing(structure) {
            this.$emit('structure-copy:set', structure);

            let component = this.initializeStructure(cloneDeep(structure.getStructure())).addTo(this.editingLayer);
            component.startEditing();

            if (structure.getShape() === 'image') {
                setTimeout(() => structure.overlay.removeFrom(this.imageOverlayLayer), 50);
            }
            structure.removeFrom(this.structuresLayer);
            this.$emit('structure:set', component, (structure) => structure.addMarkers());
        },
        stopEditing() {
            this.currentStructure.stopEditing();
            this.$emit('structure:set', null);
            this.$emit('structure-copy:set', null);
            this.popup.removeFrom(this.map);
            this.ruler.setLatLngs([]);
            this.editingMarkerLayer.clearLayers();
            this.editingLayer.clearLayers();
        },
        saveStructure() {
            this.currentStructure.removeFrom(this.editingLayer);
            this.currentStructure.addTo(this.structuresLayer);
            this.currentStructure.save();
            this.stopEditing();
        },
        cancelStructure() {
            this.currentStructure.removeFrom(this.editingLayer);
            this.currentStructure.cancel();
            this.currentStructureCopy.addTo(this.structuresLayer);
            if (this.currentStructureCopy.getShape() === 'image') {
                this.currentStructureCopy.overlay.addTo(this.imageOverlayLayer);
            }
            this.stopEditing();
        },
        removeStructure() {
            this.currentStructure.removeFrom(this.editingLayer);
            this.currentStructure.remove();
            this.stopEditing();
        },
        undoStructure() {
            this.currentStructure.undo();
        }
    }
};

export default stateMethodsMixin;
