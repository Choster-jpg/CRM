import {makeAutoObservable} from "mobx";

export default class ProductStore
{
    get products() {
        return this._products;
    }

    setProducts(value) {
        this._products = value;
    }
    get limit() {
        return this._limit;
    }

    setLimit(value) {
        this._limit = value;
    }
    get totalCount() {
        return this._totalCount;
    }

    setTotalCount(value) {
        this._totalCount = value;
    }
    get page() {
        return this._page;
    }

    setPage(value) {
        this._page = value;
    }

    constructor()
    {
        this._products = [];

        this._page = 1;
        this._totalCount = 0;
        this._limit = 6;
        makeAutoObservable(this);
    }
}