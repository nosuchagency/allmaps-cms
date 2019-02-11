<template>
    <div :id="mapId"
         class="map"
         :class="{'is-interactive' : interactive}">
    </div>
</template>

<script>
    export default {
        props: {
            lat: Number,
            lng: Number,
            markerPopupContent: String,
            interactive: Boolean
        },
        data() {
            return {
                map: null,
                mapId: null
            }
        },
        mounted() {
            this.mapId = this.generateMapId();

            setTimeout(() => {
                this.setupMap();
            }, 1);
        },
        watch: {
            lat(lat) {
                let latlng = L.latLng(lat, this.lng);
                this.setLocation({latlng});
                this.map.panTo(latlng);
            },
            markerPopupContent(content) {
                if (this.markerPopupContent) {
                    this.setPopupContent(content);
                }
            }
        },
        methods: {
            setupMap() {
                this.map = new L.Map(this.mapId, {
                    center: new L.LatLng(this.lat, this.lng),
                    scrollWheelZoom: false,
                    zoom: 14
                });

                this.map.on('focus', this.enableScrollZoom);
                this.map.on('blur', this.disableScrollZoom);

                this.marker = new L.Marker({lat: this.lat, lng: this.lng})
                    .addTo(this.map);

                if (this.markerPopupContent) {
                    this.setPopupContent(this.markerPopupContent);
                }

                L.gridLayer
                    .googleMutant({type: 'roadmap'})
                    .addTo(this.map);

                this.map.zoomControl.setPosition('bottomleft');

                if (this.interactive) {
                    this.enableInteractivity();
                }
            },
            enableInteractivity() {
                this.map
                    .on('click', this.setLocation);

                this.marker.dragging.enable();

                this.marker
                    .on('drag', this.markerDrag)
                    .on('dragend', this.markerDragEnd);
            },
            enableScrollZoom() {
                this.map.scrollWheelZoom.enable();
            },
            disableScrollZoom() {
                this.map.scrollWheelZoom.disable();
            },
            setPopupContent(content) {
                this.marker.bindPopup(content, {maxWidth: 560});
            },
            setLocation(event) {
                let latLng = event.latlng;
                this.marker.setLatLng(latLng);
                this.$emit('map:selection', {lat: latLng.lat, lng: latLng.lng});
            },
            markerDrag(event) {
                this.marker.setLatLng(event.latlng);
            },
            markerDragEnd(event) {
                let latLng = event.target.getLatLng();
                this.marker.setLatLng(latLng);
                this.$emit('map:selection', {lat: latLng.lat, lng: latLng.lng});
            },
            generateMapId() {
                return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .map {
        height: 300px;
        width: 100%;

        &.is-interactive {
            cursor: crosshair;
        }
    }
</style>