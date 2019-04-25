<template>
    <div id="map"></div>
</template>

<script>
    export default {
        props: {
            latitude: Number,
            longitude: Number
        },
        data() {
            return {
                map: null,
                mapId: null,
                marker: null
            }
        },
        mounted() {
            this.mapId = this.generateMapId();

            setTimeout(() => {
                this.setupMap();
            }, 1);
        },
        methods: {
            setupMap() {
                this.map = new L.Map('map', {
                    center: new L.LatLng(this.latitude, this.longitude),
                    scrollWheelZoom: false,
                    zoom: 19
                });

                this.map.on('focus', this.enableScrollZoom);
                this.map.on('blur', this.disableScrollZoom);

                let icon = L.icon({
                    iconUrl: '/img/bullseye.png',
                    iconSize: [20, 20]
                });

                this.marker = new L.Marker({lat: this.latitude, lng: this.longitude}, {icon})
                    .addTo(this.map)
                    .bindPopup('Latitude: ' + this.latitude + '<br>' + 'Longitude: ' + this.longitude);

                L.gridLayer
                    .googleMutant({
                        type: 'roadmap'
                    })
                    .addTo(this.map);

                this.map.zoomControl.setPosition('bottomleft');

                L.easyButton('fa-compress-arrows-alt', (btn, map) => {
                    map.flyTo(new L.LatLng(this.latitude, this.longitude), 19)
                }, 'Reposition Map', {
                    position: 'bottomleft'
                }).addTo(this.map);
            },
            enableScrollZoom() {
                this.map.scrollWheelZoom.enable();
            },
            disableScrollZoom() {
                this.map.scrollWheelZoom.disable();
            },
            generateMapId() {
                return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            }
        }
    }
</script>

<style lang="scss" scoped>
    #map {
        height: 400px;
        width: 100%;
    }
</style>