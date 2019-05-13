let multipleSelection = {
    data() {
        return {
            selectedItems: [],
            bulkRemoving: false,
            bulkActions: [
                {value: null, label: 'Bulk Actions'},
                {value: 'delete', label: 'Delete'},
                // {value: 'publish', label: 'Publish'},
            ]
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.selectedItems = val;
        },
        applyBulkAction(action) {
            if (action === 'delete') {
                this.confirmDeleteVisible = true;
            }
        },
        async bulkRemove() {
            if (this.selectedItems.length < 1) {
                return;
            }

            this.bulkRemoving = true;

            try {
                await this.$axios.post('/' + this.resource + '/bulk-destroy', {items: this.selectedItems});
                this.$router.go('/' + this.resource);
            } catch (error) {
                console.log(error);
            } finally {
                this.bulkRemoving = false;
            }
        }
    }
};

export default multipleSelection;