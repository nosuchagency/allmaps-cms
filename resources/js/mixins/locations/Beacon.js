import axios from 'axios';
import shared from './Shared';

let Beacon = {
    mounted() {
        let self = this;

        L.Beacon = L.Marker.extend({
            ...shared, ...{
                initialize(location) {
                    this.location = location;

                    let coordinates = location.coordinates || self.map.getCenter();

                    L.Marker.prototype.initialize.call(this, coordinates, {
                        icon: this.getIcon()
                    });

                    this.activateEventListeners();
                },
                activateEventListeners() {
                    this.on('click', this.componentClicked);
                },
                startEditing() {
                    this.dragging.enable();
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
                },
                getIcon() {
                    return new L.Icon({
                        iconUrl: this.location.beacon.image,
                        iconSize: [20, 20]
                    });
                },
                async save() {
                    this.dragging.disable();

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
                    console.log('Undoing', 'beacon');
                },
                cancel() {
                    console.log('Cancelling', 'beacon');
                },
                getCoordinates() {
                    return this.getLatLng();
                },
                getDestination() {
                    return null;
                },
                addMarkers() {

                },
                isArea() {
                    return false;
                }
            }
        });
    }
};

export default Beacon;