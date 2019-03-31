<script>
    export default {
        props: {
            url: String
        },
        data() {
            return {
                items: [],
                loading: false
            };
        },
        created() {
            this.fetch();
        },
        methods: {
            async fetch() {
                try {
                    this.loading = true;
                    const {data} = await this.$axios.get(this.url);
                    this.items = data;
                } catch (error) {
                    console.log(error);
                } finally {
                    this.loading = false;
                }
            }
        },
        render() {
            return this.$scopedSlots.default({
                items: this.items,
                loading: this.loading
            });
        }
    };
</script>