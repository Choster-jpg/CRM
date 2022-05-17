import {makeAutoObservable} from "mobx";

export default class OrderStore
{
    get limit_cf() {
        return this._limit_cf;
    }

    setLimit_cf(value) {
        this._limit_cf = value;
    }

    get totalCount_cf() {
        return this._totalCount_cf;
    }

    setTotalCount_cf(value) {
        this._totalCount_cf = value;
    }

    get page_cf() {
        return this._page_cf;
    }

    setPage_cf(value) {
        this._page_cf = value;
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

    get orders() {
        return this._orders;
    }

    setOrders(value) {
        this._orders = value;
    }

    constructor()
    {
        this._orders =
            [
                {id: 1, user_id: 1, product_id: 8, supply_id: 11, amount: 10235, is_in_process: false},
                {id: 2, user_id: 1, product_id: 11, supply_id: null, amount: 5, is_in_process: false},
                {id: 3, user_id: 1, product_id: 9, supply_id: 11, amount: 10, is_in_process: false},
                {id: 4, user_id: 1, product_id: 10, supply_id: 11, amount: 15, is_in_process: false}
            ];

        this._page = 1;
        this._totalCount = 0;
        this._limit = 4;

        this._page_cf = 1;
        this._totalCount_cf = 0;
        this._limit_cf = 5;
        makeAutoObservable(this);
    }
}