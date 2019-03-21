let upsert = {
    data() {
        return {
            form: null,
            creating: false,
            reading: false,
            updating: false,
            deleting: false
        }
    },
    created() {
        this.fetch();
    },
    watch: {
        $route: 'fetch'
    },
    methods: {
        async fetch() {
            if (this.$route.params.id) {
                try {
                    this.item = await this.read();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        create() {
            return new Promise(async (resolve, reject) => {
                this.creating = true;

                try {
                    const response = await this.$axios.post(this.getCreateUrl(), this.form);
                    resolve(response.data);
                } catch (error) {
                    reject(error);
                } finally {
                    this.creating = false;
                }
            });
        },
        read() {
            return new Promise(async (resolve, reject) => {
                this.reading = true;

                try {
                    const response = await this.$axios.get(this.getReadUrl());
                    resolve(response.data);
                } catch (error) {
                    reject(error);
                } finally {
                    this.reading = false;
                }
            });
        },
        update() {
            return new Promise(async (resolve, reject) => {
                this.updating = true;

                try {
                    const response = await this.$axios.put(this.getUpdateUrl(), this.form);
                    resolve(response.data);
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
            return '/' + this.resource;
        },
        getReadUrl() {
            return '/' + this.resource + '/' + this.$route.params.id;
        },
        getUpdateUrl() {
            return '/' + this.resource + '/' + this.item.id;
        },
        getRemoveUrl() {
            return '/' + this.resource + '/' + this.item.id;
        }
    }
};

export default upsert;