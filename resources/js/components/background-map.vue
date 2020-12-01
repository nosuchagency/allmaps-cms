<template>
    <div id="map"></div>
</template>

<script>
    export default {
        data() {
            return {
                map: null
            }
        },
        mounted() {
            this.map = new L.Map('map', {
                center: new L.LatLng(55.669712, 12.532526),
                zoom: 18,
                zoomControl: false
            });

            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
                tileSize: 512,
                maxZoom: 30,
                zoomOffset: -1,
                id: 'mapbox/streets-v11',
                accessToken: 'pk.eyJ1IjoidmljdG9yLWVtaWwiLCJhIjoiY2p2bnEwNGF5MWt4cjQ4bno5M2lrbnR5MiJ9.lI1yQnR0jvfZo-oLwfLKWQ'
            }).addTo(this.map);

            // L.gridLayer
            //     .googleMutant({
            //         type: 'roadmap'
            //     })
            //     .addTo(this.map);
        },
    }
</script>

<style lang="scss" scoped>
    #map {
        height: 100%;
        width: 100%;
        position: absolute;
    }
</style>
