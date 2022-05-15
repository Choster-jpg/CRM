import {$authHost} from "./index";

export const createOrder = async (product) =>
{
    console.log(product);
    const {data} = await $authHost.post('api/order', {name: product.name, amount: product.amount, price: product.price});
    return data;
}

export const fetchOrders = async () =>
{
    const {data} = await $authHost.get('api/order');
    return data;
}

export const cancelOrder = async (id) =>
{
    const {data} = await $authHost.delete('api/order', { headers: {}, data: {id}});
    return data;
}

export const setOrderInProcess = async (id, supply_id) =>
{
    const {data} = await $authHost.put(`api/order/${id}`, {supply_id});
    return data;
}