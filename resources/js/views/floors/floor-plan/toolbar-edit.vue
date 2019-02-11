<template>
    <div class="component-toolbar"
         :class="{'is-active' : !!currentComponent}">
        <template v-if="currentComponent">
            <div class="component-details">
                <span class="component-name">
                    {{component.name}}
                </span>
                <span class="component-color">
                    <i class="fa fa-square"
                       :style="{color : component.color, opacity : component.opacity}">
                    </i>
                </span>
                <span class="component-shape">
                    {{component.shape}}
                </span>
            </div>
            <div class="component-actions">
                <el-button size="mini"
                           type="danger"
                           @click="confirmDeleteVisible = true">
                    <i class="fa fa-trash-alt component-delete"
                       aria-hidden="true">
                    </i>
                </el-button>
                <el-button size="mini"
                           type="primary"
                           @click="emitComponentEvent('cancelComponent')">
                    Cancel
                </el-button>
                <el-button size="mini"
                           type="primary"
                           @click="emitComponentEvent('saveComponent')"
                           v-if="canSave">
                    Finish
                </el-button>
            </div>
            <confirm-dialog title="Delete Component"
                            :message="$t('general.confirm')"
                            @cancel="confirmDeleteVisible = false"
                            @confirm="deleteComponent()"
                            :visible="confirmDeleteVisible">
            </confirm-dialog>
        </template>
    </div>
</template>

<script>
    import Hub from '../../../events/hub';
    import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
                confirmDeleteVisible: false
            }
        },
        computed: {
            component() {
                return this.currentComponent.feature.properties;
            },
            canSave() {
                if (['image', 'rectangle', 'circle'].includes(this.component.shape)) {
                    return true;
                }

                if (this.component.shape === 'polygon') {
                    return this.currentComponent.getLatLngs()[0].length >= 2;
                }

                return this.currentComponent.getLatLngs().length >= 2;
            },
            ...mapGetters('plan', ['currentComponent'])
        },
        methods: {
            deleteComponent() {
                this.emitComponentEvent('removeComponent');
                this.confirmDeleteVisible = false
            },
            emitComponentEvent(eventType, parameter = null) {
                Hub.$emit(eventType, parameter);
            }
        }
    };
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
    .component-toolbar {
        transition: height 0.2s ease-in-out;
        overflow: hidden;
        width: 100%;
        height: 0;
        background-color: #fff;
        position: absolute;
        z-index: 801;
        display: flex;
        align-items: center;

        &.is-active {
            height: 56px;
            border-bottom: 1px solid #e6e6e6;
        }
    }

    .component-actions {
        margin-left: auto;
        margin-right: 25px;
        display: flex;
        align-items: center;
    }

    .component-name {
        font-size: 16px;
        font-weight: bold;
        margin-right: 15px;
    }

    .component-shape {
        font-size: 13px;
        font-weight: bold;
        text-transform: capitalize;
    }

    .component-delete {
        cursor: pointer;
        color: #fff;
    }

    .component-details {
        color: #666;
        font-size: 14px;
        margin-left: 25px;
    }
</style>