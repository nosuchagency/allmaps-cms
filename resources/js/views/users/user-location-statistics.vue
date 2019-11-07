<template>
    <pie-chart :chart-data="pieChartData"
               :options="options"
               :styles="styles">
    </pie-chart>
</template>

<script>
    import sumBy from 'lodash/sumBy';
    import pieChart from 'js/components/charts/PieChart';

    export default {
        props: {
            item: Object
        },
        components: {
            pieChart,
        },
        computed: {
            options() {
                return {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        position: 'right'
                    },
                    title: {
                        display: true,
                        position: 'top',
                        text: 'Map Locations'
                    }
                };
            },
            styles() {
                return {
                    width: '100%',
                    height: '250px',
                    position: 'relative'
                };
            },
            pieChartData() {
                return {
                    labels: ['Beacon', 'Poi', 'Fixture'],
                    datasets: [
                        {
                            backgroundColor: [
                                '#41B883',
                                '#E46651',
                                '#00D8FF',
                            ],
                            data: [
                                this.item ? sumBy(this.item.locations, ({type}) => type === 'beacon') : 0,
                                this.item ? sumBy(this.item.locations, ({type}) => type === 'poi') : 0,
                                this.item ? sumBy(this.item.locations, ({type}) => type === 'fixture') : 0,
                            ]
                        }
                    ]
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
