<template>
    <modal :visible="visible"
           @modal:close="closeModal">
        <el-form :model="form"
                 label-width="120px"
                 @keydown.native="form.errors.clear($event.target.name)">
            <el-tabs v-model="currentTab">
                <el-tab-pane label="Beacon Import" name="import">
                    <br>
                    <el-form-item label="Provider"
                                  :class="{'is-error' : form.errors.has('provider')}">
                        <el-select v-model="form.provider"
                                   placeholder="Select"
                                   value-key="id">
                            <el-option v-for="item in providers"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="API Key"
                                  :class="{'is-error' : form.errors.has('api_key')}">
                        <el-input v-model="form.api_key"></el-input>
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
                           size="small">
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
                    api_key: ''
                }),
                providers: [
                    {value: 'kontakt.io', label: 'kontakt.io'},
                    {value: 'estimote', label: 'estimote'},
                ]
            }
        },
        methods: {
            closeModal() {
                this.$emit('modal:close');
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>
