import Errors from './Errors';
import axios from 'axios';

export default class Form {

    /**
     * Create a new Form instance.
     *
     * @param {object} data
     * @param {object} options
     */
    constructor(data, options = {}) {
        this.originalData = data;
        this.options = options;

        for (let field in data) {
            this[field] = data[field];
        }

        this.errors = new Errors();
        this.busy = false;
    }

    /**
     * Fetch all relevant data for the form.
     */
    data() {
        if (this.options.asFormData) {
            return this.asFormData();
        }

        return this.asJson();
    }

    asJson() {
        let data = {};

        for (let property in this.originalData) {
            data[property] = this[property];
        }

        return data;
    }

    asFormData() {
        let data = new FormData();

        for (let property in this.originalData) {
            data.set(property, this[property]);
        }

        return data;
    }

    /**
     * Reset the form fields.
     */
    reset() {
        for (let field in this.originalData) {
            this[field] = '';
        }

        this.errors.clear();
    }

    /**
     * Send a GET request to the given URL.
     * .
     * @param {string} url
     * @param {object} options
     */
    get(url, options = null) {
        return this.submit('get', url, options);
    }

    /**
     * Send a POST request to the given URL.
     * .
     * @param {string} url
     * @param {object} options
     */
    post(url, options = null) {
        return this.submit('post', url, options);
    }

    /**
     * Send a PUT request to the given URL.
     * .
     * @param {string} url
     * @param {object} options
     */
    put(url, options = null) {
        return this.submit('put', url, options);
    }

    /**
     * Send a PATCH request to the given URL.
     * .
     * @param {string} url
     * @param {object} options
     */
    patch(url, options = null) {
        return this.submit('patch', url, options);
    }

    /**
     * Send a DELETE request to the given URL.
     * .
     * @param {string} url
     * @param {object} options
     */
    delete(url, options = null) {
        return this.submit('delete', url, options);
    }

    /**
     * Submit the form.
     *
     * @param {string} requestType
     * @param {string} url
     * @param {object} options
     */
    submit(requestType, url, options) {
        return new Promise((resolve, reject) => {
            this.busy = true;
            axios[requestType](url, this.data(), options)
                .then(response => {
                    this.onSuccess(response.data);
                    resolve(response.data);
                })
                .catch(error => {
                    this.onFail(error.response.data.errors);
                    reject(error.response.data.errors);
                })
                .finally(() => this.busy = false)
        });
    }

    /**
     * Handle a successful form submission.
     *
     * @param {object} data
     */
    onSuccess(data) {
        // this.reset();
    }

    /**
     * Handle a failed form submission.
     *
     * @param {object} errors
     */
    onFail(errors) {
        this.errors.record(errors);
    }
}