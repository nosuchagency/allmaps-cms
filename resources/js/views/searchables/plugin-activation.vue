<template>
    <div class="plugin-activation">
        <el-switch v-model="activated"
                   @input="togglePlugin">
        </el-switch>
    </div>
</template>

<script>
    export default {
        props: {
            plugin: Object
        },
        data() {
            return {
                activated: this.plugin.activated,
                processing: false
            }
        },
        methods: {
            async togglePlugin() {
                this.processing = true;

                try {
                    await this.$axios.put('/searchables/' + this.plugin.id, {activated: this.activated});

                    this.$emit('searchables:refetch');
                } catch (error) {
                    console.log(error);
                } finally {
                    this.processing = false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>