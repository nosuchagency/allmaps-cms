<template>
    <el-select v-model="component"
               class="component-select"
               :placeholder="type"
               size="small"
               @change="createStructure"
               :no-data-text="'No ' + type + 's'">
        <el-option
                v-for="item in components"
                :key="item.id"
                :label="item.name"
                :value="item">
            <span class="component-select-name">
                {{ item.name }}
            </span>
            <i class="fa fa-square" :style="{color : item.color, opacity : item.opacity}"></i>
            <span class="component-select-attribute">
                {{ item.curved ? 'Curved' : '' }} {{ item.shape }}
            </span>
        </el-option>
    </el-select>
</template>

<script>
    export default {
        props: {
            floor: Object,
            type: String,
            components: Array
        },
        data() {
            return {
                component: null
            }
        },
        methods: {
            async createStructure(component) {
                try {
                    this.component = null;
                    const {data} = await this.$axios.post('/structures', {
                        component: component,
                        floor: this.floor
                    });
                    this.$emit('structure:add', data);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .component-select {
        width: 20%;
        margin-right: 7px;

        &-name {
            display: block;
            float: left;
            width: 120px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 5px;
        }

        &-attribute {
            display: inline-block;
            color: #8492a6;
            font-size: 13px
        }
    }

    .el-input {
        /deep/ &:hover {
            .el-input__inner {
                background: #66b1ff;
                border-color: #66b1ff;
            }
        }

        /deep/ &__inner {
            background-color: #409EFF;
            border-color: #409EFF !important;
            user-select: none;

            &:focus {
                border: 1px solid #409EFF;
            }

            &::placeholder {
                color: #fff;
            }
        }

        /deep/ &__icon {
            color: #fff !important;
        }
    }
</style>