<script>
    export default {
        props: ['item', 'type', 'errors'],
        render(createElement) {
            return createElement(this.type + '-content', {
                props: {
                    item: this.item,
                    inputErrors: this.errors
                },
                on: {
                    'sync-form': (value) => this.$emit('sync-form', value)
                }
            })
        }
    }
</script>
