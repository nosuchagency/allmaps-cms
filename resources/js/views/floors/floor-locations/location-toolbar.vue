<template>
    <div class="location-toolbar"
         :class="{'is-active' : !!location}">
        <template v-if="location">
            <div class="location-details">
                <el-button size="mini"
                           type="primary"
                           @click="openLocationModal()">
                    Edit
                </el-button>
                <span class="location-name">
                    {{location.getName()}}
                </span>
                <span class="location-type">
                    {{location.getType()}}
                </span>
            </div>
            <div class="location-state">
                {{location.hasUnsavedChanges() ? 'Unsaved changes' : ''}}
            </div>
            <div class="location-actions">
                <el-button size="mini"
                           type="text"
                           class="btn-cancel"
                           @click="cancelLocation()">
                    Cancel
                </el-button>
                <el-button size="mini"
                           type="success"
                           @click="saveLocation()"
                           :disabled="!saveable"
                           :loading="saving">
                    Confirm
                </el-button>
            </div>
        </template>
        <location-modal v-if="locationModalVisible"
                        :visible="locationModalVisible"
                        :location="location.location"
                        :url="url"
                        @location-modal:close="closeLocationModal"
                        @location-modal:update="updateLocation"
                        @location-modal:remove="removeLocation">
        </location-modal>
    </div>
</template>

<script>
    import locationModal from './location-modal';

    export default {
        components: {
            locationModal
        },
        props: {
            location: Object,
            url: String
        },
        data() {
            return {
                locationModalVisible: false,
                saving: false
            }
        },
        computed: {
            saveable() {
                if (!this.location.isArea()) {
                    return true;
                }

                return this.location.getCoordinates()[0].length >= 2;
            }
        },
        methods: {
            async saveLocation() {
                this.saving = true;

                try {
                    let coordinates = this.location.getCoordinates();
                    const {data} = await this.$axios.put(this.url + '/locations/' + this.location.getId(), {coordinates});
                    this.updateLocation(data);
                } catch (error) {
                    console.log(error);
                } finally {
                    this.saving = false;
                }
            },
            updateLocation(location) {
                this.location.location = location;
                this.$emit('location:saved')
            },
            cancelLocation() {
                this.$emit('location:cancelled');
            },
            removeLocation() {
                this.closeLocationModal();
                this.$emit('location:removed')
            },
            openLocationModal() {
                this.locationModalVisible = true;
            },
            closeLocationModal() {
                this.locationModalVisible = false;
            }
        }
    };
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
    .location-toolbar {
        transition: height 0.2s ease-in-out;
        overflow: hidden;
        width: 100%;
        height: 0;
        background-color: #fff;
        position: absolute;
        z-index: 801;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &.is-active {
            height: 56px;
            border-bottom: 1px solid #e6e6e6;
        }
    }

    .location-actions {
        margin-right: 25px;
        display: flex;
        align-items: center;
    }

    .location-name {
        font-size: 16px;
        font-weight: bold;
        margin: 0 15px;
    }

    .location-type {
        font-size: 13px;
        font-weight: bold;
        text-transform: capitalize;
    }

    .location-details {
        color: #666;
        font-size: 14px;
        margin-left: 25px;
    }
</style>