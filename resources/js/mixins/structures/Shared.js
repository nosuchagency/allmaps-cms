export default {
    getStructure() {
        return this.mapStructure;
    },
    getName() {
        return this.mapStructure.name;
    },
    getShape() {
        return this.mapStructure.component.shape;
    },
    getType() {
        return this.mapStructure.component.type;
    },
    getCurved() {
        return this.mapStructure.component.curved;
    },
    getColor() {
        return this.mapStructure.component.color;
    },
    getOpacity() {
        return this.mapStructure.component.opacity;
    },
    getWidth() {
        return this.mapStructure.component.width;
    },
    getHeight() {
        return this.mapStructure.component.height;
    },
    getImage() {
        return this.mapStructure.component.image;
    },
    initializeFeature() {
        this.feature = {
            type: 'Feature',
            properties: {
                type: this.mapStructure.component.type,
                shape: this.mapStructure.component.shape,
                name: this.mapStructure.component.name,
                weight: this.mapStructure.component.weight,
                color: this.mapStructure.component.color,
                curved: this.mapStructure.component.curved,
                radius: this.mapStructure.component.radius,
                opacity: this.mapStructure.component.opacity,
                width: this.mapStructure.component.width,
                height: this.mapStructure.component.height,
                image: this.mapStructure.component.image,
                id: this.mapStructure.component.id,
                markers: this.mapStructure.component.markers ? this.mapStructure.component.markers.slice(0) : []
            }
        };
    }
}