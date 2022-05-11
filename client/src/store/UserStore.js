import {makeAutoObservable} from "mobx";

export default class UserStore
{
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
        this._isAuth = false;
        this._user = {};
        makeAutoObservable(this);
    }
}