<template>
    <div class="import-spinner-container">
        <template v-if="importing">
            <i class="fa fa-cog fa-spin loading-spinner"></i>
            Importing ...
        </template>
    </div>
</template>

<script>
    export default {
        props: {
            type: String
        },
        data() {
            return {
                importing: false
            }
        },
        created() {
            this.fetchImports();
            this.intervalId = setInterval(() => this.fetchImports(), 5000);
        },
        methods: {
            async fetchImports() {
                const {data} = await this.$axios.get(`/imports?type=${this.type}&finished=false`);
                this.importing = data.length > 0;
            }
        },
        destroyed() {
            clearInterval(this.intervalId);
        },
    }
</script>

<style lang="scss" scoped>
    .import-spinner-container {
        font-size: 14px;
        margin-right: 5px;
    }
</style>

