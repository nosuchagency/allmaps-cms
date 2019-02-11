<template>
</template>

<script>
    export default {
        created() {
            this.$auth.logout({
                url: 'logout',
                makeRequest: true,
                redirect: '/login'
            });
        }
    }
</script>