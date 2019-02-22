import axios from 'axios';
import shared from './Shared';

let PoiPoint = {
    mounted() {
        let self = this;

        L.PoiPoint = L.Marker.extend({
            ...shared, ...{
                initialize(location) {
                    this.location = location;

                    let coordinates = location.coordinates || self.map.getCenter();

                    let options = {
                        draggable: true,
                        icon: this.getIcon()
                    };

                    L.Marker.prototype.initialize.call(this, coordinates, options);

                    this.activateEventListeners();
                },
                activateEventListeners() {
                    this.on('dragend', this.dragEndHandler);
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
                },
                dragEndHandler() {
                    this.save();
                },
                getIcon() {
                    return new L.Icon({
                        iconUrl: this.location.poi.icon,
                        iconSize: [20, 20]
                    });
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
                    console.log('Undoing', 'poi point');
                },
                cancel() {
                    console.log('Cancelling', 'poi point');
                },
                getCoordinates() {
                    return this.getLatLng();
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

export default PoiPoint;