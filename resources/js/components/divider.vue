<template>
    <div class="divider"
         :style="styles">
    </div>
</template>

<script>
    export default {
        props: {
            width: {
                type: Number,
                default: 100
            },
            lineHeight: {
                type: Number,
                default: 1
            },
            lineType: {
                type: String,
                default: 'solid'
            },
            lineColor: {
                type: String,
                default: '#dcdcdc'
            },
        },
        computed: {
            styles() {
                return {
                    width: this.width + '%',
                    'border-top': `${this.lineHeight}px ${this.lineType} ${this.lineColor}`
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .divider {
        margin: 15px 0 5px 0;
    }
</style>