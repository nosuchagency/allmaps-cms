<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-tachometer-alt title-icon"></i>
                        <label>Dashboard</label>
                    </div>
                </template>
            </toolbar>
        </template>
        <template slot="content">

            <div class="content">
                <el-row class="panel-group"
                        :gutter="40">
                    <el-col :xs="24"
                            :sm="12"
                            :lg="6"
                            class="card-panel-col">
                        <router-link to="/places">
                            <div class='card-panel'>
                                <div class="card-panel-icon-wrapper icon-building">
                                    <i class="fa fa-map-marked-alt"
                                       aria-hidden="true"></i>
                                </div>
                                <div class="card-panel-description">
                                    <div class="card-panel-text">Places</div>
                                </div>
                            </div>
                        </router-link>
                    </el-col>
                    <el-col :xs="24"
                            :sm="12"
                            :lg="6"
                            class="card-panel-col">
                        <router-link to="/containers">
                            <div class="card-panel">
                                <div class="card-panel-icon-wrapper icon-site">
                                    <i class="fa fa-archive"
                                       aria-hidden="true"></i>
                                </div>
                                <div class="card-panel-description">
                                    <div class="card-panel-text">Content</div>
                                </div>
                            </div>
                        </router-link>
                    </el-col>
                    <el-col :xs="24"
                            :sm="12"
                            :lg="6"
                            class="card-panel-col">
                        <router-link to="/fixtures">
                            <div class="card-panel">
                                <div class="card-panel-icon-wrapper icon-error">
                                    <i class="fa fa-couch"
                                       aria-hidden="true"></i>
                                </div>
                                <div class="card-panel-description">
                                    <div class="card-panel-text">Fixtures</div>
                                </div>
                            </div>
                        </router-link>
                    </el-col>
                    <el-col :xs="24"
                            :sm="12"
                            :lg="6"
                            class="card-panel-col">
                        <router-link to="/beacons">
                            <div class="card-panel">
                                <div class="card-panel-icon-wrapper icon-monitor">
                                    <i class="fa fa-wifi"
                                       aria-hidden="true"></i>
                                </div>
                                <div class="card-panel-description">
                                    <div class="card-panel-text">Beacons</div>
                                    <span class="card-panel-num">
                                </span>
                                </div>
                            </div>
                        </router-link>
                    </el-col>
                </el-row>
            </div>

        </template>
    </layout>
</template>

<script>
    import countTo from 'vue-count-to';

    export default {
        props: {},
        components: {
            countTo
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .notification {
        margin-bottom: 25px;

        &-new {
            margin-left: 5px;
            font-weight: bold;
            color: green;
        }

        span {
            font-size: 12px;
        }

        p {
            margin-top: 5px;
        }
    }

    .panel-group {
        .card-panel-col {
            margin-bottom: 32px;
        }

        .card-panel {
            height: 108px;
            cursor: pointer;
            font-size: 12px;
            position: relative;
            overflow: hidden;
            color: #666;
            background: #fff;
            box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
            border-color: rgba(0, 0, 0, 0.05);

            &:hover {
                .card-panel-icon-wrapper {
                    color: #fff;
                }

                .icon-building {
                    background: #40c9c6;
                }

                .icon-site {
                    background: #36a3f7;
                }

                .icon-error {
                    background: #f4516c;
                }

                .icon-monitor {
                    background: #34bfa3;
                }
            }

            .icon-building {
                color: #40c9c6;
            }

            .icon-site {
                color: #36a3f7;
            }

            .icon-error {
                color: #f4516c;
            }

            .icon-monitor {
                color: #34bfa3;
            }

            .card-panel-icon-wrapper {
                float: left;
                margin: 14px 0 0 14px;
                padding: 16px;
                transition: all 0.38s ease-out;
                border-radius: 6px;

                i {
                    font-size: 25px;
                }
            }

            .card-panel-icon {
                float: left;
                font-size: 48px;
            }

            .card-panel-description {
                float: right;
                font-weight: bold;
                margin: 26px;
                margin-left: 0px;

                .card-panel-text {
                    line-height: 18px;
                    color: rgba(0, 0, 0, 0.45);
                    font-size: 16px;
                    margin-bottom: 12px;
                }

                .card-panel-num {
                    font-size: 20px;
                }
            }
        }
    }
</style>