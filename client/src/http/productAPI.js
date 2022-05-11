import {$authHost} from "./index";

export const createProduct = async (product) =>
{
    const {data} = await $authHost.post('api/product', {data});
    return data;
}

export const fetchProducts = async () =>
{
    const {data} = await $authHost.get('api/product');
    return data;
}

export const removeProduct = async (id) =>
{
    const {data} = await $authHost.delete('api/product', { headers: {}, data: {id}});
    return data;
}

export const incrementProduct = async (id) =>
{
    const {data} = await $authHost.put('api/product', {id});
    return data;
}