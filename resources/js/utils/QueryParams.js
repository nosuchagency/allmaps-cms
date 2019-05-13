export default class QueryParams {

    constructor(options = {}) {
        this.parameters = {};

        Object.keys(options).forEach(key => this.setQueryParameter(key, options[key]));
    }

    setQueryParameter(key, value) {
        if (key && value) {
            this.parameters[key] = value;
        }
    }

    toString() {
        let query = '?';

        Object.keys(this.parameters).forEach(key => query += `${key}=${this.parameters[key]}&`);

        return query.slice(0, -1);
    }
}