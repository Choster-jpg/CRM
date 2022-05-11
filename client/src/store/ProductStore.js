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
        this._products =
        [
            {id: 1, name: "product 123", amount: 20, price : 150},
            {id: 2, name: "product 223", amount: 10, price : 20},
            {id: 3, name: "product 323", amount: 15, price : 30},
            {id: 4, name: "product 423", amount: 200, price : 7000},
            {id: 5, name: "product 523", amount: 300, price : 200},
        ];

        this._page = 1;
        this._totalCount = 0;
        this._limit = 6;
        makeAutoObservable(this);
    }
}