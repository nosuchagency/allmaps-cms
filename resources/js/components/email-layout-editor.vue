<template>
    <layout>
        <template slot="toolbar">
            <toolbar>

            </toolbar>
        </template>
        <template slot="content">
            <div class="content">
                <el-row>
                    <el-col :span="24">
                        <el-card class="box-card">
                            <div slot="header"
                                 class="header-content">
                                <span>
                                    Layout content
                                </span>
                                <el-button class="preview-button"
                                           size="small"
                                           type="danger">
                                    Restore layout
                                </el-button>
                            </div>
                            <codemirror v-model="code"
                                        :options="cmOptions">
                            </codemirror>
                            <div class="button-ribbon bottom">
                                <el-button size="small"
                                           type="primary">
                                    Update
                                </el-button>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </template>
    </layout>
</template>

<script>
    import {codemirror} from 'vue-codemirror';
    import 'codemirror/lib/codemirror.css';
    import 'codemirror/theme/cobalt.css';
    import 'codemirror/addon/selection/active-line.js';

    export default {
        components: {
            codemirror
        },
        data() {
            return {
                code: this.layoutCode,
                cmOptions: {
                    tabSize: 4,
                    styleActiveLine: true,
                    lineNumbers: true,
                    autoCloseTags: true,
                    line: true,
                    mode: 'text/html',
                    theme: 'cobalt'
                },
                updating: false
            };
        },
        methods: {
            async updateLayout() {
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .header-content {
        display: flex;
        align-items: center;

        .preview-button {
            margin-left: auto;
        }
    }

    .button-ribbon {
        &.top {
            margin-bottom: 10px;
        }

        &.bottom {
            margin-top: 10px;
        }
    }
</style>
