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
                    const response = await this.$axios.get(this.url);
                    this.items = response.data;
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