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
                        text: 'Contents'
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
                    labels: ['Web', 'Image', 'Video', 'File', 'Gallery', 'Text'],
                    datasets: [
                        {
                            backgroundColor: [
                                '#41B883',
                                '#E46651',
                                '#00D8FF',
                                '#DD1B16',
                                '#e5e500',
                                '#7647a2'
                            ],
                            data: [
                                this.item ? sumBy(this.item.contents, ({type}) => type === 'web') : 0,
                                this.item ? sumBy(this.item.contents, ({type}) => type === 'image') : 0,
                                this.item ? sumBy(this.item.contents, ({type}) => type === 'video') : 0,
                                this.item ? sumBy(this.item.contents, ({type}) => type === 'file') : 0,
                                this.item ? sumBy(this.item.contents, ({type}) => type === 'gallery') : 0,
                                this.item ? sumBy(this.item.contents, ({type}) => type === 'text') : 0
                            ]
                        }
                    ]
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
