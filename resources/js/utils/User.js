export default class User {

    /**
     * Create a new User instance.
     *
     * @param {object} data
     */
    constructor(data) {
        for (let field in data) {
            this[field] = data[field];
        }
    }

    /**
     * Determine if the user has access to the specified permissions
     *
     * @param permissions
     *
     * @return {boolean}
     */
    hasPermissionTo(...permissions) {
        return permissions.some(permission => this.permissions.includes(permission));
    }
}