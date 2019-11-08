<template>
    <modal :visible="visible"
           @modal:close="closeModal">
        <el-form :model="form"
                 label-width="140px"
                 @keydown.native="form.errors.clear($event.target.name)">
            <el-tabs v-model="currentTab">
                <el-tab-pane label="Building" name="building">
                    <br>
                    <el-form-item :label="$t('buildings.attributes.name')"
                                  :class="{'is-error' : form.errors.has('name')}">
                        <el-input v-model="form.name" autofocus></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="Image" name="image">
                    <br>
                    <el-form-item :label="$t('buildings.attributes.image')"
                                  :class="{'is-error' : form.errors.has('image')}">
                        <image-uploader :images="image"
                                        @image:added="form.image = $event"
                                        @image:removed="form.image = null">
                        </image-uploader>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="Menu" name="menu">
                    <br>
                    <el-form-item :label="$t('buildings.attributes.menu')"
                                  :class="{'is-error' : form.errors.has('menu')}">
                        <fetch-items url="/menus">
                            <el-select v-model="form.menu"
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
                </el-tab-pane>
            </el-tabs>
        </el-form>
        <span slot="footer">
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
            <el-button type="text"
                       size="small"
                       class="btn-cancel"
                       @click="closeModal">
                Cancel
            </el-button>
            <el-button type="success"
                       size="small"
                       :loading="form.busy"
                       @click="item ? update() : create()">
                Confirm
            </el-button>
        </span>
    </modal>
</template>

<script>
    import Form from '../../utils/Form';
    import imageUploader from 'js/components/image-uploader';

    export default {
        components: {
            imageUploader
        },
        props: {
            visible: Boolean,
            place: Object,
            item: Object
        },
        data() {
            return {
                currentTab: 'building',
                resource: 'buildings',
                confirmDelete: false,
                form: new Form({
                    name: this.item ? this.item.name : '',
                    image: this.item ? this.item.image : '',
                    menu: this.item ? this.item.menu : null,
                    place: this.place,
                }),
                image: this.item && this.item.image ? [{source: this.item.image, options: {type: 'local'}}] : [],
            }
        },
        methods: {
            create() {
                this.form.post(`/${this.resource}`)
                    .then(response => this.$emit('modal:add', response))
                    .catch(error => console.log(error));
            },
            update() {
                this.form.put(`/${this.resource}/${this.item.id}`)
                    .then(response => this.$emit('modal:update', response))
                    .catch(error => console.log(error));
            },
            remove() {
                this.form.delete(`/${this.resource}/${this.item.id}`)
                    .then(response => this.$emit('modal:remove', this.item))
                    .catch(error => console.log(error));
            },
            closeModal() {
                this.$emit('modal:close');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
