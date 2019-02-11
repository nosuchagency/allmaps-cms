<template>
    <el-select v-model="component"
               :placeholder="type"
               size="small"
               @change="selectComponent"
               :no-data-text="'No ' + type + 's'">
        <el-option
                v-for="item in componentOptions"
                :key="item.id"
                :label="item.name"
                :value="item">
            <span class="component-name">
                {{ item.name }}
            </span>
            <i class="fa fa-square" :style="{color : item.color, opacity : item.opacity}"></i>
            <span class="component-attribute">
                {{ item.curved ? 'Curved' : '' }} {{ item.shape }}
            </span>
        </el-option>
    </el-select>
</template>

<script>
    import Hub from '../../../events/hub';
    import {mapGetters} from 'vuex';

    export default {
        props: {
            componentOptions: Array,
            type: String
        },
        data() {
            return {
                component: null
            }
        },
        computed: {
            ...mapGetters('plan', ['currentComponent'])
        },
        methods: {
            selectComponent(component) {
                this.component = null;

                if (this.currentComponent) {
                    Hub.$emit('cancelComponent');
                }

                this.createComponent(component);
            },
            createComponent(component) {
                Hub.$emit('createComponent', component);
                this.$store.commit('plan/setCurrentIndex', -1);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .component-name {
        display: block;
        float: left;
        width: 120px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 5px;
    }

    .component-attribute {
        display: inline-block;
        color: #8492a6;
        font-size: 13px
    }

    .el-select {
        width: 20%;
        margin-right: 7px;
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