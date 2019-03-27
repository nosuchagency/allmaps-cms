<script>
    export default {
        props: ['item', 'type', 'form'],
        render(createElement) {
            return createElement(this.type + '-content', {
                props: {
                    item: this.item,
                    form: this.form
                },
                on: {
                    'sync-fields': (value) => this.$emit('sync-fields', value)
                }
            })
        }
    }
</script>
