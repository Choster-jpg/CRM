import {makeAutoObservable} from "mobx";

export default class SupplyStore
{
    get limit() {
        return this._limit;
    }

    set limit(value) {
        this._limit = value;
    }
    get totalCount() {
        return this._totalCount;
    }

    set totalCount(value) {
        this._totalCount = value;
    }
    get page() {
        return this._page;
    }

    set page(value) {
        this._page = value;
    }
    get supplies() {
        return this._supplies;
    }

    set supplies(value) {
        this._supplies = value;
    }
    constructor()
    {
        this._supplies =
            [
                {id: 1, address_from: "Гродно", address_to: "Брест", date: "21.06.2022", carrier_id: "1"},
                {id: 2, address_from: "Могилёв", address_to: "Гомель", date: "23.06.2022", carrier_id: "2"},
                {id: 3, address_from: "Гомель", address_to: "Минск", date: "22.06.2022", carrier_id: "3"},
                {id: 4, address_from: "Брест", address_to: "Витебск", date: "01.06.2022", carrier_id: "4"},
                {id: 5, address_from: "Минск", address_to: "Гродно", date: "20.06.2022", carrier_id: "5"}
            ];

        this._page = 1;
        this._totalCount = 0;
        this._limit = 6;
        makeAutoObservable(this);
    }
}
