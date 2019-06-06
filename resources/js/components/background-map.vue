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

            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidmljdG9yLWVtaWwiLCJhIjoiY2p2bnEwNGF5MWt4cjQ4bno5M2lrbnR5MiJ9.lI1yQnR0jvfZo-oLwfLKWQ', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
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
