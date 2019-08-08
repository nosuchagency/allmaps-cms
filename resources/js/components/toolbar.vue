<template>
    <div class="toolbar">
        <slot name="toolbar">
            <div class="toolbar-left-content">
                <slot name="left"></slot>
            </div>
            <div class="toolbar-right-content">
                <slot name="right"></slot>
            </div>
        </slot>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
    .toolbar {
        display: flex;
        min-height: 56px;
        border-radius: 0;
        border-right: none;
        border-bottom: solid 1px #e6e6e6;
        background-color: #fff;
        padding: 0 25px;

        &-left-content,
        &-right-content {
            display: flex;
            align-items: center;
        }

        &-left-content,
        &-right-content {
            flex-basis: 50%;
        }

        &-left-content {
        }

        &-right-content {
            margin-left: auto;
            justify-content: flex-end;
        }
    }
</style>