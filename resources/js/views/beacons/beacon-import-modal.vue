<template>
    <modal :visible="visible"
           @modal:close="closeModal">
        <el-form :model="form"
                 label-width="140px"
                 @keydown.native="form.errors.clear($event.target.name)">
            <el-tabs v-model="currentTab">
                <el-tab-pane label="Beacon Import" name="import">
                    <br>
                    <el-form-item label="Provider"
                                  :class="{'is-error' : form.errors.has('provider')}">
                        <fetch-items url="/beacon-providers">
                            <el-select v-model="form.provider"
                                       slot-scope="{items, loading}"
                                       placeholder="Select"
                                       clearable
                                       value-key="id">
                                <el-option v-for="item in items"
                                           :key="item.id"
                                           :label="item.name"
                                           :value="item">
                                </el-option>
                            </el-select>
                        </fetch-items>
                    </el-form-item>
                    <el-form-item label="Override"
                                  :class="{'is-error' : form.errors.has('override')}">
                        <el-switch v-model="form.override"></el-switch>
                    </el-form-item>
                    <el-form-item label="Description"
                                  :class="{'is-error' : form.errors.has('description')}">
                        <el-input v-model="form.description"
                                  type="textarea"
                                  :rows="3">
                        </el-input>
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>
        </el-form>
        <span slot="footer">
                <el-button type="text"
                           size="small"
                           class="btn-cancel"
                           @click="closeModal">
                    Cancel
                </el-button>
                <el-button type="success"
                           size="small"
                           :loading="form.busy"
                           @click="create()">
                    Import
                </el-button>
            </span>
    </modal>
</template>

<script>
    import Form from '../../utils/Form';

    export default {
        props: {
            visible: Boolean,
        },
        data() {
            return {
                currentTab: 'import',
                form: new Form({
                    provider: null,
                    override: false,
                    description: '',
                })
            }
        },
        methods: {
            closeModal() {
                this.$emit('modal:close');
            },
            create() {
                this.form.post('/beacons/import')
                    .then(response => {
                        this.$emit('beacons:imported');
                        this.closeModal();
                    })
                    .catch(error => console.log(error));
            },
        }

    }
</script>

<style lang="scss" scoped>

</style>
