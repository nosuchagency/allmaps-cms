import Errors from './Errors';
import axios from 'axios';

export default class Form {
    /**
     * Create a new Form instance.
     *
     * @param {object} data
     */
    constructor(data) {
        this.originalData = data;

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
        let data = {};

        for (let property in this.originalData) {
            data[property] = this[property];
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
     * @param {object} headers
     */
    get(url, headers = null) {
        return this.submit('get', url, headers);
    }

    /**
     * Send a POST request to the given URL.
     * .
     * @param {string} url
     * @param {object} headers
     */
    post(url, headers = null) {
        return this.submit('post', url, headers);
    }


    /**
     * Send a PUT request to the given URL.
     * .
     * @param {string} url
     * @param {object} headers
     */
    put(url, headers = null) {
        return this.submit('put', url, headers);
    }


    /**
     * Send a PATCH request to the given URL.
     * .
     * @param {string} url
     * @param {object} headers
     */
    patch(url, headers = null) {
        return this.submit('patch', url, headers);
    }


    /**
     * Send a DELETE request to the given URL.
     * .
     * @param {string} url
     * @param {object} headers
     */
    delete(url, headers = null) {
        return this.submit('delete', url, headers);
    }


    /**
     * Submit the form.
     *
     * @param {string} requestType
     * @param {string} url
     * @param {object} headers
     */
    submit(requestType, url, headers) {
        return new Promise((resolve, reject) => {
            this.busy = true;
            axios[requestType](url, this.data(), headers)
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