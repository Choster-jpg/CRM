import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";
import CarrierStore from "./store/CarrierStore";
import OrderStore from "./store/OrderStore";
import SupplyStore from "./store/SupplyStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render
(
    <Context.Provider value={
        {
            user: new UserStore(),
            product: new ProductStore(),
            carrier: new CarrierStore(),
            order: new OrderStore(),
            supply: new SupplyStore()
        }
    }>
        <App/>
    </Context.Provider>
);



