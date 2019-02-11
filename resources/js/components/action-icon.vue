<template>
    <i class="fa" :class="'fa-' + getAction()"></i>
</template>

<script>
    export default {
        props: {
            action: String
        },
        methods: {
            getAction() {
                switch (this.action.toLowerCase()) {
                    case 'created' :
                        return 'plus';
                    case 'updated' :
                        return 'edit';
                    case 'deleted' :
                        return 'trash-alt';
                    case 'logged in' :
                        return 'sign-in-alt';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>