<template>
    <div class="main-container">
        <div class="content-container">
            <div class="toolbar">
                <slot name="toolbar"></slot>
            </div>
            <div class="content-wrapper">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .content-container {
        height: 100%;
        position: relative;

        .content-wrapper {
            min-height: calc(100% - 56px);
            background: #f0f2f5;

            /deep/ {
                .content {
                    padding: 25px;
                }

                .el-card {
                    margin-bottom: 25px;
                }

                .el-table {
                    width: 100%;
                }

                .loading-spinner {
                    color: #909399;
                    font-size: 2em;
                    padding: 25px;
                }

                .el-card__header {
                    display: flex;
                }
            }
        }
    }
</style>
