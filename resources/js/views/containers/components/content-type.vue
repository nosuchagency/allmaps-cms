<script>
    export default {
        props: ['item', 'type', 'form', 'folder'],
        render(createElement) {
            return createElement(this.type + '-content', {
                props: {
                    item: this.item,
                    form: this.form,
                    folder: this.folder
                },
                on: {
                    'sync-fields': (value) => this.$emit('sync-fields', value)
                }
            })
        }
    }
</script>
