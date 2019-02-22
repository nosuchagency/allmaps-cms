let stateMethodsMixin = {
    methods: {
        startEditing(structure) {
            this.$emit('structure-copy:set', structure);

            let component = this.initializeStructure(structure.getStructure()).addTo(this.editingLayerGroup);
            component.startEditing();

            if (structure.getShape() === 'image') {
                structure.overlay.removeFrom(this.imageOverlayLayer);
            }
            structure.removeFrom(this.structuresLayerGroup);
            this.$emit('structure:set', component, (structure) => structure.addMarkers());
        },
        stopEditing() {
            this.currentStructure.stopEditing();
            this.$emit('structure:set', null);
            this.$emit('structure-copy:set', null);
            this.popup.removeFrom(this.map);
            this.drawHelperPolyline.setLatLngs([]);
            this.editingMarkerLayerGroup.clearLayers();
            this.editingLayerGroup.clearLayers();
        },
        saveStructure() {
            this.currentStructure.removeFrom(this.editingLayerGroup);
            this.currentStructure.addTo(this.structuresLayerGroup);
            this.currentStructure.save();
            this.stopEditing();
        },
        cancelStructure() {
            this.currentStructure.removeFrom(this.editingLayerGroup);
            this.currentStructure.cancel();
            this.currentStructureCopy.addTo(this.structuresLayerGroup);
            if (this.currentStructureCopy.getShape() === 'image') {
                this.currentStructureCopy.overlay.addTo(this.imageOverlayLayer);
            }
            this.stopEditing();
        },
        removeStructure() {
            this.currentStructure.removeFrom(this.editingLayerGroup);
            this.currentStructure.remove();
            this.stopEditing();
        },
        undoStructure() {
            this.currentStructure.undo();
        }
    }
};

module.exports = stateMethodsMixin;