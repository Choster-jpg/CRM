import {makeAutoObservable} from "mobx";

export default class CarrierStore
{
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
    get carriers() {
        return this._carriers;
    }

    setCarriers(value) {
        this._carriers = value;
    }

    constructor()
    {
        this._carriers =
            [
                /*{id: 1, name: "ГродноОблТранс", city: "Гродно", is_busy: false},
                {id: 2, name: "МинскСоюзОблТранс", city: "Минск", is_busy: true},
                {id: 3, name: "Областной перевозчик города Брест", city: "Брест", is_busy: true},
                {id: 4, name: "ВитебскГосТранс", city: "Витебск", is_busy: false}*/
            ];

        this._page = 1;
        this._totalCount = 0;
        this._limit = 4;
        makeAutoObservable(this);
    }
}