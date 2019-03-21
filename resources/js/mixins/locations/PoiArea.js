import axios from 'axios';
import shared from './Shared';

let PoiArea = {
    mounted() {
        let self = this;

        L.PoiArea = L.Polygon.extend({
            ...shared, ...{
                initialize(location) {
                    this.location = location;
                    this.unsavedChanges = false;

                    L.Polygon.prototype.initialize.call(this, this.location.coordinates || [], location.poi);

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
                    if (!self.currentLocation) {
                        L.DomEvent.stopPropagation(e);
                        self.startEditing(e.target);
                    }
                },
                click(latlng) {
                    self.addMarker(latlng);
                    this.addLatLng(latlng);
                },
                async save() {
                    try {
                        let coordinates = this.getCoordinates();
                        const {data: location} = await axios.put(self.url + '/locations/' + this.location.id, {coordinates});
                        this.location = location;
                    } catch (error) {
                        console.log(error);
                    }
                },
                async remove() {
                    try {
                        await axios.delete(self.url + '/locations/' + this.location.id);
                    } catch (error) {
                        console.log(error);
                    }
                },
                undo() {
                    console.log('Undoing', 'poi area');
                },
                cancel() {
                    console.log('Cancelling', 'poi area');
                },
                getCoordinates() {
                    return this.getLatLngs();
                },
                addMarkers() {
                    this.getLatLngs()[0].forEach(self.addMarker);
                },
                isArea() {
                    return true;
                }
            }
        });
    }
};

export default PoiArea;