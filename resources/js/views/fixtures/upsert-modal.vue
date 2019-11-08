<template>
    <modal :visible="visible"
           @modal:close="closeModal">
        <el-form :model="form"
                 label-width="140px"
                 @keydown.native="form.errors.clear($event.target.name)">
            <el-tabs v-model="currentTab">
                <el-tab-pane label="Fixture" name="fixture">
                    <br>
                    <el-form-item :label="$t('fixtures.attributes.name')"
                                  :class="{'is-error' : form.errors.has('name')}">
                        <el-input v-model="form.name" autofocus></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('fixtures.attributes.description')"
                                  :class="{'is-error' : form.errors.has('description')}">
                        <el-input v-model="form.description"
                                  type="textarea"
                                  :rows="3">
                        </el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="Image" name="image">
                    <br>
                    <el-form-item :label="$t('fixtures.attributes.image')"
                                  :class="{'is-error' : form.errors.has('image')}">
                        <image-uploader :images="image"
                                        @image:added="form.image = $event"
                                        @image:removed="form.image = null">
                        </image-uploader>
                    </el-form-item>
                    <el-form-item :label="$t('fixtures.attributes.image_width')"
                                  :class="{'is-error' : form.errors.has('image_width')}">
                        <el-input-number v-model="form.image_width"
                                         :min="0">
                        </el-input-number>
                    </el-form-item>
                    <el-form-item :label="$t('fixtures.attributes.image_height')"
                                  :class="{'is-error' : form.errors.has('image_height')}">
                        <el-input-number v-model="form.image_height"
                                         :min="0">
                        </el-input-number>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="Taxonomy" name="taxonomies">
                    <br>
                    <el-form-item :label="$t('fixtures.attributes.category')"
                                  :class="{'is-error' : form.errors.has('category')}">
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
                    <el-form-item :label="$t('fixtures.attributes.tags')"
                                  :class="{'is-error' : form.errors.has('tags')}">
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
        props: {
            visible: Boolean,
            item: Object
        },
        components: {
            imageUploader
        },
        data() {
            return {
                currentTab: 'fixture',
                resource: 'fixtures',
                confirmDelete: false,
                form: new Form({
                    name: this.item ? this.item.name : '',
                    description: this.item ? this.item.description : '',
                    image: this.item ? this.item.image : '',
                    image_width: this.item ? this.item.image_width : 0,
                    image_height: this.item ? this.item.image_height : 0,
                    category: this.item ? this.item.category : '',
                    tags: this.item ? this.item.tags : [],
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
