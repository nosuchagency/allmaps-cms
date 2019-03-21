<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal"
                   width="60%">
            <el-form :model="form"
                     status-icon
                     label-width="120px">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Structure" name="structure">
                        <br>
                        <el-form-item :label="$t('structures.attributes.name')"
                                      :class="{'is-error' : has('name')}">
                            <el-input v-model="form.name" autofocus></el-input>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
            <span slot="footer">
                <el-button type="text"
                           size="small"
                           class="btn-remove"
                           @click="removeItem">
                    Delete
                </el-button>
                <el-button type="text"
                           size="small"
                           class="btn-cancel"
                           @click="closeModal">
                    Cancel
                </el-button>
                <el-button type="success"
                           size="small"
                           :loading="busy"
                           @click="updateItem">
                    Confirm
                </el-button>
            </span>
        </el-dialog>
    </portal>
</template>

<script>
    import form from 'js/mixins/form';

    export default {
        mixins: [form],
        props: {
            visible: Boolean,
            structure: Object,
            url: String
        },
        data() {
            return {
                currentTab: 'structure',
                form: {
                    name: this.structure.name,
                }
            }
        },
        methods: {
            async updateItem() {
                this.startProcessing();

                try {
                    const {data: structure} = await this.$axios.put(this.url + '/structures/' + this.structure.id, this.form);
                    this.$emit('structure-modal:update', structure);
                    this.closeModal();
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                } finally {
                    this.finishProcessing();
                }
            },
            async removeItem() {
                try {

                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                }
            },
            closeModal() {
                this.$emit('structure-modal:close');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>