<template>
    <el-form :model="fields"
             label-width="120px"
             @keydown.native="form.errors.clear($event.target.name)">
        <el-tabs v-model="currentTab">
            <el-tab-pane label="Text" name="text">
                <br>
                <el-form-item label="Name"
                              :class="{'is-error' : form.errors.has('name')}">
                    <el-input v-model="fields.name">
                    </el-input>
                </el-form-item>
                <el-form-item label="Text"
                              :class="{'is-error' : form.errors.has('text')}">
                    <VueTrix v-model="fields.text" placeholder="enter your content..."/>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="Taxonomy" name="taxonomies">
                <br>
                <el-form-item :label="$t('places.attributes.category')"
                              :class="{'is-error' : form.errors.has('category')}">
                    <fetch-items url="/categories">
                        <el-select v-model="fields.category"
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
                <el-form-item :label="$t('beacons.attributes.tags')"
                              :class="{'is-error' : form.errors.has('tags')}">
                    <fetch-items url="/tags">
                        <el-select v-model="fields.tags"
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
</template>

<script>
    import VueTrix from "vue-trix";

    export default {
        components: {
            VueTrix
        },
        props: {
            item: Object,
            form: Object,
            folder: Object
        },
        data() {
            return {
                fields: this.getFields(),
                currentTab: 'text',
            };
        },
        watch: {
            fields: {
                handler(fields) {
                    this.syncFields();
                },
                deep: true
            }
        },
        mounted() {
            this.fields = this.getFields();
            this.syncFields();
        },
        methods: {
            getFields() {
                return {
                    name: this.item ? this.item.name : '',
                    type: 'text',
                    text: this.item ? this.item.text : '',
                    category: this.item ? this.item.category : '',
                    tags: this.item ? this.item.tags : [],
                    folder: this.folder
                };
            },
            syncFields() {
                this.$emit('sync-fields', this.fields);
            }
        }
    };
</script>

<style lang="scss" scoped>
    /deep/ .trix-button-group--file-tools {
        display: none;
    }
</style>
