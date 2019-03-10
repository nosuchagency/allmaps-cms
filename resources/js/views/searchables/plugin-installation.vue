<template>
    <div class="plugin-installation">
        <el-button v-if="!plugin.installed"
                   class="button-install"
                   type="primary"
                   size="mini"
                   :loading="processing"
                   @click="installPlugin()">
            Install
        </el-button>
        <el-button v-else
                   class="button-uninstall"
                   type="danger"
                   size="mini"
                   :loading="processing"
                   @click="confirmUninstallVisible = true">
            Uninstall
        </el-button>
        <confirm-dialog v-if="confirmUninstallVisible"
                        title="Uninstall Plugin"
                        :message="$t('general.confirm')"
                        @cancel="confirmUninstallVisible = false"
                        @confirm="uninstallPlugin()"
                        :visible="confirmUninstallVisible">
        </confirm-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            plugin: Object
        },
        data() {
            return {
                processing: false,
                confirmUninstallVisible: false
            }
        },
        methods: {
            async installPlugin() {
                this.processing = true;

                try {
                    await this.$axios.post('/searchables', {name: this.plugin.name});
                    this.$emit('refetch');
                } catch (error) {
                    console.log(error);
                } finally {
                    this.processing = false;
                }
            },
            async uninstallPlugin() {
                this.processing = true;

                try {
                    await this.$axios.delete('/searchables/' + this.plugin.id);
                    this.confirmUninstallVisible = false;
                    this.$emit('refetch');
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