<template>
    <modal :visible="visible"
           @modal:close="closeModal">
        <el-form :model="form"
                 label-width="140px"
                 @keydown.native="form.errors.clear($event.target.name)">
            <el-tabs v-model="currentTab">
                <el-tab-pane :label="type" name="menu_item">
                    <br>
                    <el-form-item :label="$t('menu_items.attributes.name')"
                                  :class="{'is-error' : form.errors.has('name')}">
                        <el-input v-model="form.name" autofocus></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('menu_items.attributes.shown')">
                        <el-checkbox v-model="form.shown"></el-checkbox>
                    </el-form-item>
                    <template v-if="type === 'poi'">
                        <el-form-item :label="$t('menu_items.attributes.poi')"
                                      :class="{'is-error' : form.errors.has('model')}">
                            <fetch-items url="/pois">
                                <el-select v-model="form.model"
                                           slot-scope="{items, loading}"
                                           placeholder="Select"
                                           value-key="id">
                                    <el-option v-for="item in items"
                                               :key="item.id"
                                               :label="item.name"
                                               :value="item">
                                    </el-option>
                                </el-select>
                            </fetch-items>
                        </el-form-item>
                    </template>
                    <template v-if="type === 'location'">
                        <el-form-item :label="$t('menu_items.attributes.location')"
                                      :class="{'is-error' : form.errors.has('model')}">
                            <fetch-items url="/locations">
                                <el-select v-model="form.model"
                                           slot-scope="{items, loading}"
                                           placeholder="Select"
                                           value-key="id">
                                    <el-option v-for="item in items"
                                               :key="item.id"
                                               :label="item.name"
                                               :value="item">
                                    </el-option>
                                </el-select>
                            </fetch-items>
                        </el-form-item>
                    </template>
                    <template v-if="type === 'tag'">
                        <el-form-item :label="$t('menu_items.attributes.tag')"
                                      :class="{'is-error' : form.errors.has('model')}">
                            <fetch-items url="/tags">
                                <el-select v-model="form.model"
                                           slot-scope="{items, loading}"
                                           placeholder="Select"
                                           value-key="id">
                                    <el-option v-for="item in items"
                                               :key="item.id"
                                               :label="item.name"
                                               :value="item">
                                    </el-option>
                                </el-select>
                            </fetch-items>
                        </el-form-item>
                    </template>
                    <template v-if="type === 'category'">
                        <el-form-item :label="$t('menu_items.attributes.category')"
                                      :class="{'is-error' : form.errors.has('model')}">
                            <fetch-items url="/categories">
                                <el-select v-model="form.model"
                                           slot-scope="{items, loading}"
                                           placeholder="Select"
                                           value-key="id">
                                    <el-option v-for="item in items"
                                               :key="item.id"
                                               :label="item.name"
                                               :value="item">
                                    </el-option>
                                </el-select>
                            </fetch-items>
                        </el-form-item>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
            <template v-if="item">
                <el-button v-if="!confirmDelete"
                           type="text"
                           size="small"
                           class="btn-remove"
                           @click="confirmDelete = true">
                    Delete
                </el-button>
                <el-button v-else
                           type="text"
                           size="small"
                           class="btn-remove"
                           @click="remove">
                    Are you sure?
                </el-button>
            </template>
            <el-button size="small"
                       @click="closeModal()">
                Cancel
            </el-button>
            <el-button type="success"
                       size="small"
                       :loading="form.busy"
                       @click="item ? update() : create()">
                Confirm
            </el-button>
        </div>
    </modal>
</template>

<script>
    import Form from 'js/utils/Form';

    export default {
        props: {
            visible: Boolean,
            item: Object,
            type: String,
            menu: Object
        },
        data() {
            return {
                currentTab: 'menu_item',
                resource: 'menu-items',
                confirmDelete: false,
                form: new Form({
                    type: this.type,
                    name: this.item ? this.item.name : null,
                    shown: this.item ? !!this.item.shown : false,
                    model: this.item ? this.item.menuable : null,
                    menu: this.menu
                }),
            };
        },
        methods: {
            create() {
                this.form.post(`/${this.resource}`)
                    .then(response => this.$emit('menu-item-modal:add', response))
                    .catch(error => console.log(error));
            },
            update() {
                this.form.put(`/${this.resource}/${this.item.id}`)
                    .then(response => this.$emit('menu-item-modal:update', response))
                    .catch(error => console.log(error));
            },
            remove() {
                this.form.delete(`/${this.resource}/${this.item.id}`)
                    .then(response => this.$emit('menu-item-modal:remove', this.item))
                    .catch(error => console.log(error));
            },
            closeModal() {
                this.$emit('menu-item-modal:close');
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
