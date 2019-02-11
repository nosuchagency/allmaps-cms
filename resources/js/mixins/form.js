let form = {
    data: function () {
        return {
            busy: false,
            errors: {}
        };
    },
    methods: {
        setErrors(errors) {
            this.busy = false;
            this.set(errors);
        },
        startProcessing() {
            this.forget();
            this.busy = true;
        },
        finishProcessing() {
            this.busy = false;
        },
        reset() {
            this.forget();
            this.busy = false;
        },
        hasErrors() {
            return !_.isEmpty(this.errors);
        },
        has(field) {
            return _.indexOf(_.keys(this.errors), field) > -1;
        },
        all() {
            return this.errors;
        },
        flatten() {
            return _.flatten(_.toArray(this.errors));
        },
        get(field) {
            if (this.has(field)) {
                return this.errors[field][0];
            }
        },
        set(errors) {
            this.errors = errors;
        },
        forget(field) {
            if (typeof field === 'undefined') {
                this.errors = {};
            } else {
                Vue.delete(this.errors, field);
            }
        }
    }
};

export default form;
