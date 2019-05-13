let multipleSelection = {
    data() {
        return {
            selectedItems: [],
            bulkRemoving: false,
            bulkActions: [
                {value: null, label: 'Bulk Actions'},
                {value: 'delete', label: 'Delete'}
            ],
            selectedBulkAction: null,
        }
    },
    methods: {
        handleSelectionChange(items) {
            this.selectedItems = items;

            if (items.length === 0) {
                this.selectedBulkAction = null;
            }
        },
        applyBulkAction(bulkAction) {
            if (bulkAction.value === 'delete') {
                this.confirmDeleteVisible = true;
            }
        },
        setBulkAction(bulkAction) {
            this.selectedBulkAction = bulkAction;
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