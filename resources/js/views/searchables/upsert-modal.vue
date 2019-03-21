<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     status-icon
                     label-width="120px">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Findable" name="findable">
                        <br>
                        <el-form-item :label="$t('searchables.attributes.name')"
                                      :class="{'is-error' : has('name')}">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Taxonomy" name="taxonomies">
                        <br>
                        <el-form-item :label="$t('searchables.attributes.category')"
                                      :class="{'is-error' : has('category')}">
                            <fetch-items url="/categories">
                                <el-select v-model="form.category"
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
                        <el-form-item :label="$t('searchables.attributes.tags')"
                                      :class="{'is-error' : has('tags')}">
                            <fetch-items url="/tags">
                                <el-select v-model="form.tags"
                                           slot-scope="{items, loading}"
                                           placeholder="Select"
                                           multiple
                                           value-key="id">
                                    <el-option v-for="item in items"
                                               :key="item.id"
                                               :label="item.name"
                                               :value="item">
                                    </el-option>
                                </el-select>
                            </fetch-items>
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
                           class="btn-cancel"
                           @click="closeModal">
                    Cancel
                </el-button>
                <el-button type="success"
                           size="small"
                           @click="item ? updateItem() : createItem()"
                           :loading="creating || updating">
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
                currentTab: 'searchable',
                resource: 'searchables',
                form: {
                    name: this.item ? this.item.name : '',
                    category: this.item ? this.item.category : '',
                    tags: this.item ? this.item.tags : []
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
                    await this.remove();
                    this.$emit('upsert-modal:remove', this.item)
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

</style>