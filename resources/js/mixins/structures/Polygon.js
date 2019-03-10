import axios from 'axios';
import shared from './Shared';

let Polygon = {
    mounted() {
        let self = this;

        L.PolygonComponent = L.Polygon.extend({
            ...shared, ...{
                initialize(structure, readonly = false) {
                    this.structure = structure;
                    this.readonly = readonly;

                    L.Polygon.prototype.initialize.call(this, this.structure.coordinates || [], structure.component);

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
                    self.addMarker(latlng);

                    let points = this.getMarkers();
                    points.push(latlng);

                    if (this.getCurved() && points.length > 1) {
                        let polyline = this.bezierSpline(points);
                        this.setLatLngs(polyline);
                    } else {
                        this.addLatLng(latlng);
                    }
                },
                async save() {
                    try {
                        let coordinates = this.getCoordinates();
                        let markers = this.getMarkers();
                        let url = self.url + '/structures/' + this.structure.id;
                        const {data: structure} = await axios.put(url, {coordinates, markers});
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
                    console.log('Undoing', 'polygon');
                },
                cancel() {
                    console.log('Cancelling', 'polygon');
                },
                getCoordinates() {
                    return this.getLatLngs();
                },
                getDestination() {
                    let coords = this.getLatLngs()[0];

                    if (coords.length > 0) {
                        return coords[coords.length - 1];
                    }

                    return null;
                },
                addMarkers() {
                    this.getMarkers().forEach(self.addMarker);
                }
            }
        });
    }
};

export default Polygon;