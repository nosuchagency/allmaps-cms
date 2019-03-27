<template>
    <el-form :model="fields"
             status-icon
             label-width="120px"
             @keydown.native="form.errors.clear($event.target.name)">
        <el-tabs v-model="currentTab">
            <el-tab-pane label="Text" name="text">
                <br>
                <el-form-item label="Title"
                              :class="{'is-error' : form.errors.has('title')}">
                    <el-input v-model="fields.title">
                    </el-input>
                </el-form-item>
                <el-form-item label="Text"
                              :class="{'is-error' : form.errors.has('text')}">
                    <el-input type="textarea"
                              v-model="fields.text"
                              :rows="3">
                    </el-input>
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
    export default {
        props: {
            item: Object,
            form: Object
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
                    title: this.item ? this.item.title : '',
                    text: this.item ? this.item.text : '',
                    category: this.item ? this.item.category : '',
                    tags: this.item ? this.item.tags : []
                };
            },
            syncFields() {
                this.$emit('sync-fields', this.fields);
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
