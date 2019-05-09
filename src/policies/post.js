
const ApplicationPolicy = require("./application");

module.exports = class PostPolicy extends ApplicationPolicy {
    isAdmin() {
        return this.user && this.user.role == "admin";
    }

    _isOwner() {
        return this.user && this.user.role == "owner";
    }

    _isMember() {
        return this.user && this.user.role == "member";
    }

    _isGuest() {
        return this.user && this.user.role == "guest";
    }

    new() {
        return this._isMember() || this.isAdmin();
    }

    create() {
        return this._isMember() || this._isAdmin();
    }

    edit() {
        return this._isAdmin() || this._isOwner();
    }

    update() {
        return this.edit();
    }

    destroy() {
        return this._isAdmin() || this._isOwner();
    }

}