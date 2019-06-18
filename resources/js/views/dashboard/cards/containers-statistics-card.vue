<template>
    <el-card>
        <template slot="header">
            <div class="header">
                <div class="title-icon-wrapper">
                    <i class="fa fa-archive title-icon"></i>
                    <label>Content</label>
                </div>
                <el-tooltip effect="dark"
                            :content="$t('general.actions.create', {name : $t('containers.singular')})"
                            placement="top-start"
                            v-if="$auth.user().hasPermissionTo('containers.create')">
                    <el-button type="primary"
                               size="small"
                               @click="openUpsertModal()"
                               circle
                               style="margin-left: auto">
                        <i class="fa fa-plus"></i>
                    </el-button>
                </el-tooltip>
            </div>
        </template>
        <template v-if="loading">
            <div class="loading-container">
                <i class="fa fa-cog fa-spin loading-spinner"
                   v-if="loading">
                </i>
            </div>
        </template>
        <template v-else>
            <div style="margin-bottom: 15px;">
                There are
                <router-link :to="{name : 'containers-index'}"> {{containerCount}} pieces of content</router-link>
                with {{beaconCount}} beacons, and {{ruleCount}} rules attached.
            </div>
            <br>
        </template>
        <upsert-modal v-if="upsertModalVisible"
                      :visible="upsertModalVisible"
                      @upsert-modal:close="closeUpsertModal"
                      @upsert-modal:add="addItem">
        </upsert-modal>
    </el-card>
</template>

<script>
    import upsertModal from 'js/views/containers/upsert-modal';
    import sumBy from 'lodash/sumBy';

    export default {
        components: {
            upsertModal
        },
        data() {
            return {
                upsertModalVisible: false,
                loading: false,
                items: null
            }
        },
        created() {
            this.getItems();
        },
        methods: {
            async getItems() {
                try {
                    this.loading = true;
                    const {data} = await this.$axios.get('/containers?include=beacons');
                    this.items = data;
                } catch (error) {
                    console.log(error);
                } finally {
                    this.loading = false;
                }
            },
            addItem(item) {
                this.$router.push(`/containers/${item.id}`);
            },
            openUpsertModal() {
                this.upsertModalVisible = true;
            },
            closeUpsertModal() {
                this.upsertModalVisible = false;
            },
        },
        computed: {
            containerCount() {
                return this.items.length;
            },
            beaconCount() {
                return this.sumUp(this.items, ({beacons}) => beacons.length);
            },
            ruleCount() {
                return this.sumUp(this.items, ({beacons}) => this.sumUp(beacons, ({rules}) => rules.length));
            },
            sumUp() {
                return sumBy;
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
