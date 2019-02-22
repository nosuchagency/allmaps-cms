import axios from 'axios';
import shared from './Shared';

let Polygon = {
    mounted() {
        let self = this;

        L.PolygonComponent = L.Polygon.extend({
            ...shared, ...{
                initialize(mapStructure, readonly = false) {
                    this.mapStructure = mapStructure;
                    this.readonly = readonly;

                    L.Polygon.prototype.initialize.call(this, this.mapStructure.coordinates || [], mapStructure.component);

                    this.activateEventListeners();
                    this.initializeFeature();
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

                    let points = this.feature.properties.markers;
                    points.push([latlng.lat, latlng.lng]);

                    if (this.getCurved() && points.length > 1) {
                        let polyline = this.bezierSpline(points);

                        this.setLatLngs(polyline);
                        this.feature.properties.markers = points;
                    } else if (this.getCurved() && points.length <= 1) {
                        this.addLatLng(latlng);
                        this.feature.properties.markers = points;
                    } else {
                        this.addLatLng(latlng);
                    }
                },
                async save() {
                    try {
                        let coordinates = this.getCoordinates();
                        let url = self.url + '/structures/' + this.mapStructure.id;
                        const {data: structure} = await axios.put(url, {coordinates});
                        this.mapStructure = structure;
                    } catch (error) {
                        console.log(error);
                    }
                },
                async remove() {
                    try {
                        await axios.delete(self.url + '/structures/' + this.mapStructure.id);
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
                    if (this.getCurved()) {
                        this.feature.properties.markers.forEach(self.addMarker);
                    } else {
                        this.getLatLngs()[0].forEach(self.addMarker);
                    }
                },
                bezierSpline(coordinates) {
                    let line = turf.lineString(coordinates);
                    let curved = turf.bezierSpline(line);

                    return curved.geometry.coordinates;
                }
            }
        });
    }
};

export default Polygon;