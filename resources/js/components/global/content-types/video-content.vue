<template>
    <el-form :model="fields"
             status-icon
             label-width="120px"
             @keydown.native="form.errors.clear($event.target.name)">
        <el-tabs v-model="currentTab">
            <el-tab-pane label="Video" name="video">
                <el-form-item label="Name"
                              :class="{'is-error' : form.errors.has('name')}">
                    <el-input v-model="fields.name">
                    </el-input>
                </el-form-item>
                <el-form-item label="YouTube URL"
                              :class="{'is-error' : form.errors.has('yt_url')}">
                    <el-input v-model="fields.yt_url">
                    </el-input>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="Taxonomy" name="taxonomies">
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
                currentTab: 'video',
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
                    yt_url: this.item ? this.item.yt_url : '',
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
