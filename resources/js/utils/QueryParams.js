export default class QueryParams {

    /**
     * Create a new QueryParams instance.
     *
     * @param {object} options
     */
    constructor(options = {}) {
        this.parameters = {};

        Object.keys(options).forEach(key => this.setQueryParameter(key, options[key]));
    }

    /**
     * Set query parameter from a key and a value
     *
     * @param {string} key
     * @param {string} value
     */
    setQueryParameter(key, value) {
        if (key && value) {
            this.parameters[key] = value;
        }
    }

    /**
     * Override toString()
     *
     * @return {string}
     */
    toString() {
        let query = '?';

        Object.keys(this.parameters).forEach(key => query += `${key}=${this.parameters[key]}&`);

        return query.slice(0, -1);
    }
}