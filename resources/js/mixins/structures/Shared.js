import {lineString, bezierSpline} from '@turf/turf';

export default {
    getStructure() {
        return this.structure;
    },
    getComponent() {
        return this.structure.component;
    },
    getId() {
        return this.structure.id;
    },
    getName() {
        return this.structure.name;
    },
    getCircleRadius() {
        return this.structure.radius;
    },
    getShape() {
        return this.structure.component.shape;
    },
    getType() {
        return this.structure.component.type;
    },
    getStroke() {
        return this.structure.component.stroke;
    },
    getStrokeType() {
        return this.structure.component.stroke_type;
    },
    getStrokeColor() {
        return this.structure.component.stroke_color;
    },
    getStrokeWidth() {
        return this.structure.component.stroke_width;
    },
    getStrokeOpacity() {
        return this.structure.component.stroke_opacity;
    },
    getFill() {
        return this.structure.component.fill;
    },
    getFillColor() {
        return this.structure.component.fill_color;
    },
    getFillOpacity() {
        return this.structure.component.fill_opacity;
    },
    getImage() {
        return this.structure.component.image;
    },
    getImageWidth() {
        return this.structure.component.image_width;
    },
    getImageHeight() {
        return this.structure.component.image_height;
    },
    isCurved() {
        return this.structure.component.stroke_type === 'curved';
    },
    getMarkers() {
        if (!this.structure.markers) {
            this.structure.markers = [];
        }

        return this.structure.markers;
    },
    bezierSpline(coordinates) {
        let line = lineString(coordinates.map(x => [x.lat, x.lng]));
        let curved = bezierSpline(line);

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
    },
    getAttributes() {
        return {
            radius: this.getCircleRadius(),
            stroke: this.getStroke(),
            color: this.getStrokeColor(),
            weight: this.getStrokeWidth(),
            opacity: this.getStrokeOpacity(),
            fill: this.getFill(),
            fillColor: this.getFillColor(),
            fillOpacity: this.getFillOpacity(),
            dashArray: this.getStrokeType() === 'dashed' ? '5,10' : null,
        }
    },
    getPayload() {
        return {
            coordinates: this.getCoordinates(),
            markers: this.getMarkers()
        }
    }
}
