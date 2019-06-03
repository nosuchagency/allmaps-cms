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

            L.gridLayer
                .googleMutant({
                    type: 'roadmap'
                })
                .addTo(this.map);
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
