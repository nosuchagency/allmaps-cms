<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     status-icon
                     label-width="120px">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Role" name="role">
                        <br>
                        <el-form-item :label="$t('roles.attributes.name')"
                                      :class="{'is-error' : has('name')}">
                            <el-input v-model="form.name">
                            </el-input>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
            <span slot="footer">
                <el-button v-if="item"
                           type="text"
                           size="small"
                           class="btn-remove"
                           @click="removeItem">
                    Delete
                </el-button>
                <el-button type="text"
                           size="small"
                           @click="closeModal">
                    Cancel
                </el-button>
                <el-button type="primary"
                           size="small"
                           @click="item ? updateItem() : createItem()"
                           :loading="creating || updating || deleting">
                    Confirm
                </el-button>
            </span>
        </el-dialog>
    </portal>
</template>

<script>
    import form from 'js/mixins/form';
    import resource from 'js/mixins/resource';

    export default {
        mixins: [form, resource],
        props: {
            visible: Boolean,
            item: Object
        },
        data() {
            return {
                currentTab: 'role',
                resource: 'roles',
                form: {
                    name: this.item ? this.item.name : ''
                }
            }
        },
        methods: {
            async createItem() {
                try {
                    this.forget();
                    const item = await this.create();
                    this.$emit('upsert-modal:add', item)
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                }
            },
            async updateItem() {
                try {
                    this.forget();
                    const item = await this.update();
                    this.$emit('upsert-modal:update', item)
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                }
            },
            async removeItem() {
                try {
                    this.forget();
                    const item = await this.remove();
                    this.$emit('upsert-modal:remove', item)
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                }
            },
            async fetch() {
            },
            closeModal() {
                this.$emit('upsert-modal:close');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-dialog {
        /deep/ &__header {
            display: none;
        }

        /deep/ &__footer {
            padding: 20px;
            border-top: 1px solid #dfdfdf;
        }

        .btn-remove {
            float: left;
            color: #FF0000;

            &:hover {
                color: #990000;
            }
        }
    }
</style>