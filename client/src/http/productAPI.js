import {$authHost} from "./index";

export const createProduct = async (product) =>
{
    console.log(product);
    const {data} = await $authHost.post('api/product', {name: product.name, amount: product.amount, price: product.price});
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

export const incrementProduct = async (id, amount) =>
{
    const {data} = await $authHost.put(`api/product/${amount}`, {id});
    return data;
}

export const  updateProduct = async (id, value) =>
{
    const {data} = await $authHost.put(`api/product/price/${value}`, {id});
    return data;
}