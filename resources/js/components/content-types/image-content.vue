<template>
    <el-form :model="form">
        <el-tabs v-model="currentTab">
            <el-tab-pane label="Image" name="image">
                <el-form-item label="Title"
                              :class="{'is-error' : has('title')}">
                    <el-input v-model="form.title"
                              @input="syncForm">
                    </el-input>
                </el-form-item>
                <image-upload @image-uploaded="setImage"
                              @image-removed="setImage"
                              :image="form.image">
                </image-upload>
            </el-tab-pane>
            <el-tab-pane label="Taxonomy" name="taxonomies">
                <el-form-item :label="$t('places.attributes.category')"
                              :class="{'is-error' : has('category')}">
                    <fetch-items url="/categories">
                        <el-select v-model="form.category"
                                   slot-scope="{items, loading}"
                                   placeholder="Select"
                                   clearable
                                   @change="syncForm"
                                   value-key="id">
                            <el-option v-for="item in items"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item">
                            </el-option>
                        </el-select>
                    </fetch-items>
                </el-form-item>
                <el-form-item :label="$t('beacons.attributes.tags')"
                              :class="{'is-error' : has('tags')}">
                    <fetch-items url="/tags">
                        <el-select v-model="form.tags"
                                   slot-scope="{items, loading}"
                                   placeholder="Select"
                                   multiple
                                   @change="syncForm"
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
</template>

<script>
    import imageUpload from 'js/components/image-upload';
    import form from 'js/mixins/form';

    export default {
        mixins: [form],
        components: {
            imageUpload
        },
        props: {
            item: {
                default: null,
                type: Object
            },
            inputErrors: {
                type: Object
            }
        },
        data() {
            return {
                form: this.getForm(),
                currentTab: 'image',
            };
        },
        watch: {
            inputErrors(errors) {
                this.errors = errors;
            }
        },
        mounted() {
            this.form = this.getForm();
            this.syncForm();
        },
        methods: {
            getForm() {
                return {
                    title: this.item ? this.item.title : '',
                    image: this.item ? this.item.image : null,
                    category: this.item ? this.item.category : '',
                    tags: this.item ? this.item.tags : []
                };
            },
            setImage(image = null) {
                this.form.image = image;
            },
            syncForm() {
                this.$emit('sync-form', this.form);
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
