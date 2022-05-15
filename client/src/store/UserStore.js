import {makeAutoObservable} from "mobx";

export default class UserStore
{
    get users() {
        return this._users;
    }

    setUsers(value) {
        this._users = value;
    }

    get user() {
        return this._user;
    }

    setUser(value) {
        this._user = value;
    }

    get isAuth() {
        return this._isAuth;
    }

    setIsAuth(value) {
        this._isAuth = value;
    }

    constructor()
    {
        this._users = [];
        this._isAuth = false;
        this._user = {};
        makeAutoObservable(this);
    }
}