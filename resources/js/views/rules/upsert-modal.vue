<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal"
                   width="60%">
            <el-form>
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Rule" name="rule">
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item label="Beacon Distance"
                                              :class="{'is-error' : has('distance')}">
                                    <el-select v-model="form.distance">
                                        <el-option v-for="item in distances"
                                                   :key="item.value"
                                                   :label="item.label"
                                                   :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Weekday(s)"
                                              :class="{'is-error' : has('weekday')}">
                                    <el-select v-model="form.weekday">
                                        <el-option v-for="item in weekdays"
                                                   :key="item.value"
                                                   :label="item.label"
                                                   :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="Time Restriction" name="time">
                        <el-row :gutter="25">
                            <el-col>
                                <el-form-item label="Enable">
                                    <el-switch v-model="form.time_restricted"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item v-if="form.time_restricted"
                                              label="Time from"
                                              :class="{'is-error' : has('time_from')}">
                                    <el-time-select v-model="form.time_from"
                                                    :picker-options="{
                                                        start: '00:00',
                                                        step: '00:05',
                                                        end: '23:55'
                                                     }">
                                    </el-time-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item v-if="form.time_restricted"
                                              label="Time to"
                                              :class="{'is-error' : has('time_to')}">
                                    <el-time-select v-model="form.time_to"
                                                    :picker-options="{
                                                        start: '00:00',
                                                        step: '00:05',
                                                        end: '23:55',
                                                        minTime: form.time_from
                                                     }">
                                    </el-time-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="Date Restriction" name="date">
                        <el-row :gutter="25">
                            <el-col>
                                <el-form-item label="Enable">
                                    <el-switch v-model="form.date_restricted"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item v-if="form.date_restricted"
                                              label="Date from"
                                              :class="{'is-error' : has('date_from')}">
                                    <el-date-picker v-model="form.date_from"
                                                    type="date"
                                                    format="dd-MM-yyyy">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item v-if="form.date_restricted"
                                              label="Date to"
                                              :class="{'is-error' : has('date_to')}">
                                    <el-date-picker v-model="form.date_to"
                                                    type="date"
                                                    format="dd-MM-yyyy">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
            <span slot="footer">
                 <el-button v-if="item"
                            type="text"
                            size="small"
                            class="btn-remove"
                            @click="removeItem">
                    Delete
                </el-button>
                <el-button type="text"
                           size="small"
                           @click="closeModal">
                    Cancel
                </el-button>
                <el-button type="primary"
                           size="small"
                           @click="item ? updateItem() : createItem()">
                    Confirm
                </el-button>
            </span>
        </el-dialog>
    </portal>
</template>

<script>
    import form from 'js/mixins/form';

    export default {
        mixins: [form],
        props: {
            visible: Boolean,
            item: Object,
            containerId: Number,
            beaconId: Number
        },
        data() {
            return {
                currentTab: 'rule',
                weekdays: [
                    {label: 'All days', 'value': 'all'},
                    {label: 'Weekdays', 'value': 'weekdays'},
                    {label: 'Weekends', 'value': 'weekends'},
                    {label: 'Monday', 'value': 'monday'},
                    {label: 'Tuesday', 'value': 'tuesday'},
                    {label: 'Wednesday', 'value': 'wednesday'},
                    {label: 'Thursday', 'value': 'thursday'},
                    {label: 'Friday', 'value': 'friday'},
                    {label: 'Saturday', 'value': 'saturday'},
                    {label: 'Sunday', 'value': 'sunday'},
                ],
                distances: [
                    {label: 'Close', 'value': 'close'},
                    {label: 'Medium', 'value': 'medium'},
                    {label: 'Far', 'value': 'far'},
                ],
                form: {
                    distance: this.item ? this.item.distance : 'close',
                    weekday: this.item ? this.item.weekday : 'all',
                    time_from: this.item ? this.item.time_from : null,
                    time_to: this.item ? this.item.time_to : null,
                    date_from: this.item ? this.item.date_from : null,
                    date_to: this.item ? this.item.date_to : null,
                    time_restricted: this.item ? !!this.item.time_restricted : false,
                    date_restricted: this.item ? !!this.item.date_restricted : false,
                },
                deleting: false
            }
        },
        methods: {
            async createItem() {
                try {
                    this.forget();
                    const rule = await this.create();
                    this.$emit('rule-modal:add', {beaconId: this.beaconId, containerId: this.containerId, rule})
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                }
            },
            async updateItem() {
                try {
                    this.forget();
                    const rule = await this.update();
                    this.$emit('rule-modal:update', {beaconId: this.beaconId, containerId: this.containerId, rule})
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                }
            },
            async removeItem() {
                try {
                    await this.remove();
                    this.$emit('rule-modal:remove', {
                        beaconId: this.beaconId,
                        containerId: this.containerId,
                        rule: this.item
                    })
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                }
            },
            create() {
                return new Promise(async (resolve, reject) => {
                    this.creating = true;

                    try {
                        const {data} = await this.$axios.post(this.getCreateUrl(), this.form);
                        resolve(data);
                    } catch (error) {
                        reject(error);
                    } finally {
                        this.creating = false;
                    }
                });
            },
            update() {
                return new Promise(async (resolve, reject) => {
                    this.updating = true;

                    try {
                        const {data} = await this.$axios.put(this.getUpdateUrl(), this.form);
                        resolve(data);
                    } catch (error) {
                        reject(error);
                    } finally {
                        this.updating = false;
                    }
                });
            },
            remove() {
                return new Promise(async (resolve, reject) => {
                    this.deleting = true;

                    try {
                        await this.$axios.delete(this.getRemoveUrl());
                        resolve(true);
                    } catch (error) {
                        reject(error);
                    } finally {
                        this.deleting = false;
                    }
                });
            },
            getCreateUrl() {
                return '/containers/' + this.containerId + '/beacons/' + this.beaconId + '/rules';
            },
            getUpdateUrl() {
                return '/containers/' + this.containerId + '/beacons/' + this.beaconId + '/rules/' + this.item.id;
            },
            getRemoveUrl() {
                return '/containers/' + this.containerId + '/beacons/' + this.beaconId + '/rules/' + this.item.id;
            },
            closeModal() {
                this.$emit('rule-modal:close')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-dialog {
        /deep/ &__header {
            display: none;
        }

        /deep/ &__footer {
            padding: 20px;
            border-top: 1px solid #dfdfdf;
        }

        /deep/ .el-date-editor {
            width: 100%;
        }

        .btn-remove {
            float: left;
            color: #FF0000;

            &:hover {
                color: #990000;
            }
        }
    }
</style>

