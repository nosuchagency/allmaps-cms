<template>
    <el-card class="box-card">
        <template slot="header">
            <slot name="header"></slot>
        </template>
        <el-table :data="items"
                  row-key="id"
                  fit
                  size="small"
                  @row-click="$emit('row-clicked', $event)"
                  style="width: 100%">
            <el-table-column class="drag-handle"
                             align="center"
                             label="Sort"
                             width="80">
                <template slot-scope="scope">
                    <i class="fa fa-arrows-alt drag-handle"
                       style="cursor: pointer">
                    </i>
                </template>
            </el-table-column>
            <slot name="table-columns"></slot>
        </el-table>
    </el-card>
</template>

<script>
    import Sortable from 'sortablejs';

    export default {
        props: {
            items: Array
        },
        data() {
            return {
                list: null,
                sortable: null
            };
        },
        mounted() {
            this.list = this.items;
            this.$nextTick(() => {
                this.setSort();
            });
        },
        methods: {
            setSort() {
                const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
                this.sortable = Sortable.create(el, {
                    ghostClass: 'sortable-ghost',
                    handle: '.drag-handle',
                    setData: function (dataTransfer) {
                        dataTransfer.setData('Text', '');
                        // to avoid Firefox bug
                        // Detail see : https://github.com/RubaXa/Sortable/issues/1012
                    },
                    onEnd: evt => {
                        const targetRow = this.list.splice(evt.oldIndex, 1)[0];
                        this.list.splice(evt.newIndex, 0, targetRow);
                        this.$emit('reorder', this.list.map(v => v.id));
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>
