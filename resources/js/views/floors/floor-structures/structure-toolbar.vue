<template>
    <div class="component-toolbar"
         :class="{'is-active' : !!currentStructure}">
        <template v-if="currentStructure">
            <div class="component-details">
                <span class="component-name">
                    {{currentStructure.getName()}}
                </span>
                <span class="component-color">
                    <i class="fa fa-square"
                       :style="{color : currentStructure.getColor(), opacity : currentStructure.getOpacity()}">
                    </i>
                </span>
                <span class="component-shape">
                    {{currentStructure.getShape()}}
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
                           @click="cancelComponent()">
                    Cancel
                </el-button>
                <el-button size="mini"
                           type="primary"
                           @click="saveComponent()"
                           v-if="saveable">
                    Finish
                </el-button>
            </div>
            <confirm-dialog title="Delete Component"
                            :visible="confirmDeleteVisible"
                            :message="$t('general.confirm')"
                            @cancel="confirmDeleteVisible = false"
                            @confirm="deleteComponent()">
            </confirm-dialog>
        </template>
        <structure-modal :structure="currentStructure"></structure-modal>
    </div>
</template>

<script>
    import Hub from '../../../events/hub';
    import structureModal from './structure-modal';

    export default {
        components: {
            structureModal
        },
        props: {
            currentStructure: Object
        },
        data() {
            return {
                confirmDeleteVisible: false
            }
        },
        computed: {
            saveable() {
                if (['image', 'rectangle', 'circle'].includes(this.currentStructure.getShape())) {
                    return true;
                }

                if (this.currentStructure.getShape() === 'polygon') {
                    return this.currentStructure.getCoordinates()[0].length >= 2;
                }

                return this.currentStructure.getCoordinates().length >= 2;
            }
        },
        methods: {
            saveComponent() {
                Hub.$emit('structure:save');
            },
            cancelComponent() {
                Hub.$emit('structure:cancel');
            },
            deleteComponent() {
                Hub.$emit('structure:remove');
                this.confirmDeleteVisible = false
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