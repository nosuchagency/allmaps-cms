import axios from 'axios';
import shared from './Shared';

let Circle = {
    mounted() {
        let self = this;

        L.CircleComponent = L.Circle.extend({
            ...shared, ...{
                initialize(structure, readonly = false) {
                    this.structure = structure;
                    this.readonly = readonly;

                    let coordinates = this.structure.coordinates || self.map.getCenter();

                    L.Circle.prototype.initialize.call(this, coordinates, structure.component);

                    this.setRadius(this.structure.radius || 5);

                    this.activateEventListeners();
                },
                activateEventListeners() {
                    this.on('click', this.componentClicked);
                },
                startEditing() {
                },
                stopEditing() {
                },
                componentClicked(e) {
                    if (!self.currentStructure && !this.readonly) {
                        L.DomEvent.stopPropagation(e);
                        self.startEditing(e.target);
                    }
                },
                click(latlng) {
                    let destination = this.getLatLng();

                    let radius = Math.round(latlng.distanceTo(destination) * 100) / 100;

                    this.setRadius(radius);
                    this.setStyle({radius});
                },
                async save() {
                    try {
                        let coordinates = this.getCoordinates();
                        let url = self.url + '/structures/' + this.structure.id;
                        const {data: structure} = await axios.put(url, {coordinates, radius: this.getRadius()});
                        this.structure = structure;
                    } catch (error) {
                        console.log(error);
                    }
                },
                async remove() {
                    try {
                        await axios.delete(self.url + '/structures/' + this.structure.id);
                    } catch (error) {
                        console.log(error);
                    }
                },
                undo() {
                    console.log('Undoing', 'circle');
                },
                cancel() {
                    console.log('Cancelling', 'circle');
                },
                getCoordinates() {
                    return this.getLatLng();
                },
                getDestination() {
                    return this.getLatLng();
                },
                addMarkers() {
                    self.addMarker(this.getLatLng());
                }
            }
        });
    }
};

export default Circle;